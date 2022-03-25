import {
  h,
  defineComponent,
  ref,
  computed,
  Fragment,
  PropType,
} from 'vue';
import Scroller from './Scroller.vue';
import { useElementSize } from '@utils/hooks';

const BATCH_SIZE = 10;
// batch render items, so changes to the dom are less frequent
const BatchRenderer = defineComponent({
  name: 'BatchRenderer',
  props: {
    itemRenderer: {
      type: Function as PropType<(i: number) => JSX.Element>,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return () =>  {
      let { itemRenderer, start, end } = props;
      let rows = [];
      for (let i = start; i <= end; i++) {
        rows.push(itemRenderer(i));
      }
      return <>{ rows }</>;
    };
  },
});

// This virtual scroller only support fixed height items
export default defineComponent({
  name: "VirtualScroller",
  props: {
    itemCount: {
      type: Number,
      required: true,
    },
    itemRenderer: {
      type: Function as PropType<(i: number) => JSX.Element>,
      required: true,
    },
    containerRenderer: Function as PropType<(nodes: JSX.Element | undefined) => JSX.Element>,
    itemHeight: {
      type: Number,
      default: 30,
    },
    onScroll: Function,
    virtual: {
      type: Boolean,
      default: false,
    },
    overlayScrollbar: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { expose }) {
    let containerRef = ref();
    let containerEl = computed(() => containerRef.value?.$el);
    // how many items does the virtual window contains
    let scrollerSize = useElementSize(containerEl);
    let frameItemCount = computed(() => {
      if (!props.virtual) return props.itemCount || 0;
      if (!containerEl.value) return -1;

      let { height } = scrollerSize;
      let itemCount = Math.ceil(height / props.itemHeight);
      return itemCount;
    });

    // the y sliding of virtual window
    let yOffset = ref(0);
    // which item does the rendering start
    let startIdx = ref(0);
    function onScroll(evt: Event) {
      if (props.onScroll) props.onScroll(evt);
      let st = (evt.target as HTMLElement).scrollTop;
      let idx = Math.floor(st / props.itemHeight / BATCH_SIZE) * BATCH_SIZE;
      let mod = st % (props.itemHeight * BATCH_SIZE);
      startIdx.value = idx;
      yOffset.value = st - mod;
    }

    expose({
      reset() {
        yOffset.value = 0;
        startIdx.value = 0;
      },
    });

    return () => {
      if (import.meta.env.DEV && props.virtual && typeof props.itemHeight != 'number') {
        console.error('Virtual scroll requires itemHeight to be set');
      }
      return (
        <Scroller
          ref={ containerRef }
          overlayScrollbar={ props.overlayScrollbar }
          onScroll={ onScroll }
        >
        {() => {
          let start = 0, end = props.itemCount - 1;
          if (props.virtual && frameItemCount.value > 0) {
            start = startIdx.value;
            end = Math.min(frameItemCount.value + startIdx.value + BATCH_SIZE, end);
          }

          let content = (
            <BatchRenderer
              itemRenderer={props.itemRenderer}
              start={start}
              end={end}
            />
          );
          // wrap content inside a custom container renderer
          content = props.containerRenderer ? props.containerRenderer(content) : content;
          if (props.virtual)  {
            // apply virtual scroll viewport
            let totalHeight = props.itemHeight * props.itemCount;
            content = (
              <div class="j-scroller-frame" style={{
                height: `${ totalHeight }px`
              }}>
                <div class="j-scroller-viewport" style={{
                  transform: `translate3d(0, ${yOffset.value}px, 0)`,
                }}>{ content }</div>
              </div>
            );
          }
          return content;
        }}
        </Scroller>
      );
    };
  },
});
