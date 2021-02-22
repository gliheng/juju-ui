import { defineComponent, reactive, ref, computed, h } from 'vue';
import Row from './_Row';
import ColGroup from './_ColGroup';
import { ColumnConfig, Datum, GroupDatum } from './_types';
import Scroller from '../Scroller.vue';
import SvgIcon from '../SvgIcon.vue';
import '../../assets/styles/Table.scss';

// recursive group data according to grouping rules
function groupData(grouping: string[], data: any[], cur: number = 0, groupPath: string[] = []): any[] {
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
  },
  setup(props, { slots }) {
    let selected = reactive(new Set());
    
    // grouped data
    let groupedData = computed(() => {
      let { grouping, data } = props;
      if (grouping && data) {
        return groupData(grouping as string[], data);
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
      data: Array<Datum | GroupDatum>,
      collect: any[],
      opts: { leftStickyCount: number, rightStickyCount: number },
    ) {
      data.forEach((d, i) => {
        if (d.groupName) {
          // render group row
          let groupKey = `${d.groupPath.join('::')}`;
          let colspan = props.columns.length;
          let rendererName = `${d.groupName}-renderer`;
          let content = d.groupValue;
          let indentMargin = (d.groupPath.length - 1) * props.groupIndent;
          let expanded = d.groupChildren && groupExpand[groupKey] !== false;
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
              <tr class="j-data-table-group-row" key={ 'group::' + groupKey } onClick={ toggleGroup.bind(null, d.groupPath) }>
                <td class="j-table-sticky" colspan={ opts.leftStickyCount }>
                  { content }
                </td>
                <td colspan={ colspan - opts.leftStickyCount - opts.rightStickyCount }></td>
                {opts.rightStickyCount != 0 ? <td class="j-table-sticky" colspan={ opts.rightStickyCount }></td> : null}
              </tr>
            );
          } else {
            content = (
              <tr class="j-data-table-group-row" key={ 'group::' + groupKey } onClick={ toggleGroup.bind(null, d.groupPath) }>
                <td class="j-table-sticky" colspan={ colspan }>
                  { content }
                </td>
              </tr>
            );
          }
          collect.push(content);
          if (expanded) {
            renderRow(d.groupChildren, collect, opts);
          }
        } else {
          // render normal data row
          let rowKey = getRowKey(d, i);
          collect.push(
            <Row key={rowKey}
              datum={d}
              stickyPos={stickyPos.value}
              columns={props.columns}
              rowConfig={props.rowConfig}
              selected={selected.has(rowKey)}
              // @ts-ignore
              onSelect={selectRow.bind(null, rowKey)} />
          );
        }
      });
    }

    function renderBody(
      data: Array<Datum | GroupDatum>,
      opts: { leftStickyCount: number, rightStickyCount: number },
    ) {
      let rows: any[] = [];
      renderRow(data, rows, opts);
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
      let tar = (evt.currentTarget as HTMLElement);
      let sl = tar.scrollLeft;
      if (headerRef.value) {
        headerRef.value.scrollLeft = sl;
      }
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

      let hasData = groupedData.value && groupedData.value.length;

      return (
        <div class="j-table"
          data-fixed-header={ true }
          data-bordered={ props.bordered }
          data-has-left-sticky={ hasLeftSticky }
          data-has-right-sticky={ hasRightSticky }>
          <div class="j-table-head-part" ref={ headerRef }>
            <table>
              <ColGroup columns={ props.columns } />
              { renderHead() }
            </table>
          </div>
          <div class="j-table-body-part">
            <Scroller style={ bodyStyle } onScroll={ onBodyScroll }>
              {() => {
                return (
                  <table>
                    <ColGroup columns={ props.columns } />
                    { groupedData.value && renderBody(groupedData.value as Datum[], {
                      leftStickyCount, rightStickyCount,
                    }) }
                  </table>
                );
              }}
            </Scroller>
            { coverContent }
          </div>
          { hasLeftSticky && hasData && <div class="j-table-sticky-shadow j-left" style={{left: `${leftStickyPos}px`}}></div> }
          { hasRightSticky && hasData && <div class="j-table-sticky-shadow j-right" style={{right: `${rightStickyPos}px`}}></div> }
        </div>
      );
    };
  },
});