import { defineComponent, h } from 'vue';

export default defineComponent({
  name: '$seperator',
  props: {
    id: Number,
    vertical: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    left: {
      type: Number,
      required: true,
    },
    top: {
      type: Number,
      required: true,
    },
    onStartDrag: Function,
    onEndDrag: Function,
  },
  setup(props) {
    return () => {
      function onMousedown(evt: MouseEvent) {
        if (props.onStartDrag) {
          props.onStartDrag(props.id, evt.clientX, evt.clientY);
        }
        document.addEventListener('mouseup', onMouseup, {
          once: true,
        });
      }

      function onMouseup() {
        if (props.onEndDrag) {
          props.onEndDrag();
        }
      }

      return (
        <div class="j-layout-seperator" style={{
          top: `${props.vertical ? props.top : props.top - 2}px`,
          left: `${props.vertical ? props.left - 2 : props.left}px`,
          width: `${props.vertical? 4 : props.width}px`,
          height: `${props.vertical? props.height : 4}px`,
        }} data-vertical={props.vertical} onMousedown={ onMousedown }></div>
      );
    };
  }
});