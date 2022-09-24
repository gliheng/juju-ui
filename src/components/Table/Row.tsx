import { defineComponent, h, Fragment, PropType } from 'vue';
import SvgIcon from '@/SvgIcon/SvgIcon.vue';
import Checkbox from '@/Checkbox/Checkbox.vue';
import { Datum, ColumnConfig, RowConfig } from './types';

export default defineComponent({
  name: 'Row',
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
    datum: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    stickyPos: {
      type: Map as PropType<Map<number, number>>,
    },
    rowConfig: {
      type: Object,
      default: () => {},
    },
    indent: {
      type: Number,
      default: 0,
    },
    chevron: Boolean,
    chevronExpand: Boolean,
  },
  emits: ['select', 'toggle'],
  setup(props, { emit }) {
    function getCellKey(datum: Datum, col: ColumnConfig, i: number): string {
      if (typeof col.cellKey == 'string') {
        return datum[col.cellKey];
      } else if (typeof col.cellKey == 'function') {
        return col.cellKey(datum);
      } if (typeof col.field == 'string') {
        return col.field;
      }
      return String(i);
    }

    function getCellDisplay(datum: Datum, col: ColumnConfig, firstContentCell = false) {
      if (col.type == 'selection') {
        return (
          <Checkbox
            modelValue={props.selected}
            onUpdate:modelValue={() => emit('select')}
          />
        );
      } else if (col.type == 'index') {
        return String(props.index + 1);
      }
      // render nothing for empty column
      let s: any;
      if (col.field) {
        let parts = col.field.split('.');
        s = parts.reduce((d, key) => d[key], datum);
      }
      s = s ?? col.default;
      if (col.render) {
        if (col.field) {
          s = col.render(s, datum);
        } else {
          s = col.render(datum);
        }
      }

      let indentSpacer;
      let chevronArrow;
      // Ensure indent is not added checkbox column
      if (firstContentCell) {
        const { indent, chevron, chevronExpand } = props;
        if (indent) {
          indentSpacer = <i class="j-data-table-indent" style={{ width: indent + 'px' }} />;
        }
        if (chevron) {
          chevronArrow = (
            <SvgIcon name={ chevronExpand ? 'chevron-down' : 'chevron-forward' }
              onClick={(evt: MouseEvent) => {
                evt.stopPropagation();
                emit('toggle');
              }}
            />
          );
        }
      }
      return (
        <>
          {indentSpacer}
          {chevronArrow}
          {s}
        </>
      );
    }

    return () => {
      const { rowConfig, datum, stickyPos, chevron, chevronExpand, indent } = props;
      const columns = props.columns as ColumnConfig[];
      let rowClass = '';
      if ((rowConfig as RowConfig).class) {
        if (typeof rowConfig.class == 'function') {
          rowClass = rowConfig.class(datum);
        } else {
          rowClass = rowConfig.class;
        }
      }

      let waitContent = true;
      let cells = columns.map((col, i) => {
        let style: Record<string, string> = {};
        let { type, align, class: klass, sticky } = col;
        if (type == 'selection') {
          align = 'center';
        }
        if (align) {
          style['text-align'] = align;
        }
        let cellClass = '';
        if (typeof klass == 'function') {
          cellClass = klass(datum);
        } else if (klass) {
          cellClass = klass;
        }
        if (sticky && stickyPos) {
          cellClass += ' j-table-sticky';
          let pos = stickyPos.get(i);
          if (pos !== undefined) {
            if (sticky == 'left') {
              style.left = `${pos}px`;
            }
            if (sticky == 'right') {
              style.right = `${pos}px`;
            }
          }
        }
        let firstContentCell = !col.type && waitContent;
        if (firstContentCell) {
          waitContent = false;
        }
        return (
          <td
            class={ cellClass }
            key={ getCellKey(datum, col, i) }
            style={ style }
          >
            { getCellDisplay(datum, col, firstContentCell) }
          </td>
        );
      });
      return (
        <tr
          class={ rowClass }
          data-selected={ props.selected }
        >{ cells }</tr>
      );  
    };
  }
});