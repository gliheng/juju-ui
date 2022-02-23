import {
  defineComponent,
  reactive,
  ref,
  computed,
  h,
  PropType,
  onMounted,
  watch,
  nextTick,
  onUpdated,
} from 'vue';
import VirtualScroller from '@/Scroller/VirtualScroller';
import SvgIcon from '@/SvgIcon/SvgIcon.vue';
import Checkbox from '@/Checkbox/Checkbox.vue';
import Divider from '@/Divider/Divider';
import { getStorage } from '@utils/storage';
import Row from './Row';
import ColGroup from './ColGroup';
import { ColumnConfig, Datum, GroupDatum } from './types';
import './Table.scss';

const MIN_COL_WIDTH = 30;
const COL_SIZE_STORAGE_KEY = 'colResize';

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
    resizable: {
      type: Boolean,
      default: false,
    },
    storageKey: {
      type: String,
      required: false,
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
          arr.push(getRowKey(data[i], i));
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
      let maxLevel = 0;
      let cols: ColumnConfig[] = [];
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
        leftStickyPos += colSizes.value[i] || 0;
        leftStickyCount++;
      }
      for (let i = columns.length - 1; i >= 0; i--) {
        if (!columns[i].sticky || columns[i].sticky != 'right') {
          break;
        }
        stickyPosMap.set(i, rightStickyPos);
        rightStickyPos += colSizes.value[i] || 0;
        rightStickyCount++;
      }

      return {
        leftStickyCount,
        rightStickyCount,
        stickyPosMap,
      };
    });

    let tableEl = ref<HTMLElement>();
    let leftStickyEl = ref<HTMLElement>();
    let rightStickyEl = ref<HTMLElement>();

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

    const colResize = reactive<number[]>([]);
    const colSizes = computed(() => {
      return columnsInfo.value.cols.map((col, i) => {
        if (col.width !== undefined) {
          return col.width + (colResize[i] || 0)
        }
      });
    });
    let store: ReturnType<typeof getStorage>;
    // load col settings on load
    if (props.storageKey) {
      store = getStorage(props.storageKey!);
      onMounted(async () => {
        let sizes = await store.read(COL_SIZE_STORAGE_KEY);
        if (sizes && Array.isArray(sizes)) {
          colResize.splice(0, colResize.length - 1, ...sizes);
        }
      });
    }
  
    function resizeCol(i: number, d: number) {
      if (d == 0) return;
      // ensure colResize exists
      if (colResize[i] === undefined) {
        colResize[i] = 0;
      }
      // if (colResize[i+1] === undefined) {
      //   colResize[i+1] = 0;
      // }
      if (d < 0) {
        // move left
        // ensure left col does not compress beyond MIN_COL_WIDTH
        let { width } = columnsInfo.value.cols[i];
        if (width !== undefined) {
          let limit = Math.max(width + colResize[i] - MIN_COL_WIDTH, 0);
          if (d < -limit) {
            d = -limit;
          }
        }
      } else if (d > 0) {
        // move right
        // ensure right col does not compress beyond MIN_COL_WIDTH
        // let { width } = columnsInfo.value.cols[i+1];
        // if (width !== undefined) {
        //   let limit = Math.max(width + colResize[i+1] - MIN_COL_WIDTH, 0);
        //   if (d > limit) {
        //     d = limit;
        //   }
        // }
      }
      colResize[i] = colResize[i] + d;
      // colResize[i+1] = colResize[i+1] - d;
    }
    
    onUpdated(() => {
      syncStickyShadowPos();
    });

    function saveColSize() {
      if (store) {
        store.save(COL_SIZE_STORAGE_KEY, colResize);
      }
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
      let { stickyPosMap } = stickyInfo.value;
      if (sticky) {
        let d = stickyPosMap.get(i + colspan - 1);
        if (typeof d == 'number') {
          if (sticky == 'left') {
            style.left = `${d}px`;
          } else if (sticky == 'right') {
            style.right = `${d}px`;
          }
        }
      }

      let addons = [];
      if (props.resizable) {
        addons.push(
          <Divider
            vertical={true}
            onDragMove={(d) => {
              resizeCol(i, d);
            }}
            onDragEnd={() => {
              saveColSize();
            }}
          />
        );
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
          { addons }
        </th>
      );
    }

    // Sync sticky column shadow position using dom operations
    function syncStickyShadowPos() {
      let n, cell, el;
      // sync left shadow position
      n = stickyInfo.value.leftStickyCount;
      el = leftStickyEl.value;
      if (n && el) {
        cell = tableEl.value?.querySelector(`thead th:nth-child(${n})`) as HTMLElement;
        if (cell) {
          let box = cell.getBoundingClientRect();
          let v = box.width + box.left - (cell.offsetParent?.getBoundingClientRect().left || 0);
          el.style.left = `${v}px`;
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      }
      // sync right shadow position
      n = stickyInfo.value.rightStickyCount;
      el = rightStickyEl.value;
      if (n && el) {
        cell = tableEl.value?.querySelector(`thead th:nth-last-child(${stickyInfo.value.rightStickyCount})`) as HTMLElement;
        if (cell) {
          let a = cell.offsetParent?.getBoundingClientRect().left || 0;
          let b = cell.getBoundingClientRect().left;
          let v = b - a;
          el.style.left = `${v}px`;
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      }
    }

    function renderHead() {
      let columnRow: ColumnConfig[] = props.columns;
      let next: ColumnConfig[];
      let rows = [];
      let { maxLevel } = columnsInfo.value;
      let level = 0;
      // may render multiple row of headers
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
            onSelect={selectRow.bind(null, key, i)}
          />
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
          <ColGroup columns={ colSizes.value } />
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
            ref={ tableEl }
            class="j-table"
            data-bordered={ props.bordered }
          >
            <table>
              <ColGroup columns={ colSizes.value } />
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
          <div ref={leftStickyEl} class="j-table-sticky-shadow j-left" />
        );
      }

      let rightStickyCol;
      if (hasRightSticky && hasData) {
        rightStickyCol = (
          <div ref={rightStickyEl} class="j-table-sticky-shadow j-right" />
        );
      }
      return (
        <div class="j-table"
          ref={ tableEl }
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
              <ColGroup columns={ colSizes.value } />
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

// recursive group data according to grouping rules
function groupData(
  grouping: string[],
  data: Datum[],
  cur: number = 0,
  groupPath: string[] = [],
): Array<Datum | GroupDatum> {
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
