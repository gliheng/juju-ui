import { defineComponent, h, PropType } from 'vue';
import { RenderBox } from './layout';


export default defineComponent({
  name: 'Divider',
  inheritAttrs: false,
  props: {
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
    vertical: {
      type: Boolean,
      default: true,
    },
    box: Object as PropType<RenderBox>,
    onDragStart: {
      type: Function,
      required: true,
    },
    onDragMove: {
      type: Function,
      required: true,
    },
    onDragEnd: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    let startFired = false;
    let lastSent = 0;
    let startX: number, startY: number;
    function onMousedown(evt: MouseEvent) {
      evt.preventDefault();

      startX = evt.clientX;
      startY = evt.clientY;
      lastSent = 0;
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('mouseup', onMouseup, {
        once: true,
      });
    }

    function onMousemove(evt: MouseEvent) {
      if (!startFired) {
        props.onDragStart(props.box);
        startFired = true;
      }
      let moved = props.vertical ? evt.clientX - startX : evt.clientY - startY;
      props.onDragMove(props.box, moved - lastSent);
      lastSent = moved;
    }

    function onMouseup() {
      document.removeEventListener('mousemove', onMousemove);
      if (props.onDragEnd) {
        props.onDragEnd(props.box);
      }
      startFired = false;
    }

    return () => {
      return (
        <div class="j-flex-layout-divider" style={{
          top: `${props.y}px`,
          left: `${props.x}px`,
          width: `${props.width}px`,
          height: `${props.height}px`,
        }} data-vertical={props.vertical} onMousedown={ onMousedown }></div>
      );
    };
  }
});