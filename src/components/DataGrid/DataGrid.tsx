import { h, defineComponent, PropType, StyleValue, computed } from 'vue';
import Scroller from '@/Scroller/VirtualScroller';
import RulerGroup from './RulerGroup';
import { excelCol, excelCoord } from './utils';
import './DataGrid.scss';

const C = defineComponent({
  name: 'DataGrid',
  props: {
    data: Array as PropType<any[][]>,
    config: Object as PropType<{
      sizes: Record<string, number>;
      align: Record<string, 'left' | 'center' | 'right'>;
      merges: Record<string, {hspan: number; vspan: number}>;
      class: Record<string, string>;
      style: Record<string, StyleValue>;
    }>,
    cellWidth: {
      type: Number,
      default: 120,
    },
    cellHeight: {
      type: Number,
      default: 40,
    },
  },
  emits: [],
  setup(props, { expose, slots, emit }) {
    const gridInfo = computed(() => {
      let { data, config, cellWidth, cellHeight } = props;
      let sizes = config?.sizes;
      let bi = 0, ei = data?.length || 0;
      let bj = 0, ej = data?.[0]?.length || 0;

      // calc layout sizes for grid layout
      const rows = [];
      for (let i = bi; i < ei; i++) {
        let row = i + 1;
        let d = sizes?.[row];
        if (d === undefined) {
          d = cellHeight;
        }
        rows.push(d);
      }
      const cols = [];
      for (let j = bj; j < ej; j++) {
        let col = excelCol(j);
        let d = sizes?.[col];
        if (d === undefined) {
          d = cellWidth;
        }
        cols.push(d);
      }


      return {
        rows, cols,
        bi, ei, bj, ej,
      };
    });

    function renderFrame() {
      let cells = [];
      let { data, config } = props;
      let { merges, align, class: klass, style} = config || {};
      let { bi, ei, bj, ej } = gridInfo.value;
      for (let i = bi; i < ei; i++) {
        for (let j = bj; j < ej; j++) {
          // render a single cell
          let col = excelCol(j);
          let row = i + 1;
          let coord = `${col}${row}`;
          let _klass = klass?.[coord] || klass?.[row] || klass?.[col];
          let _inlineStyle = style?.[coord] || style?.[row] || style?.[col];
          let _align = align?.[coord] || align?.[row] || align?.[col];
          let span = merges?.[coord] || merges?.[row] || merges?.[col];
          let hspan = span?.hspan ?? 1;
          let vspan = span?.vspan ?? 1;

          let content = data?.[i]?.[j];
          // Render alternate content using default slot
          if (slots.default) {
            content = slots.default({
              i, j, content,
            });
          }
          // merge styles
          let _style: StyleValue = {
            ['grid-row']: vspan != 1 ? `${i+1}/span ${vspan}` : i+1,
            ['grid-column']: hspan != 1 ? `${j+1}/span ${hspan}` : j+1,
          };
          Object.assign(_style, _inlineStyle);
          if (vspan != 1 || hspan != 1) {
            _style['z-index'] = 1;
          }
          cells.push(
            <div
              key={`${i}.${j}`}
              class={['j-data-grid-cell', _klass]}
              style={_style}
              data-row={i}
              data-col={j}
              data-align={_align}
            >
              { content }
            </div>
          );
        }
      }

      let { rows, cols } = gridInfo.value;
      return (
        <div class="j-data-grid-frame" style={{
          ['grid-template-rows']: rows.map(e => `${e}px`).join(' '),
          ['grid-template-columns']: cols.map(e => `${e}px`).join(' '),
        }}>
          { cells }
        </div>
      );
    }

    return () => {
      // <Scroller
      //   onScroll={ onBodyScroll }
      //   virtual={ true }
      //   itemHeight={ props.itemHeight }
      //   items={ rowData.value }
      //   containerRenderer = { containerRenderer }
      //   overlayScrollbar={ false }
      //   itemRenderer={ renderRow.bind(null, {
      //     leftStickyCount,
      //     rightStickyCount,
      //   }) }
      // ></Scroller>
      return (
        <div class="j-data-grid">
          <RulerGroup gridInfo={ gridInfo.value }>
            { renderFrame }
          </RulerGroup>
        </div>
      );
    };
  }
});

C.excelCol = excelCol;
C.excelCoord = excelCoord;

export default C;