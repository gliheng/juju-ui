import { defineComponent, h } from 'vue';
import { Datum, ColumnConfig, RowConfig } from './types';

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
    rowConfig: {
      type: Object,
      default: {},
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
      let s;
      if (col.field) {
        let parts = col.field.split('.');
        s = parts.reduce((d, key) => d[key], datum);
      }
      s = s || col.default;
      if (col.render) {
        if (s) {
          return col.render(datum, s);
        } else {
          return col.render(datum);
        }
      }
      return s;
    }

    function toggleSelect() {
      emit('select');
    }
    
    return () => {
      let rowClass = '';
      let { rowConfig } = props;
      if ((rowConfig as RowConfig).class) {
        if (typeof rowConfig.class == 'function') {
          rowClass = rowConfig.class(props.datum);
        } else {
          rowClass = rowConfig.class;
        }
      }

      let cells = (props.columns as ColumnConfig[]).map((col, j) => {
        let style: Record<string, string> = {};
        if (col.align) {
          style['text-align'] = col.align;
        }
        let cellClass;
        if (typeof col.class == 'function') {
          cellClass = col.class(props.datum);
        } else {
          cellClass = col.class;
        }
        return (
          <td class={cellClass} key={getCellKey(props.datum, col, j)} style={style}>
            { getCellDisplay(props.datum, col) }
          </td>
        );
      });
      return (
        <tr class={rowClass} data-selected={props.selected} onClick={toggleSelect}>{ cells }</tr>
      );  
    };
  }
});