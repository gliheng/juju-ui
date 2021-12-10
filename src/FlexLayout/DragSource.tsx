import { defineComponent, h } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    function onDragstart(evt: DragEvent) {
      evt.dataTransfer!.setData("application/j-flex-layout", props.name);
    }

    return () => {
      return (
        <div onDragstart={onDragstart} draggable="true">
          { slots.default!() }
        </div>
      );
    };
  }
});