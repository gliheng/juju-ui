import { defineComponent, ref, h, onMounted, onUpdated, watch, nextTick } from "vue";
import { Box } from "./types";

export default defineComponent({
  name: 'HintBox',
  props: {
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
    const root = ref<HTMLElement>();
    const rect = ref<Box>();

    const calcRect = () => {
      const el = root.value;
      rect.value = {
        x: el!.offsetLeft,
        y: el!.offsetTop,
        w: el!.clientWidth,
        h: el!.clientHeight,
      };
    };

    watch(props, () => {
      nextTick(calcRect);
    });

    onMounted(calcRect);

    return () => {
      let animated;
      if (rect.value) {
        const { x, y, w, h } = rect.value;
        animated = (
          <div class="j-tile-layout-hint-animated" style={{
            left: `${x}px`,
            top: `${y}px`,
            width: `${w}px`,
            height: `${h}px`,
          }} />
        );
      }
      const { x, y, w: wSize, h: hSize } = props;
      return (
        <div ref={ root } class="j-tile-layout-hint"
          style={{
            'grid-area': `${y + 1}/${x + 1}/span ${hSize}/span ${wSize}`
          }}
        >
          { animated }
        </div>
      );
    };
  },
});
