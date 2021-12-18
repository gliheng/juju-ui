import { defineComponent, reactive, ref, computed, h } from 'vue';
import Row from './Row';
import ColGroup from './ColGroup';
import { ColumnConfig, Datum, GroupDatum } from './types';
import VirtualScroller from '../Scroller/VirtualScroller';
import SvgIcon from '../SvgIcon/SvgIcon.vue';
import './Table.scss';


// recursive group data according to grouping rules
function groupData(grouping: string[], data: any[], cur: number = 0, groupPath: string[] = []): Array<Datum | GroupDatum> {
  if (cur >= grouping.length) {
    return data;
  }
  let groups: Record<string, any> = {};
  let groupName = grouping[cur];
  data.forEach(d => {
    let key = d[groupName];
    if (!(key in groups)) {
      groups[key] = [];
    }
    groups[key].push(d);
  });
  return Object.keys(groups).map(key => {
    const newGroupPath = groupPath.concat(key);
    return {
      groupName,
      groupValue: key,
      groupPath: newGroupPath,
      groupChildren: groupData(grouping, groups[key], cur + 1, newGroupPath),
    };
  });
}

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
    fixedHeader: {
      type: Boolean,
      default: false,
    },
    groupIndent: {
      type: Number,
      default: 4,
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
    height: Number,
    bordered: {
      type: Boolean,
      default: false,
    },
    grouping: Array,
    // virtualScroll and itemHeight are used for virtual scroll of content
    virtualScroll: {
      type: Boolean,
      default: false,
    },
    itemHeight: Number,
  },
  setup(props, { slots }) {
    let selected = reactive(new Set());
    
    // grouped data
    let groupedData = computed(() => {
      let { grouping, data } = props;
      if (grouping && data) {
        return groupData(grouping as string[], data);
      }
      return data as Array<Datum>;
    });

    let rowData = computed(() => {
      function traverse(
        data: Array<Datum | GroupDatum>,
        collect: any[],
      ) {
        // flattern grouped data for row rendering
        data.forEach((d, i) => {
          if (d.groupChildren) {
            let groupKey = `${d.groupPath.join('::')}`;
            collect.push([groupKey, d]);
            let expanded = d.groupChildren && groupExpand[groupKey] !== false;
            if (expanded) {
              traverse(d.groupChildren, collect);
            }
          } else {
            collect.push([getRowKey(d, i), d]);
          }
        });
      }
      let data: any[] = [];
      if (groupedData.value) {
        traverse(groupedData.value, data);
      }
      return data;
    });

    // record group expansion state
    let groupExpand = reactive<Record<string, boolean>>({});
    function toggleGroup(groupPath: string[]) {
      let key = groupPath.join('::');
      groupExpand[key] = key in groupExpand ? !groupExpand[key] : false;
    }

    function getRowKey(datum: Datum, i: number) {
      if (typeof props.rowKey == 'string') {
        return datum[props.rowKey];
      } else if (typeof props.rowKey == 'function') {
        return props.rowKey(datum);
      }
      return String(i);
    }

    // accumulate left and right sticky column positions
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
      let columns = props.columns as ColumnConfig[];
      let cells = columns.map((col, i) => {
        let label = '' ;
        if (col.label) {
          label = col.label;
        }
        let className = '';
        if (col.sticky) {
          className = 'j-table-sticky';
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
        return (
          <th key={ i }
            class={ className }
            style={ style }>{ label }</th>
        );
      });
      return (
        <thead>
          <tr>{ cells }</tr>
        </thead>
      );
    }

    function renderRow(
      opts: { leftStickyCount: number, rightStickyCount: number },
      datum: [ string, Datum | GroupDatum ],
    ) {
      let [ key, d ] = datum;
      if (d.groupName) {
        // render group row
        let colspan = props.columns.length;
        let rendererName = `${d.groupName}-renderer`;
        let content = d.groupValue;
        let indentMargin = (d.groupPath.length - 1) * props.groupIndent;
        let expanded = d.groupChildren && groupExpand[key] !== false;
        let renderer = slots[rendererName] as Function;
        if (renderer) {
          content = renderer(d);
        }
        content = (
          <div class="j-data-table-group-cell">
            <i class="j-data-table-group-margin" style={{ margin: indentMargin + 'px' }} />
            <SvgIcon name={ expanded ? 'chevron-down' : 'chevron-forward' } />
            { content }
          </div>
        );
        // In edge possibly chrome, full colspan make the td scroll with content event with sticky positioning
        // it's probably a bug
        // here we only put td with colspan equal to leftStickyCount
        if (opts.leftStickyCount) {
          content = (
            <tr class="j-data-table-group-row" key={ 'group::' + key } onClick={ toggleGroup.bind(null, d.groupPath) }>
              <td class="j-table-sticky" colspan={ opts.leftStickyCount }>
                { content }
              </td>
              <td colspan={ colspan - opts.leftStickyCount - opts.rightStickyCount }></td>
              {opts.rightStickyCount != 0 ? <td class="j-table-sticky" colspan={ opts.rightStickyCount }></td> : null}
            </tr>
          );
        } else {
          content = (
            <tr class="j-data-table-group-row" key={ 'group::' + key } onClick={ toggleGroup.bind(null, d.groupPath) }>
              <td class="j-table-sticky" colspan={ colspan }>
                { content }
              </td>
            </tr>
          );
        }
        return content;
      } else {
        // render normal data row
        return (
          <Row key={key}
            datum={d}
            stickyPos={stickyPos.value}
            columns={props.columns}
            rowConfig={props.rowConfig}
            selected={selected.has(key)}
            // @ts-ignore
            onSelect={selectRow.bind(null, key)} />
        );
      }
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
      let tar = (evt.currentTarget as HTMLElement);
      let sl = tar.scrollLeft;
      if (headerRef.value) {
        headerRef.value.scrollLeft = sl;
      }
    }

    function containerRenderer(items: any) {
      return (
        <table>
          <ColGroup columns={ props.columns } />
          <tbody>
            { items }
          </tbody>
        </table>
      );
    }

    return () => {
      let bodyStyle: Record<string, string | number> = {};
      if (typeof props.height == 'number') {
        bodyStyle.height = `${props.height}px`;
      }

      const columns = props.columns as ColumnConfig[];
      // last left sticky column
      let leftStickyPos = 0, rightStickyPos = 0, leftStickyCount = 0, rightStickyCount = 0;
      for (let i = 0; i < columns.length; i++) {
        if (!columns[i].sticky || columns[i].sticky != 'left') {
          break;
        }
        leftStickyPos += columns[i].width || 0;
        leftStickyCount++;
      }
      for (let i = columns.length - 1; i >= 0; i--) {
        if (!columns[i].sticky || columns[i].sticky != 'right') {
          break;
        }
        rightStickyPos += columns[i].width || 0;
        rightStickyCount++;
      }

      let hasLeftSticky = leftStickyCount > 0,
        hasRightSticky = rightStickyCount > 0;
      
      let coverContent;
      if (slots.cover) {
        coverContent = <div class="j-table-body-cover">{ slots.cover() }</div>;
      }

      let hasData = rowData.value && rowData.value.length;

      if (!props.fixedHeader) {
        let rows = props.data.map((datum, i) => {
          // let rowKey = getRowKey(datum as Datum, i);
          return renderRow({
            leftStickyCount: 0,
            rightStickyCount: 0,
          }, [String(i), datum]);
        });
  
        return (
          <div
            class="j-table"
            data-bordered={ props.bordered }
          >
            <table>
              { renderHead() }
              { rows }
            </table>
          </div>
        );
      }

      let leftStickyCol;
      if (hasLeftSticky && hasData) {
        leftStickyCol = (
          <div
            class="j-table-sticky-shadow j-left"
            style={{left: `${leftStickyPos}px`}}></div>
        );
      }

      let rightStickyCol;
      if (hasRightSticky && hasData) {
        rightStickyCol = (
          <div
            class="j-table-sticky-shadow j-right"
            style={{right: `${rightStickyPos}px`}}></div>
        );
      }

      return (
        <div class="j-table"
          data-fixed-header={ true }
          data-bordered={ props.bordered }
          data-has-left-sticky={ hasLeftSticky }
          data-has-right-sticky={ hasRightSticky }
        >
          <div
            class="j-table-head-part"
            ref={ headerRef }
          >
            <table>
              <ColGroup columns={ props.columns } />
              { renderHead() }
            </table>
          </div>
          <div class="j-table-body-part">
            <VirtualScroller
              style={ bodyStyle }
              onScroll={ onBodyScroll }
              virtual={ props.virtualScroll }
              itemHeight={ props.itemHeight }
              items={ rowData.value }
              containerRenderer = { containerRenderer }
              overlayScrollbar={ false }
              itemRenderer={ renderRow.bind(null, {
                leftStickyCount,
                rightStickyCount,
              }) }
            />
            { coverContent }
          </div>
          { leftStickyCol }
          { rightStickyCol }
        </div>
      );
    };
  },
});