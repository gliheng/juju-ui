import { defineComponent, h } from 'vue';
import { MIME } from './TileLayout';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    w: {
      type: Number,
      default: 1,
    },
    h: {
      type: Number,
      default: 1,
    },
    closable: Boolean,
  },
  // These are native events, they're here to make ts happy
  setup(props, { slots }) {
    function onDragstart(evt: DragEvent) {
      let { dataTransfer } = evt;
      if (dataTransfer) {
        dataTransfer.effectAllowed = 'copyMove';
        dataTransfer.setData(MIME, props.name);
        dataTransfer.setData(`props:${JSON.stringify({w: props.w, h: props.h, closable: props.closable})}`, '');
      }
    }

    return () => {
      if (!slots.default) return;
      return (
        <div draggable="true"
          onDragstart={onDragstart}
        >
          { slots.default() }
        </div>
      );
    };
  }
});
