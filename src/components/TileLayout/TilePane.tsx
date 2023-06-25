import { defineComponent, PropType, ref, StyleValue, InjectionKey, inject } from 'vue';
import resizable from '@directives/resizable';
import draggable from '@directives/draggable';
import Icon from '@/Icon/Icon.vue';
import { Library } from './types';

export const paneInjectKey = Symbol() as InjectionKey<{
  onResizeStart(i: number): void;
  onResize(i: number, w: number, h: number): void;
  onResizeEnd(i: number): void;
  onDragStart(i: number): void;
  onDragMove(i: number, x: number, y: number): void;
  onDragEnd(i: number): void;
}>;

export default defineComponent({
  name: 'TilePane',
  directives: {
    resizable, draggable,
  },
  props: {
    i: {
      type: Number,
      required: true,
    },
    library: {
      type: Array as PropType<Library>,
      required: true,
    },
    static: Boolean,
    closable: Boolean,
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
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup(props) {
    // This is probably useless
    let el = ref<HTMLElement>();
    let parent = inject(paneInjectKey);

    return () => {
      let { library, use, x, y, w, h, i } = props;
      let Component = library.find(item => item.name == use) as any;
      let style: StyleValue = {
        'grid-area': `${y + 1}/${x + 1}/span ${h}/span ${w}`
      };

      if (!Component) {
        return (
          <div class="j-tile-layout-pane"
            ref={(e) => el.value = e as HTMLElement}
            style={style}
          >Cannot find component: {use}</div>
        );
      }

      let closeBtn;
      if (props.closable && props.onClose) {
        closeBtn = (
          <a
            class="j-tile-layout-pane-close"
            onClick={props.onClose}
          >
            <Icon name="close-outline" />
          </a>
        );
      }

      return (
        <div class="j-tile-layout-pane"
          ref={(e) => el.value = e as HTMLElement}
          style={style}
          data-static={props.static}
          v-resizable={!props.static && {
            onResizeStart() {
              parent?.onResizeStart(i);
            },
            onResize(w: number, h: number) {
              parent?.onResize(i, w, h);
            },
            onResizeEnd(w: number, h: number) {
              parent?.onResizeEnd(i);
            },
          }}
          v-draggable={!props.static && {
            onDragStart() {
              parent?.onDragStart(i);
            },
            onDragMove(x: number, y: number) {
              parent?.onDragMove(i, x, y);
            },
            onDragEnd(x: number, y: number) {
              parent?.onDragEnd(i);
            },
          }}
        >
          {closeBtn}
          <Component />
        </div>
      );  
    };
  }
});
