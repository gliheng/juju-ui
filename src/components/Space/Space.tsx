import { defineComponent, h } from 'vue';
import './Space.scss';

export default defineComponent({
  props: {
    size: Number,
  },
  setup(props, { slots }) {
    return () => {
      let nodes;
      if (slots.default) {
        nodes = slots.default();
        let style = { marginRight: `${props.size}px` };
        nodes = nodes.map((node, i) => {
          return <div class="j-space-item" style={ i != nodes.length - 1 ? style : undefined }>{ node }</div>;
        });
      }
      return <div class="j-space">{ nodes }</div>;
    }
  }
});