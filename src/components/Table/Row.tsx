import { defineComponent, ref, inject, h } from 'vue';
import { Datum, ColumnConfig } from './types';

export const TableRowSetCancelSelect = Symbol('TableRowSetConcelSelect');

export default defineComponent({
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    datum: {
      type: Object,
    },
    columns: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    function getCellKey(datum: Datum, col: ColumnConfig, i: number): string {
      if (typeof col.cellKey == 'string') {
        return datum[col.cellKey];
      } else if (typeof col.cellKey == 'function') {
        return col.cellKey(datum);
      } if (typeof col.field == 'string') {
        return col.field;
      }
      return String(i);
    }

    function getCellDisplay(datum: Datum, col: ColumnConfig) {
      if (col.field) {
        let parts = col.field.split('.');
        return parts.reduce((d, key) => d[key], datum);
      } else if (col.render) {
        return col.render(datum);
      }
      return col.default;
    }

    function toggleSelect() {
      emit('select');
    }
    
    return () => {
      let cells = (props.columns as ColumnConfig[]).map((col, j) => {
        let style = {};
        if (col.align) {
          style['text-align'] = col.align;
        }
        return (
          <td className={col.class} key={getCellKey(props.datum, col, j)} style={style}>
            { getCellDisplay(props.datum, col) }
          </td>
        );
      });
      return (
        <tr data-selected={props.selected} onClick={toggleSelect}>{ cells }</tr>
      );  
    };
  }
});