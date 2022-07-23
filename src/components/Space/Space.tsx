import { computed, defineComponent, h, StyleValue } from 'vue';
import './Space.scss';

export default defineComponent({
  props: {
    size: {
      type: [Number, String],
      default: 10,
    },
  },
  setup(props, { slots }) {
    let style = computed<Record<string, StyleValue>>(() => ({
      '--j-space-size': typeof props.size == 'number' ? `${props.size}px` : props.size,
    }));
    return () => {
      let nodes;
      if (slots.default) {
        nodes = slots.default();
      }
      return <div class="j-space" style={style.value}>{ nodes }</div>;
    }
  }
});