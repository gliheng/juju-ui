import {
  defineComponent,
  reactive,
  ref,
  computed,
  h,
  PropType,
} from 'vue';
import Row from './Row';
import ColGroup from './ColGroup';
import { ColumnConfig, Datum, GroupDatum } from './types';
import VirtualScroller from '../Scroller/VirtualScroller';
import SvgIcon from '../SvgIcon/SvgIcon.vue';
import Checkbox from '../Checkbox/Checkbox.vue';
import './Table.scss';


// recursive group data according to grouping rules
function groupData(grouping: string[], data: Datum[], cur: number = 0, groupPath: string[] = []): Array<Datum | GroupDatum> {
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
    data: Array as PropType<Datum[]>,
    columns: {
      type: Array as PropType<ColumnConfig[]>,
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
    multiSelect: {
      type: Boolean,
      default: true,
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
    let selection = reactive<{
      sel: Set<string>,
      headerCheckbox: boolean | null,
    }>({
      sel: new Set(),
      headerCheckbox: false,
    });
    function toggleSelection(v: boolean | null) {
      if (v === true) {
        let arr = []
        let data = props.data || [];
        for (let i = 0; i < data.length; i++) {
          arr.push(getRowKey(data, i));
        }
        selection.sel = new Set(arr)
      } else if (v === false) {
        selection.sel = new Set();
      }
      selection.headerCheckbox = v;
    }
    
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
        // flatten grouped data for row rendering
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

    // Expand column grouping
    let columnsInfo = computed(() => {
      let spanMap: Map<ColumnConfig, {start: number; span: number, sticky?: string, align?: string}> = new Map();
      let cols: ColumnConfig[] = [];
      let maxLevel = 0;
      // column can inherit sticky and align from parent
      function flatten(grouped: ColumnConfig[], level: number, colStart: number, sticky?: string, align?: string) {
        let n = 0;
        for (let col of grouped) {
          if ((import.meta as any).DEV) {
            if (col.sticky && sticky && col.sticky != sticky) {
              console.error('Sticky should be consitent for a single col group');
            }
          }
          
          let _align = col.align || align;
          let _sticky = col.sticky || sticky;

          if (col.children) {
            let colCount = flatten(col.children, level + 1, n + colStart, _sticky, _align);
            spanMap.set(col, {
              start: n + colStart,
              span: colCount,
              sticky: _sticky,
              align: _align,
            });
            n += colCount;
          } else {
            // children columns should inherit parent's sticky setting
            spanMap.set(col, {
              start: n + colStart,
              span: 1,
              sticky: _sticky,
              align: _align,
            });

            cols.push({
              ...col,
              align: _align,
              sticky: _sticky,
            });
            n++;
          }
        }
        maxLevel = Math.max(level, maxLevel);
        return n;
      }
      let { columns } = props;
      flatten(columns, 1, 0);
      return {
        cols,
        maxLevel,
        spanMap,
      };
    });

    let stickyInfo = computed(() => {
      const columns = columnsInfo.value.cols;
      // last left sticky column
      let leftStickyPos = 0, rightStickyPos = 0, leftStickyCount = 0, rightStickyCount = 0;
      let stickyPosMap: Map<number, number> = new Map();
      for (let i = 0; i < columns.length; i++) {
        if (!columns[i].sticky || columns[i].sticky != 'left') {
          break;
        }
        stickyPosMap.set(i, leftStickyPos);
        leftStickyPos += columns[i].width || 0;
        leftStickyCount++;
      }
      for (let i = columns.length - 1; i >= 0; i--) {
        if (!columns[i].sticky || columns[i].sticky != 'right') {
          break;
        }
        stickyPosMap.set(i, rightStickyPos);
        rightStickyPos += columns[i].width || 0;
        rightStickyCount++;
      }

      return {
        leftStickyCount,
        leftStickyPos,
        stickyPosMap,
        rightStickyCount,
        rightStickyPos,
      };
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

    function renderHeaderCell(
      col: ColumnConfig,
      i: number,
      colspan: number,
      rowspan: number,
      sticky?: string,
      align?: string,
    ) {
      let label: any;
      if (col.type == 'selection') {
        label = (
          <Checkbox
            modelValue={selection.headerCheckbox}
            onUpdate:modelValue={toggleSelection}
          />
        );
        if (!align) {
          align = 'center';
        }
      } else if (col.type == 'index') {
        label = '#';
        if (!align) {
          align = 'center';
        }
      } else if (col.label) {
        label = col.label;
      }
      let className = '';
      if (sticky) {
        className = 'j-table-sticky';
      }
      let style: Record<string, any> = {};
      if (align) {
        style['text-align'] = align;
      }
      columnsInfo.value.spanMap.get(col);
      if (sticky) {
        let d = stickyInfo.value.stickyPosMap.get(i + colspan - 1);
        if (typeof d == 'number') {
          if (sticky == 'left') {
            style.left = `${d}px`;
          } else if (sticky == 'right') {
            style.right = `${d}px`;
          }
        }
      }
      return (
        <th key={ i }
          class={ className }
          colspan={ colspan }
          rowspan={ rowspan }
          style={ style }
          data-type={ col.type }
        >
          { label }
        </th>
      );
    }

    function renderHead() {
      let columnRow: ColumnConfig[] = props.columns;
      let next: ColumnConfig[];
      let rows = [];
      let { maxLevel } = columnsInfo.value;
      let level = 0;
      while (columnRow.length) {
        next = [];
        let cells = columnRow.map((col, i) => {
          if (col.children) {
            next.push(...col.children);
          }
          let span = columnsInfo.value.spanMap.get(col);
          return renderHeaderCell(
            col,
            span?.start || i,
            span?.span || 1,
            col.children ? 1 : maxLevel - level,
            span?.sticky,
            span?.align,
          );
        });
        rows.push(<tr>{cells}</tr>);
        columnRow = next;
        level++;
      }
      return (
        <thead>
          { rows }
        </thead>
      );
    }

    function renderRow(
      opts: {
        leftStickyCount: number,
        rightStickyCount: number,
      },
      datum: [ string, Datum | GroupDatum ],
      i: number,
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
          <Row
            key={key}
            index={i}
            datum={d}
            stickyPos={stickyInfo.value.stickyPosMap}
            columns={columnsInfo.value.cols}
            rowConfig={props.rowConfig}
            selected={selection.sel.has(key)}
            // @ts-ignore
            onSelect={selectRow.bind(null, key, i)} />
        );
      }
    }

    function selectRow(key: string, i: number) {
      if (props.multiSelect) {
        if (selection.sel.has(key)) {
          selection.sel.delete(key);
        } else {
          selection.sel.add(key);
        }
      } else {
        selection.sel.clear();
        selection.sel.add(key);
      }
      if (selection.sel.size === 0) {
        selection.headerCheckbox = false;
      } else if (selection.sel.size === props.data?.length) {
        selection.headerCheckbox = false;
      } else {
        selection.headerCheckbox = null;
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
          <ColGroup columns={ columnsInfo.value.cols } />
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

      let {
        leftStickyCount,
        rightStickyCount,
        leftStickyPos,
        rightStickyPos,
      } = stickyInfo.value;

      let hasLeftSticky = leftStickyCount > 0,
        hasRightSticky = rightStickyCount > 0;
      
      let coverContent;
      if (slots.cover) {
        coverContent = <div class="j-table-body-cover">{ slots.cover() }</div>;
      }

      let hasData = rowData.value && rowData.value.length;

      if (!props.fixedHeader) {
        let rows = (props.data || []).map((datum, i) => {
          // let rowKey = getRowKey(datum as Datum, i);
          return renderRow(
            {
              leftStickyCount: 0,
              rightStickyCount: 0,
            },
            [String(i), datum],
            i,
          );
        });
  
        return (
          <div
            class="j-table"
            data-bordered={ props.bordered }
          >
            <table>
              <ColGroup columns={ columnsInfo.value.cols } />
              { renderHead() }
              <tbody>
                { rows }
              </tbody>
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
          data-fixed-header={ props.fixedHeader }
          data-bordered={ props.bordered }
          data-has-left-sticky={ hasLeftSticky }
          data-has-right-sticky={ hasRightSticky }
          data-virtual-scroll={ props.virtualScroll }
        >
          <div
            class="j-table-head-part"
            ref={ headerRef }
          >
            <table>
              <ColGroup columns={ columnsInfo.value.cols } />
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