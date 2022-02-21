import { defineComponent, h, PropType } from 'vue';

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<(number | undefined)[]>,
      default: () => [],
    },
  },
  setup(props) {
    return () => {
      let cols = props.columns.map((w) => {
        if (typeof w == 'number') {
          let style = {
            width: `${w}px`,
          };
          return <col style={style} />;
        }
        return <col />;
      });
      return (
        <colgroup>{ cols }</colgroup>
      );
    };
  }
});