import { computed, defineComponent, h } from 'vue';
import './Space.scss';

export default defineComponent({
  props: {
    size: {
      type: [Number, String],
      default: 10,
    },
  },
  setup(props, { slots }) {
    let style = computed(() => ({
      marginRight: typeof props.size == 'number' ? `${props.size}px` : props.size,
    }));
    return () => {
      let nodes;
      if (slots.default) {
        // Exclude comment node
        nodes = slots.default().filter(e => typeof e.type != 'symbol');
        nodes = nodes.map((node, i) => {
          return (
            <div
              class="j-space-item"
              style={ i != nodes.length - 1 ? style.value : undefined }
            >
              { node }
            </div>
          );
        });
      }
      return <div class="j-space">{ nodes }</div>;
    }
  }
});