import { defineComponent, ref, h, PropType, StyleValue, provide, Ref, ComponentPublicInstance, toRaw } from 'vue';
import { Library, Preset, Layout, Box } from './types';
import TilePane, { paneInjectKey } from './TilePane';
import './style.scss';

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
    let { preset } = props;
    let layout = ref<Layout>();
    let children = ref<ComponentPublicInstance[]>([]);
    if (preset) {
      layout.value = normalizePreset({ cols: props.cols }, preset);
    }
    let hintBox = ref<Box | undefined>();
    let cellSize = [0, 0];
    let startPos = [0, 0];

    function measureCellSize(el: HTMLElement, box: Box): [number, number] {
      let width = el.clientWidth, height = el.clientHeight;
      let cellWidth = (width - props.gap * (box.w - 1)) / box.w;
      let cellHeight = (height - props.gap * (box.h - 1)) / box.h;
      return [cellWidth, cellHeight];
    }

    provide(paneInjectKey, {
      onDragStart(i: number) {
        let box = layout.value![i];
        hintBox.value = box && {
          ...box,
        };
        let el = children.value[i].$el;
        cellSize = measureCellSize(el, box);
        startPos = [el.offsetLeft, el.offsetTop];
      },
      onDragMove(i: number, left: number, top: number) {
        let widthWithGap = cellSize[0] + props.gap;
        let heightWithGap = cellSize[1] + props.gap;
        left += startPos[0];
        top += startPos[1];
        let newX = Math.max(0, Math.floor((left + cellSize[0] / 2) / widthWithGap));
        let newY = Math.max(0, Math.floor((top + cellSize[1] / 2) / heightWithGap));
  
        const { x, y, w, h } = hintBox.value!;
        if (newX == x && newY == y) return;
  
        // check overlap
        if (newX + w > props.cols || newX < 0) return
        let newBox = { use: '', x: newX, y: newY, w, h };
        const otherBoxes = toRaw(layout.value ?? []).concat();
        otherBoxes.splice(i, 1);
        if (props.compress) {
          if (compress(otherBoxes, newBox, newY > y)) {
            hintBox.value!.x = newBox.x;
            hintBox.value!.y = newBox.y;
          }
        } else if (!hasOverlap(otherBoxes, newBox)) {
          hintBox.value!.x = newX;
          hintBox.value!.y = newY;
        }
      },
      onDragEnd(i: number) {
        if (!hintBox.value) return;
        let box = layout.value![i];
        box.x = hintBox.value!.x;
        box.y = hintBox.value!.y;
        hintBox.value = undefined;
      },
      onResizeStart(i: number) {
        let box = layout.value![i];
        hintBox.value = box && {
          ...box,
        };
        let el = children.value[i].$el;
        cellSize = measureCellSize(el, box);
      },
      onResize(i: number, width: number, height: number) {
        let widthWithGap = cellSize[0] + props.gap;
        let heightWithGap = cellSize[1] + props.gap;
        let newW = Math.max(1, Math.floor((width + cellSize[0] / 2) / widthWithGap));
        let newH = Math.max(1, Math.floor((height + cellSize[1] / 2) / heightWithGap));

        const { x, y, w, h } = hintBox.value!;
        if (newW == w && newH == h) return;
  
        // check overlap
        if (x + newW > props.cols) return;
        const newBox = { use: '', x, y, w: newW, h: newH };
        const otherBoxes = toRaw(layout.value ?? []).concat();
        otherBoxes.splice(i, 1);
        if (props.compress) {
          if (compress(otherBoxes, newBox)) {
            hintBox.value!.x = newBox.x;
            hintBox.value!.y = newBox.y;
            hintBox.value!.w = newBox.w;
            hintBox.value!.h = newBox.h;
          }
        } else if (!hasOverlap(otherBoxes, newBox)) {
          hintBox.value!.w = newW;
          hintBox.value!.h = newH;
        }
      },
      onResizeEnd(i: number) {
        if (!hintBox.value) return;
        let box = layout.value![i];
        box.w = hintBox.value!.w;
        box.h = hintBox.value!.h;
        hintBox.value = undefined;
      },
    });

    return () => {
      let content;
      if (layout.value) {
        content = renderLayout(props.locked, props.library, layout.value, children);
      } else if (slots.placeholder) {
        content = <div class="j-tile-layout-placeholder" style={{'grid-column': `1 / span ${props.cols}`}}>{slots.placeholder()}</div>;
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
        <div class="j-tile-layout" style={style}>
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
      heights[i] = y + box.h;
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
