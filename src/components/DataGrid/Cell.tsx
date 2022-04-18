import { h, defineComponent, PropType, reactive, StyleValue } from 'vue';

export default defineComponent({
  setup(props, { slots }) {
    return () => {
      return (
        <div>{ slots.default?.() }</div>
      );
    };
  },
});
