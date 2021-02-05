import { defineComponent, reactive, ref, h } from 'vue';
import Row from './Row';
import ColGroup from './ColGroup';
import '../../assets/styles/Table.scss';
import { ColumnConfig, Datum } from './types';
import Scroller from '../Scroller.vue';

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
    fixedHeader: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
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
            rowConfig={props.rowConfig}
            selected={selected.has(rowKey)}
            // @ts-ignore
            onSelect={selectRow.bind(null, rowKey)} />
        );
      });

      return <tbody>{ rows }</tbody>;
    }

    function onBodyScroll(evt: Event) {
      if (headerRef.value) {
        let sl = (evt.currentTarget as HTMLElement).scrollLeft;
        headerRef.value.scrollLeft = sl;
      }
    }

    let headerRef = ref();
    
    return () => {
      if (props.fixedHeader) {
        let bodyStyle: Record<string, string | number> = {};
        if (typeof props.height == 'number') {
          bodyStyle.maxHeight = `${props.height}px`;
        }
  
        return (
          <div class="j-table" data-fixed-header={ true } data-bordered={ props.bordered }>
            <div class="j-head-part" ref={ headerRef }>
              <table>
                <ColGroup columns={ props.columns } />
                { renderHead() }
              </table>
            </div>
            <Scroller class="j-body-part" style={ bodyStyle } onScroll={ onBodyScroll }>
              {
                () => {
                  return (
                    <table>
                      <ColGroup columns={ props.columns } />
                      { props.data && renderBody() }
                    </table>
                  );
                }
              }
            </Scroller>
          </div>
        );
      }

      return (
        <table class="j-table" data-bordered={ props.bordered }>
          { renderHead() }
          { props.data && renderBody() }
        </table>
      );
    };
  },
});