import { defineComponent, h } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  props: {
    flex: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      required: false,
    },
    minSize: {
      type: Number,
      required: false,
    },
    maxSize: {
      type: Number,
      required: false,
    },
  },
  setup(_, { slots, attrs }) {
    return () => {
      let content;
      if (slots.default) {
        content = slots.default();
      }

      
      let style: Record<string, any> = {};
      let { actualSize } = attrs;
      if (actualSize) {
        style.flexBasis = actualSize;
      }

      return (
        <div class={['j-splitter-panel', attrs.class]} style={style}>
          { content }
        </div>
      );
    }
  }
});
