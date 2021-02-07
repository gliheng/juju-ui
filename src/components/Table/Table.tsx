import { defineComponent, reactive, ref, h, computed } from 'vue';
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

    let stickyPos = computed(() => {
      let columns = props.columns as ColumnConfig[];
      let m = new Map();
      let v = 0;
      for (let i = 0; i < columns.length; i++) {
        m.set(columns[i], { left: v });
        v += columns[i].width || 0;
      }
      v = 0;
      for (let i = columns.length - 1; i >= 0; i--) {
        m.get(columns[i]).right = v;
        v += columns[i].width || 0;
      }
      return m;
    });

    function renderHead() {
      let cells = (props.columns as ColumnConfig[]).map((col, i) => {
        let label = '' ;
        if (col.label) {
          label = col.label;
        }
        let style: Record<string, any> = {};
        if (col.sticky) {
          let d = stickyPos.value.get(col);
          if (col.sticky == 'left') {
            style.left = `${d.left}px`;
          } else if (col.sticky == 'right') {
            style.right = `${d.right}px`;
          }
        }
        let className = '';
        if (col.sticky) {
          className = 'j-table-sticky';
        }
        return <th key={ i } class={ className } style={ style }>{ label }</th>
      });
      return (
        <thead>
          <tr>{ cells }</tr>
        </thead>
      );
    }

    function renderBody() {
      let rows = (props.data! as Datum[]).map((datum, i) => {
        let rowKey = getRowKey(datum as Datum, i);
        return (
          <Row key={rowKey}
            datum={datum}
            stickyPos={stickyPos.value}
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
    
    let headerRef = ref();

    // sync header horizontal scroll with body
    function onBodyScroll(evt: Event) {
      if (headerRef.value) {
        let sl = (evt.currentTarget as HTMLElement).scrollLeft;
        headerRef.value.scrollLeft = sl;
      }
    }

    return () => {
      if (props.fixedHeader) {
        let bodyStyle: Record<string, string | number> = {};
        if (typeof props.height == 'number') {
          bodyStyle.maxHeight = `${props.height}px`;
        }

        return (
          <div class="j-table" data-fixed-header={ true } data-bordered={ props.bordered }>
            <div class="j-table-head-part" ref={ headerRef }>
              <table>
                <ColGroup columns={ props.columns } />
                { renderHead() }
              </table>
            </div>
            <Scroller class="j-table-body-part" style={ bodyStyle } onScroll={ onBodyScroll }>
              {() => {
                return (
                  <table>
                    <ColGroup columns={ props.columns } />
                    { props.data && renderBody() }
                  </table>
                );
              }}
            </Scroller>
          </div>
        );
      }

      return (
        <div class="j-table" data-bordered={ props.bordered }>
          <table>
            { renderHead() }
            { props.data && renderBody() }
          </table>
        </div>
      );
    };
  },
});