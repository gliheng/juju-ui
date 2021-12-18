import {
  defineComponent, computed, ref, h, Fragment,
} from 'vue';
import Scroller from './Scroller.vue';
import { useElementSize } from '@utils/hooks';

const BATCH_SIZE = 10;
// batch render items, so changes to the dom are less frequent
const BatchRenderer = defineComponent({
  props: {
    items: {
      type: Array,
      default: []
    },
    itemRenderer: {
      type: Function,
      required: true,
    },
    start: Number,
    end: Number,
  },
  setup(props) {
    return () =>  {
      let data = props.items;
      if (props.start !== undefined && props.end !== undefined) {
        data = data.slice(props.start, props.end)
      }
      return <>{ data.map(props.itemRenderer as any) }</>;
    };
  },
});

// This virtual scroller only support fixed height items
export default defineComponent({
  name: "VirtualScroller",
  props: {
    items: {
      type: Array,
      default: []
    },
    itemRenderer: {
      type: Function,
      required: true,
    },
    containerRenderer: Function,
    // only support virtual scrolling of fixed height items
    itemHeight: {
      type: Number,
      default: 30,
    },
    onScroll: Function,
    style: Object,
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
    let itemCount = computed(() => {
      if (!props.virtual) return props.items.length;
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
      return (
        <Scroller
          ref={ containerRef }
          style={ props.style }
          overlayScrollbar={ props.overlayScrollbar }
          onScroll={ onScroll }
        >
        {() => {
          let content;

          if (!props.virtual) {
            content = (
              <BatchRenderer
                items={ props.items }
                itemRenderer={ props.itemRenderer } />
            );
          } else if (itemCount.value > 0) {
            let end = itemCount.value + startIdx.value + BATCH_SIZE;
            content = (
              <BatchRenderer
                items={ props.items }
                itemRenderer={ props.itemRenderer }
                start={startIdx.value} end={ end }
              />
            );
          }
          // wrap content inside a custom container renderer
          content = props.containerRenderer ? props.containerRenderer(content) : content;
          if (props.virtual)  {
            // apply virtual scroll viewport
            let totalHeight = props.itemHeight * props.items.length;
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
