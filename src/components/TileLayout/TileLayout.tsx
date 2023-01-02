import { defineComponent, ref, h, PropType, StyleValue, provide, Ref, ComponentPublicInstance, toRaw, getCurrentInstance } from 'vue';
import { Library, Preset, Layout, Box } from './types';
import TilePane, { paneInjectKey } from './TilePane';
import './style.scss';

export const MIME = "application/j-tile-layout";
const LAYOUT_STORAGE_KEY = "layout";

export default defineComponent({
  props: {
    library: {
      type: Array as PropType<Library>,
      required: true,
    },
    cols: {
      type: Number,
      default: 12,
    },
    rowHeight: {
      type: Number,
      default: 100,
    },
    preset: {
      type: Object as PropType<Preset>,
      required: false,
    },
    storageKey: {
      type: String,
      required: false,
    },
    gap: {
      type: Number,
      default: 1,
    },
    compress: {
      type: Boolean,
      default: true,
    },
    locked: Boolean,
  },
  setup(props, { slots }) {
    let elm = ref<HTMLDivElement>();
    let layout = ref<Layout>([]);
    let children = ref<ComponentPublicInstance[]>([]);
    let hintBox = ref<Box | undefined>();
    let cellSize = [0, 0];
    let startPos = [0, 0];
    let unitCell = ref<HTMLDivElement>();
  
    let { preset } = props;
    if (preset) {
      layout.value = normalizePreset({ cols: props.cols }, preset);
    }

    /**
     * Convert left and top pixel coords to cell indexes
     * @param left relative pixel distance from left
     * @param top relative pixel distance from top
     * @returns cell index position
     */
    function cellByPos(left: number, top: number): [number, number] {
      let widthWithGap = cellSize[0] + props.gap;
      let heightWithGap = cellSize[1] + props.gap;
      let newX = Math.max(0, Math.floor(left / widthWithGap));
      let newY = Math.max(0, Math.floor(top / heightWithGap));
      return [newX, newY];
    }

    function measureCellSize() {
      let unitCellEl = unitCell.value!;
      cellSize = [unitCellEl.clientWidth, unitCellEl.clientHeight];
    }

    function layoutDrag(getBoxes: () => Box[], newX: number, newY: number) {
      const { x, y, w, h } = hintBox.value!;
      if (newX == x && newY == y) return;

      // check border constraints
      if (newX + w > props.cols || newX < 0) return
      const newBox = { use: '', x: newX, y: newY, w, h };
      const boxes = getBoxes();
      if (props.compress) {
        if (compress(boxes, newBox, newY > y)) {
          hintBox.value!.x = newBox.x;
          hintBox.value!.y = newBox.y;
        }
      } else if (!hasOverlap(boxes, newBox)) {
        hintBox.value!.x = newX;
        hintBox.value!.y = newY;
      }
    }

    function layoutResize(getBoxes: () => Box[], newW: number, newH: number) {
      const { x, y, w, h } = hintBox.value!;
      if (newW == w && newH == h) return;

      // check border constraints
      if (x + newW > props.cols) return;
      const newBox = { use: '', x, y, w: newW, h: newH };
      const boxes = getBoxes();
      if (props.compress) {
        if (compress(boxes, newBox)) {
          hintBox.value!.x = newBox.x;
          hintBox.value!.y = newBox.y;
          hintBox.value!.w = newBox.w;
          hintBox.value!.h = newBox.h;
        }
      } else if (!hasOverlap(boxes, newBox)) {
        hintBox.value!.w = newW;
        hintBox.value!.h = newH;
      }
    }
  
    provide(paneInjectKey, {
      onDragStart(i: number) {
        measureCellSize();
        let box = layout.value[i];
        hintBox.value = box && {
          ...box,
        };
        let el = children.value[i].$el;      
        startPos = [el.offsetLeft, el.offsetTop];
      },
      onDragMove(i: number, left: number, top: number) {
        // Offset by half cell's size, so that movement is more netural
        left += startPos[0] + cellSize[0] / 2;
        top += startPos[1] + cellSize[1] / 2;
        let [x, y] = cellByPos(left, top);
        layoutDrag(() => {
          const otherBoxes = toRaw(layout.value).concat();
          otherBoxes.splice(i, 1);
          return otherBoxes;
        }, x, y);
      },
      onDragEnd(i: number) {
        if (!hintBox.value) return;
        let box = layout.value[i];
        box.x = hintBox.value!.x;
        box.y = hintBox.value!.y;
        hintBox.value = undefined;
      },
      onResizeStart(i: number) {
        measureCellSize();
        let box = layout.value[i];
        hintBox.value = box && {
          ...box,
        };
      },
      onResize(i: number, width: number, height: number) {
        let widthWithGap = cellSize[0] + props.gap;
        let heightWithGap = cellSize[1] + props.gap;
        let newW = Math.max(1, Math.floor((width + cellSize[0] / 2) / widthWithGap));
        let newH = Math.max(1, Math.floor((height + cellSize[1] / 2) / heightWithGap));
  
        layoutResize(() => {
          const otherBoxes = toRaw(layout.value ?? []).concat();
          otherBoxes.splice(i, 1);
          return otherBoxes;
        }, newW, newH);
      },
      onResizeEnd(i: number) {
        if (!hintBox.value) return;
        let box = layout.value[i];
        box.w = hintBox.value!.w;
        box.h = hintBox.value!.h;
        hintBox.value = undefined;
      },
    });

    let rect: DOMRect | undefined;
    let transferData: {
      w: number; h: number;
    };
    function onDragenter(evt: DragEvent) {
      if (validData(evt.dataTransfer)) {
        evt.preventDefault();
        measureCellSize();
        let w = 1, h = 1;
        // Size are passes as keys, since some browsers won't let you read transfer data in dragenter/dragover events
        for (let t of evt.dataTransfer!.types) {
          if (t.startsWith('props:')) {
            let size = JSON.parse(t.substring('props:'.length));
            w = size.w;
            h = size.h;
            break;
          }
        }
        transferData = { w, h };
        rect = elm.value?.getBoundingClientRect();
      } else {
        rect = undefined;
      }
    }

    function onDragover(evt: DragEvent) {
      if (rect) {
        evt.preventDefault();
        let { clientX, clientY } = evt;
        let offsetX = clientX - rect.left, offsetY = clientY - rect.top;
        let [x, y] = cellByPos(offsetX, offsetY);
        if (!hintBox.value) hintBox.value = { use: '', x, y, w: transferData.w, h: transferData.h };

        layoutDrag(() => layout.value.concat(), x, y);
      }
    }

    function onDragleave(evt: DragEvent) {
      // relatedTarget is the element entering into
      if (!elm.value?.contains(evt.relatedTarget as HTMLElement)) {
        hintBox.value = undefined;
      }
    }

    function onDrop(evt: DragEvent) {
      evt.preventDefault();
      let name = evt.dataTransfer!.getData(MIME);
      let hint = hintBox.value!;
      layout.value.push({
        use: name,
        x: hint.x,
        y: hint.y,
        w: hint.w,
        h: hint.h,
      });
      hintBox.value = undefined;
    }

    return () => {
      let content;
      if (layout.value.length) {
        content = renderLayout(props.locked, props.library, layout.value, children);
      } else if (slots.placeholder) {
        content = <div class="j-tile-layout-placeholder">{slots.placeholder()}</div>;
      }
      // hint object is a box to show location of the object under drag
      let hint;
      if (hintBox.value) {
        const { x, y, w, h } = hintBox.value;
        hint = (
          <div class="j-tile-layout-hint"
            style={{
              'grid-area': `${y + 1}/${x + 1}/span ${h}/span ${w}`
            }}
          />
        );
      }

      let style: StyleValue = {
        'grid-template-columns': `repeat(${props.cols}, 1fr)`,
        'grid-auto-rows': `${props.rowHeight}px`,
        'gap': `${props.gap}px`,
      };
      return (
        <div class="j-tile-layout"
          ref={ elm }
          onDragenter={ onDragenter }
          onDragleave={ onDragleave }
          onDragover={ onDragover }
          onDrop={ onDrop }
          style={style}
        >
          <div class="j-tile-layout-unit-cell" ref={unitCell}></div>
          { content }
          { hint }
        </div>
      );
    }
  }
});

function renderLayout(locked: boolean, library: Library, layout: Layout, children: Ref<any[]>): JSX.Element[] {
  return layout.map((e, i) => {
    return <TilePane ref={(e: any) => children.value[i] = e} i={i} library={library} {...e} static={locked || e.static} />;
  });
}

function normalizePreset(
  config: {cols: number},
  preset: Preset,
): Layout {
  // todo
  return preset as Layout;
}

function isOverlap(a: Box, b: Box): boolean {
  return !(
    b.x >= a.x + a.w ||
    b.x + b.w <= a.x ||
    b.y >= a.y + a.h ||
    b.y + b.h <= a.y
  );
}

function hasOverlap(boxes: Box[], target: Box): boolean {
  for (let box of boxes) {
    if (isOverlap(box, target)) {
      return true;
    }
  }
  return false;
}

/**
 * Vertically compress boxes
 * @param boxes Other boxes
 * @param target The box in action
 * @param down When down is true, compare with target box's bottom edge
 * @returns compress succeed or not
 */ 
function compress(boxes: Box[], target: Box, down: boolean = false): boolean {
  boxes.sort((a, b) => a.y - b.y);
  let i;
  // Find an insertion index that will keep the list sorted
  if (down) {
    i = findLastIndex(boxes, (e) => e.y + e.h <= target.y + target.h);
    i++;
  } else {
    i = boxes.findIndex(e => e.y >= target.y);
    if (i == -1) boxes.length;
  }
  boxes.splice(i, 0, target);

  const heights = [];
  for (let box of boxes) {
    let y = 0;
    if (box.static) {
      // If box is static, no compression is necessary
      y = box.y;
    } else {
      // Iterate all columns occupied by this box,
      // find the y position this box will be placed at
      for (let i = box.x, j = box.x + box.w; i < j; i++) {
        y = Math.max(y, heights[i] ?? 0);
      }
      box.y = y;
    }
    // Update current height for all columns
    for (let i = box.x, j = box.x + box.w; i < j; i++) {
      let maxH = y + box.h;
      if (maxH < heights[i]) {
        // TODO: ???
        return false;
      }
      heights[i] = maxH;
    }
  }
  return true;
}

function findLastIndex<T>(list: T[], cbk: (e: T) => boolean) {
  for (let i = list.length - 1; i >= 0; i--) {
    if (cbk(list[i])) return i;
  }
  return -1;
}

function validData(dt?: DataTransfer | null): boolean {
  return dt ? dt.types.indexOf(MIME) != -1 : false;
}
