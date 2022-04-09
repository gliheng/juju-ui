import {
  defineComponent,
  reactive,
  ref,
  unref,
  computed,
  h,
  PropType,
  onMounted,
  onUpdated,
  onUnmounted,
} from 'vue';
import VirtualScroller from '@/Scroller/VirtualScroller';
import SvgIcon from '@/SvgIcon/SvgIcon.vue';
import Checkbox from '@/Checkbox/Checkbox.vue';
import Divider from '@/Divider/Divider';
import { getStorage } from '@utils/storage';
import { debounce } from '@utils/timer';
import { getField } from '@utils/object';
import Row from './Row';
import ColGroup from './ColGroup';
import Sorter from './Sorter';
import { ColumnConfig, Datum, GroupDatum, SortDef, GroupKey } from './types';
import './Table.scss';

const MIN_COL_WIDTH = 30;
const COL_SIZE_STORAGE_KEY = 'col-sizes';

export default defineComponent({
  name: 'Table',
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
    grouping: Array as PropType<GroupKey[]>,
    // virtualScroll and itemHeight are used for virtual scroll of content
    virtualScroll: {
      type: Boolean,
      default: false,
    },
    resizable: {
      type: Boolean,
      default: false,
    },
    sortable: {
      type: Boolean,
      default: false,
    },
    multiSort: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: Object as PropType<SortDef>,
    },
    storageKey: {
      type: String,
      required: false,
    },
    itemHeight: Number,
  },
  emits: ['update:sort'],
  setup(props, { slots, emit }) {
    let selection = ref<Set<string>>(new Set());
    let headerCheckbox = computed(() => {
      if (selection.value.size === 0) {
        return false;
      } else if (selection.value.size === props.data?.length) {
        return true;
      }
      return undefined;
    });
    function toggleSelection(v?: boolean) {
      if (v === true) {
        let arr = []
        let data = props.data || [];
        for (let i = 0; i < data.length; i++) {
          arr.push(getRowKey(data[i], i));
        }
        selection.value = new Set(arr)
      } else if (v === false) {
        selection.value = new Set();
      }
    }

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
      
      let colMap: Record<string, ColumnConfig> = {};
      for (let col of cols) {
        let key = keyMapper(col);
        if (key) {
          colMap[key] = col;
        }
      }

      return {
        cols,
        colMap,
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
    
    // grouped data
    let groupedData = computed(() => {
      let { grouping, data, sort } = props;
      let { colMap } = columnsInfo.value;
      let data2 = sorted(data as Array<Datum>, colMap, sort);
      if (grouping && data2) {
        return groupData(grouping, data2);
      }
      return data2;
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

    const colResize = ref<Record<string, number>>({});
    const colSizes = computed(() => {
      return columnsInfo.value.cols.map((col, i) => {
        let key = keyMapper(col);
        if (key) {
          let v = colResize.value[key];
          if (typeof v == 'number') return v;
        }
        return col.width;
      });
    });
    let ob: ResizeObserver;
    let store: ReturnType<typeof getStorage>;
    // load col settings on load
    if (props.storageKey) {
      store = getStorage(props.storageKey!);
    }
    onMounted(async () => {
      if (store) {
        let sizes = (await store.read(COL_SIZE_STORAGE_KEY)) || {};
        colResize.value = sizes;
      }

      if (typeof ResizeObserver == 'function' && tableEl.value) {
        ob = new ResizeObserver(() => {
          syncStickyShadowPos();
        });
        ob.observe(tableEl.value);
      }
    });

    onUnmounted(() => {
      ob?.disconnect();
    });
  
    function resizeCol(i: number, d: number) {
      if (d == 0) return;
      let col = columnsInfo.value.cols[i];
      let key = keyMapper(col);
      if (!key) return;
      // ensure colResize exists
      if (colResize.value[key] === undefined) {
        colResize.value[key] = col.width || MIN_COL_WIDTH;
      }
      if (d < 0) {
        let limit = Math.max(colResize.value[key] - MIN_COL_WIDTH, 0);
        if (d < -limit) {
          d = -limit;
        }
      }
      colResize.value[key] = colResize.value[key] + d;
    }
    
    onUpdated(() => {
      syncStickyShadowPos();
    });

    function saveColSize() {
      if (store) {
        store.save(COL_SIZE_STORAGE_KEY, unref(colResize));
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
            modelValue={headerCheckbox.value}
            indeterminate={headerCheckbox.value === undefined}
            onUpdate:modelValue={toggleSelection}
            onUpdate:indeterminate={() => toggleSelection(!headerCheckbox.value)}
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
      let resizable = col.resizable || props.resizable || false;
      if (col.resizable === false) {
        // In this case, resizable is set on table, but turned off on a single col
        resizable = false;
      }
      // For sort to work, sortable has to be set on the table
      // Column need a sorter and key
      let key = keyMapper(col);
      if (props.sortable && col.sorter && key) {
        let value = computed<boolean | undefined>({
          get() {
            let st = props.sort?.find(e => e.key == key);
            return st?.asc;
          },
          set(v) {
            let sort = props.sort ? [...props.sort] : [];
            let i = sort.findIndex(e => e.key == key);
            if (v === undefined) {
              i != -1 && sort.splice(i, 1);
            } else {
              let st = { key: key as string, asc: v };
              if (i == -1) {
                // add sort state
                if (!props.multiSort) {
                  sort.length = 0;
                }
                sort.push(st);
              } else {
                // change sort
                sort[i] = st;
              }
            }
            emit('update:sort', sort);
          },
        });
        addons.push(
          <Sorter v-model={ value.value } />
        );
      }
      if (resizable) {
        // For multi row header, only the last row have resizing control
        let enabled = colspan == 1;
        addons.push(
          <Divider
            enabled={enabled}
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
          <div class='j-table-cell'>
            <div class='j-table-cell-inner'>
              { label }
            </div>
            <div class="j-table-cell-addons">
              { addons }
            </div>
          </div>
        </th>
      );
    }

    // Sync sticky column shadow position using dom operations
    const syncStickyShadowPos = debounce(() => {
      let n, cell, el;
      // sync left shadow position
      n = stickyInfo.value.leftStickyCount;
      el = leftStickyEl.value;
      if (n && el) {
        cell = tableEl.value?.querySelector(`thead tr:last-child th:nth-child(${n})`) as HTMLElement;
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
        cell = tableEl.value?.querySelector(`thead tr:last-child th:nth-last-child(${stickyInfo.value.rightStickyCount})`) as HTMLElement;
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
    }, 50);

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

    function renderGroupHeader(
      opts: {
        leftStickyCount: number,
        rightStickyCount: number,
      },
      key: string,
      d: Datum,
    ) {
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
    }

    function renderRow(
      opts: {
        leftStickyCount: number,
        rightStickyCount: number,
      },
      i: number,
    ): JSX.Element {
      let [ key, d ] = rowData.value[i];
      if (d.groupName) {
        return renderGroupHeader(opts, key, d);
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
            selected={selection.value.has(key)}
            // @ts-ignore
            onSelect={selectRow.bind(null, key, i)}
          />
        );
      }
    }

    function selectRow(key: string, i: number) {
      if (props.multiSelect) {
        if (selection.value.has(key)) {
          selection.value.delete(key);
        } else {
          selection.value.add(key);
        }
      } else {
        selection.value.clear();
        selection.value.add(key);
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
        bodyStyle['--j-scroller-height'] = `${props.height}px`;
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
        let rows = [];
        for (let i = 0, len = rowData.value.length; i < len; i++) {
          rows.push(renderRow({
            leftStickyCount: 0,
            rightStickyCount: 0,
          }, i));
        }
  
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
              itemCount={ rowData.value.length }
              itemHeight={ props.itemHeight }
              containerRenderer = { containerRenderer }
              overlayScrollbar={ false }
              itemRenderer={
                renderRow.bind(null, {
                  leftStickyCount,
                  rightStickyCount,
                })
              }
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
  grouping: GroupKey[],
  data: Datum[],
  cur: number = 0,
  groupPath: string[] = [],
): Array<Datum | GroupDatum> {
  if (cur >= grouping.length) {
    // return data rows on the final level
    return data;
  }
  let groups: Record<string, any> = {};
  let groupKey = grouping[cur];
  data.forEach(d => {
    let key = typeof groupKey == 'function' ? groupKey(d) : d[groupKey];
    if (!(key in groups)) {
      groups[key] = [];
    }
    groups[key].push(d);
  });
  return Object.keys(groups).map(key => {
    const newGroupPath = groupPath.concat(key);
    return {
      groupName: typeof groupKey == 'function' ? `group-${cur}` : groupKey,
      groupValue: key,
      groupPath: newGroupPath,
      groupChildren: groupData(grouping, groups[key], cur + 1, newGroupPath),
    };
  });
}

function keyMapper(col: ColumnConfig) {
  return col.key || col.field;
}

function sorted(
  rows: Array<Datum>,
  colMap: Record<string, ColumnConfig>,
  sort?: SortDef
): Array<Datum> {
  if (!sort || sort.length == 0) return rows;
  let newRows = [...rows];
  
  // Sort by multiple columns
  newRows.sort((a, b) => {
    for (let st of sort) {
      let col = colMap[st.key];
      let v = col.sorter!(getField(a, st.key), getField(b, st.key));
      if (v != 0) return v * (st.asc ? 1 : -1);
    }
    return 0;
  });
  return newRows;
}
