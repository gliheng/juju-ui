import { h, defineComponent, PropType, StyleValue } from 'vue';
import SvgIcon from '@/SvgIcon/SvgIcon.vue';
import Button from '@/Button/Button.vue';
import { excelCol } from './utils';

const Ruler = defineComponent({
  name: 'Ruler',
  props: {
    type: {
      type: String as PropType<'col' | 'row'>,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    begin: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { type, sizes, begin, end } = props;
      const style: StyleValue = {};
      if (type == 'col') {
        style['grid-template-columns'] = sizes.map(e => `${e}px`).join(' ');
      } else if (type == 'row') {
        style['grid-template-rows'] = sizes.map(e => `${e}px`).join(' ');
      }

      let cells = [];
      for (let i = begin; i < end; i++) {
        let d: any = i + 1;
        if (type == 'col') {
          d = excelCol(i);
        }
        cells.push(<div class="j-data-grid-ruler-cell">{d}</div>);
      }
      return (
        <div
          class="j-data-grid-ruler"
          data-type={props.type}
          style={style}
        >
          {cells}
        </div>
      );
    };
  }
});

export default defineComponent({
  name: 'RulerGroup',
  props: {
    gridInfo: {
      type: Object as PropType<{
        rows: number[];
        cols: number[];
        bi: number;
        ei: number;
        bj: number;
        ej: number;
      }>,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      let { rows, cols, bi, ei, bj, ej } = props.gridInfo;
      return (
        <div class="j-data-grid-ruler-group">
          <Button class="j-data-grid-settings" icon="settings" />
          <Ruler type="col" sizes={cols} begin={bj} end={ej} />
          <Ruler type="row" sizes={rows} begin={bi} end={ei} />
          { slots.default?.() }
        </div>
      );
    };
  }
});
