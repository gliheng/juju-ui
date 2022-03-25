import { defineComponent, h, PropType } from 'vue';
import { Datum, ColumnConfig, RowConfig } from './types';
import Checkbox from '../Checkbox/Checkbox.vue';

export default defineComponent({
  name: 'Row',
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
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
      type: Map as PropType<Map<number, number>>,
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
      if (col.type == 'selection') {
        return (
          <Checkbox
            modelValue={props.selected}
            onUpdate:modelValue={() => emit('select')}
          />
        );
      } else if (col.type == 'index') {
        return String(props.index + 1);
      }
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
        let { type, align, class: klass, sticky } = col;
        if (type == 'selection') {
          align = 'center';
        }
        if (align) {
          style['text-align'] = align;
        }
        let cellClass = '';
        if (typeof klass == 'function') {
          cellClass = klass(props.datum);
        } else if (klass) {
          cellClass = klass;
        }
        if (sticky && props.stickyPos) {
          cellClass += ' j-table-sticky';
          let pos = props.stickyPos.get(i);
          if (pos !== undefined) {
            if (sticky == 'left') {
              style.left = `${pos}px`;
            }
            if (sticky == 'right') {
              style.right = `${pos}px`;
            }
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
        >{ cells }</tr>
      );  
    };
  }
});