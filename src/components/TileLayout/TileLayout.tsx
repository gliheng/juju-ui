import { defineComponent, ref, h, PropType, StyleValue, provide, Ref, ComponentPublicInstance, Transition } from 'vue';
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
      onDragMove(i: number, x: number, y: number) {
        let widthWithGap = cellSize[0] + props.gap;
        let heightWithGap = cellSize[1] + props.gap;
        x += startPos[0];
        y += startPos[1];
        let newX = Math.max(0, Math.floor((x + cellSize[0] / 2) / widthWithGap));
        let newY = Math.max(0, Math.floor((y + cellSize[1] / 2) / heightWithGap));
        hintBox.value!.x = newX;
        hintBox.value!.y = newY;
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
      onResize(i: number, w: number, h: number) {
        let widthWithGap = cellSize[0] + props.gap;
        let heightWithGap = cellSize[1] + props.gap;
        let newW = Math.max(1, Math.floor((w + cellSize[0] / 2) / widthWithGap));
        let newH = Math.max(1, Math.floor((h + cellSize[1] / 2) / heightWithGap));
        hintBox.value!.w = newW;
        hintBox.value!.h = newH;
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