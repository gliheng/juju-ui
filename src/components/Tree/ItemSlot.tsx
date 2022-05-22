import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    renderer: Function,
    args: Object,
  },
  setup(props) {
    return () => {
      if (props.renderer) {
        return props.renderer({ ...props.args });
      }
    };
  },
});
