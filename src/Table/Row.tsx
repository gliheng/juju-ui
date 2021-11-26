import { defineComponent, h } from 'vue';
import { Datum, ColumnConfig, RowConfig } from './types';

export default defineComponent({
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    datum: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      default: [],
    },
    stickyPos: {
      type: Map,
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
      // render nothing for empty column
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

      let columns = props.columns as ColumnConfig[];
      let cells = columns.map((col, i) => {
        let style: Record<string, string> = {};
        if (col.align) {
          style['text-align'] = col.align;
        }
        let cellClass = '';
        if (typeof col.class == 'function') {
          cellClass = col.class(props.datum);
        } else if (col.class) {
          cellClass = col.class;
        }
        if (col.sticky && props.stickyPos) {
          cellClass += ' j-table-sticky';
          let pos = props.stickyPos.get(col) as any;
          if (col.sticky == 'left') {
            style.left = `${pos.left}px`;
          }
          if (col.sticky == 'right') {
            style.right = `${pos.right}px`;
          }
        }
        return (
          <td
            class={ cellClass }
            key={ getCellKey(props.datum, col, i) }
            style={ style }
          >
            { getCellDisplay(props.datum, col) }
          </td>
        );
      });
      return (
        <tr
          class={ rowClass }
          data-selected={ props.selected }
          onClick={ toggleSelect }
        >{ cells }</tr>
      );  
    };
  }
});