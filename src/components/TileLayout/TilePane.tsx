import { defineComponent, PropType, ref, reactive, StyleValue } from 'vue';
import resizable from '@directives/resizable';
import draggable from '@directives/draggable';
import { Library } from './types';

export default defineComponent({
  name: 'TilePane',
  directives: {
    resizable, draggable,
  },
  props: {
    library: {
      type: Array as PropType<Library>,
      required: true,
    },
    static: Boolean,
    use: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    w: {
      type: Number,
      required: true,
    },
    h: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    let root = ref<HTMLDivElement>();

    return () => {
      let { library, use, x, y, w, h } = props;
      let Component = library.find(item => item.name == use) as any;
      if (!Component) {
        return <span>`Cannot find component: ${use}`</span>;
      }
      let style: StyleValue = {
        'grid-area': `${y + 1}/${x + 1}/span ${h}/span ${w}`
      };
      return (
        <div class="j-tile-layout-pane"
          ref={root}
          style={style}
          v-resizable={!props.static}
          v-draggable={!props.static}
        >
          <Component />
        </div>
      );  
    };
  }
});
