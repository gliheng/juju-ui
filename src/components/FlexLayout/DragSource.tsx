import { defineComponent, h } from 'vue';
import { MIME } from './FlexLayout';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  // These are native events, they're here to make ts happy
  setup(props, { slots }) {
    function onDragstart(evt: DragEvent) {
      let { dataTransfer } = evt;
      if (dataTransfer) {
        dataTransfer.effectAllowed = 'copyMove';
        dataTransfer.setData(MIME, props.name);
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
