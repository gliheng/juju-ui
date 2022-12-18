import { defineComponent, ref, h, PropType, StyleValue } from 'vue';
import { Library, Preset, Layout } from './types';
import TilePane from './TilePane';
import './style.scss';

export default defineComponent({
  props: {
    library: {
      type: Array as PropType<Library>,
      required: true,
    },
    rowHeight: {
      type: Number,
      default: 100,
    },
    cols: {
      type: Number,
      default: 12,
    },
    preset: {
      type: Object as PropType<Preset>,
      required: false,
    },
    storageKey: {
      type: String,
      required: false,
    },
  },
  setup(props, { slots }) {
    let { preset } = props;
    let layout = ref<Layout>();
    if (preset) {
      layout.value = normalizePreset({ cols: props.cols }, preset);
    }
    return () => {
      let content;
      if (layout.value) {
        content = renderLayout(props.library, layout.value);
      } else if (slots.placeholder) {
        content = slots.placeholder();
      }
      let maxRows = 10;
      let style: StyleValue = {
        'grid-template-columns': `repeat(${props.cols}, 1fr)`,
        'grid-template-rows': `repeat(${maxRows}, ${props.rowHeight}px)`,
        'grid-auto-rows': `${props.rowHeight}px`,
      };
      return (
        <div class="j-tile-layout" style={style}>
          { content }
        </div>
      );
    }
  }
});

function renderLayout(library: Library, layout: Layout): JSX.Element[] {
  return layout.map(e => {
    return <TilePane library={library} {...e} static={false} />;
  });
}

function normalizePreset(
  config: {cols: number},
  preset: Preset,
): Layout {
  // todo
  return preset as Layout;
}