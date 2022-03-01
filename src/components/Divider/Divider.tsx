import { defineComponent, h, PropType, ref } from 'vue';
import "./Divider.scss";

export default defineComponent({
  name: 'Divider',
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
    positioned: {
      type: Boolean,
      default: false,
    },
    x: {
      type: Number,
      required: false,
    },
    y: {
      type: Number,
      required: false,
    },
    width: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    vertical: {
      type: Boolean,
      default: true,
    },
    onDragStart: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onDragMove: {
      type: Function as PropType<(delta: number, all: number) => void>,
      required: false,
    },
    onDragEnd: {
      type: Function as PropType<() => void>,
      required: false,
    },
  },
  setup(props) {
    let startFired = false;
    let lastSent = 0;
    let startX: number, startY: number;
    let dragging = ref(false);
    function onMousedown(evt: MouseEvent) {
      evt.preventDefault();

      startX = evt.clientX;
      startY = evt.clientY;
      dragging.value = true;
      lastSent = 0;
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('mouseup', onMouseup, {
        once: true,
      });
    }

    function onMousemove(evt: MouseEvent) {
      if (!startFired) {
        props.onDragStart && props.onDragStart();
        startFired = true;
      }
      let moved = props.vertical ? evt.clientX - startX : evt.clientY - startY;
      props.onDragMove && props.onDragMove(moved - lastSent, moved);
      lastSent = moved;
    }

    function onMouseup() {
      document.removeEventListener('mousemove', onMousemove);
      props.onDragEnd && props.onDragEnd();
      startFired = false;
      dragging.value = false;
    }

    return () => {
      let style: Record<string, any> = {};
      if (props.positioned) {
        style.top = `${props.y}px`;
        style.left = `${props.x}px`;
        if (props.vertical) {
          style.height = `${props.height}px`;
        } else {
          style.width = `${props.width}px`;
        }
      }
      return (
        <div
          class="j-divider"
          style={style}
          data-enabled={props.enabled}
          data-positioned={props.positioned}
          data-vertical={props.vertical}
          data-dragging={dragging.value}
          onMousedown={props.enabled ? onMousedown : undefined}
        />
      );
    };
  }
});
