import { defineComponent, h } from 'vue';
import { ColumnConfig } from './types';

export default defineComponent({
  props: {
    columns: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    return () => {
      let cols = (props.columns as ColumnConfig[]).map((col) => {
        if (typeof col.width == 'number') {
          return <col width={col.width} />;
        }
        return <col />;
      });
      return (
        <colgroup>{ cols }</colgroup>
      );
    };
  }
});