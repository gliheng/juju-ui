import { defineComponent, PropType, h } from 'vue';
import { Library } from './types';
import { RenderBox } from './layout';

export default defineComponent({
  name: 'Pane',
  inheritAttrs: false,
  props: {
    id: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    box: {
      type: Object as PropType<RenderBox>,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    context: {
      type: Object as PropType<{
        library: Library;
        onAction: (action: string, box: RenderBox, args?: any) => void;
        placeholder: any;
        showActionMenu: boolean;
        closable: boolean;
        gap: number;
      }>,
      required: true,
    },
    showActionMenu: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      let { x, y, width, height, expanded } = props;
      let content;
      if (slots.default) {
        content = slots.default();
      }

      let style: Record<string, any> = {
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`,
      };

      return (
        <div
          class="j-flex-layout-pane"
          data-expanded={expanded}
          data-id={props.id}
          style={style}
        >
          {content}
        </div>
      );
    };
  },
});