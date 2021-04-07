import { defineComponent, reactive, h } from 'vue';
import Row from './Row';
import { ColumnConfig, Datum } from './types';
import '../../assets/styles/Table.scss';

export default defineComponent({
  props: {
    rowKey: {
      type: [String, Function],
    },
    data: Array,
    columns: {
      type: Array,
      default: [],
    },
    // use rowConfig to add additional style for each row
    rowConfig: {
      type: Object,
      default: {},
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    multiSelectable: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let selected = reactive(new Set());

    function getRowKey(datum: Datum, i: number) {
      if (typeof props.rowKey == 'string') {
        return datum[props.rowKey];
      } else if (typeof props.rowKey == 'function') {
        return props.rowKey(datum);
      }
      return String(i);
    }

    function renderHead() {
      let columns = props.columns as ColumnConfig[];
      let cells = columns.map((col, i) => {
        let label = '' ;
        if (col.label) {
          label = col.label;
        }
        return (
          <th key={ i }>{ label }</th>
        );
      });
      return (
        <thead>
          <tr>{ cells }</tr>
        </thead>
      );
    }

    function renderBody(data: Datum[]) {
      let rows = data.map((datum, i) => {
        let rowKey = getRowKey(datum as Datum, i);
        return (
          <Row key={rowKey}
            datum={datum}
            columns={props.columns}
            rowConfig={props.rowConfig}
            selected={selected.has(rowKey)}
            // @ts-ignore
            onSelect={selectRow.bind(null, rowKey)} />
        );
      });

      return <tbody>{ rows }</tbody>;
    }

    function selectRow(key: string) {
      if (props.multiSelectable) {
        if (selected.has(key)) {
          selected.delete(key);
        } else {
          selected.add(key);
        }
      } else if (props.selectable) {
        selected.clear();
        selected.add(key);
      }
    }

    return () => {
      return (
        <div class="j-table" data-bordered={ props.bordered }>
          <table>
            { renderHead() }
            { props.data && renderBody(props.data as Datum[]) }
          </table>
        </div>
      );
    };
  },
});