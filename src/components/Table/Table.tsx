import { defineComponent, reactive, h } from 'vue';
import Row from './Row';
import ColGroup from './ColGroup';
import '../../assets/styles/Table.scss';
import { ColumnConfig, Datum } from './types';

export default defineComponent({
  props: {
    rowKey: {
      type: [String, Function],
    },
    data: {
      type: Array,
    },
    columns: {
      type: Array,
      default: [],
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    multiSelectable: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
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
      let cells = (props.columns as ColumnConfig[]).map((col, i) => {
        return <th key={i}>{ col.label || '' }</th>
      });
      return (
        <thead>
          <tr>{ cells }</tr>
        </thead>
      );
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

    function renderBody() {
      let rows = (props.data! as Datum[]).map((datum, i) => {
        let rowKey = getRowKey(datum as Datum, i);
        return (
          <Row key={rowKey}
            datum={datum} 
            columns={props.columns}
            selected={selected.has(rowKey)}
            onSelect={selectRow.bind(null, rowKey)} />
        );
      });

      return <tbody>{ rows }</tbody>;
    }
    
    return () => {
      if (typeof props.height == 'number') {
        let bodyStyle = {};
        if (typeof props.height == 'number') {
          bodyStyle.overflow = 'auto';
          bodyStyle.maxHeight = `${props.height}px`;
        }
  
        return (
          <table class="j-table">
            <div>
              <table>
                <ColGroup columns={props.columns} />
                { renderHead() }
              </table>
            </div>
            <div style={bodyStyle}>
              <table>
                <ColGroup columns={props.columns} />
                { props.data && renderBody() }
              </table>
            </div>
          </table>
        );
      }

      return (
        <div class="j-table">
          <table>
            { renderHead() }
            { props.data && renderBody() }
          </table>
        </div>
      );
    };
  },
});