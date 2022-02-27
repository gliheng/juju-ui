import { h, Fragment, defineComponent, reactive, ref, watch } from 'vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';
import './ReorderList.scss';

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    let rootElm = ref();
    let copyData = ref<any[]>([]);
    let dragData = reactive({
      dragging: false,
      drag: -1,
      insert: -1,
      offsetX: 0,
      offsetY: 0,
      width: 0,
      height: 0,
    });
    let dragStyle = ref<Record<string, any>>();
    
    watch(() => props.modelValue, (v) => {
      copyData.value = v.concat();
    }, {
      immediate: true,
    });

    function startDrag(evt: MouseEvent) {
      evt.preventDefault();
      let li = (evt.target as Element).closest('li');
      if (!li) return;
      let idx = li.dataset.idx
      if (!idx) return;
      let i = parseInt(idx);
      dragData.insert = dragData.drag = i;      
      let offsetBox = li.getBoundingClientRect();
      dragData.offsetX = evt.x - offsetBox.left;
      dragData.offsetY = evt.y - offsetBox.top;
      dragData.width = li.clientWidth;
      dragData.height = li.clientHeight;
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', stopDrag, { once: true });
    }

    function move(evt: MouseEvent) {
      dragData.dragging = true;
      dragStyle.value = {
        left: `${evt.x - dragData.offsetX}px`,
        top: `${evt.y - dragData.offsetY}px`,
        width: `${dragData.width}px`,
        height: `${dragData.height}px`,
      };
      let li = (evt.target as Element).closest('li');
      // Ensure move over target is inside this component
      if (!li || li?.parentNode != rootElm.value) {
        return;
      }
      let idx = li.dataset.seq;
      if (!idx) return;
      dragData.insert = parseInt(idx);
    }

    function stopDrag(evt: MouseEvent) {
      dragStyle.value = undefined;
      dragData.dragging = false;
      let item = copyData.value.splice(dragData.drag, 1)[0];
      copyData.value.splice(dragData.insert, 0, item);
      
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stopDrag);

      emit('update:modelValue', copyData.value);
    }

    function renderContent(i: number) {
      let content;
      if (slots.default) {
        content = slots.default(copyData.value[i]);
      } else {
        content = copyData.value[i];
      }
      return (
        <>
          <SvgIcon
            class="j-reorder-list-handle"
            name="reorder-three-outline"
          />
          <main>{ content }</main>
        </>
      );
    }

    return () => {
      let items: JSX.Element[] = [];
      let data = copyData.value;
      let keys = data.map((_, i) => i);
      if (dragData.dragging) {
        let item = keys.splice(dragData.drag, 1)[0];
        keys.splice(dragData.insert, 0, item);
      }
      let seq = 0
      for (let i of keys) {
        let isDrag = dragData.dragging && i == dragData.drag;

        items.push(
          <li class="j-reorder-list-item"
            key={ i }
            data-idx={ i }
            data-seq={ seq }
            data-drag={ isDrag }
          >
            { renderContent(i) }
          </li>
        );
        seq++;
      }

      if (dragData.dragging) {
        // This is the element under drag
        let i = dragData.drag;
        items.push(
          <li class="j-reorder-list-item"
            key={ `_${ i }` }
            style={ dragStyle.value }
            data-idx={ i }
            data-drag-clone="true"
          >
            { renderContent(i) }
          </li>
        );
      }


      return (
        <ul
          ref={ rootElm }
          class="j-reorder-list"
          data-dragging={ dragData.dragging }
          onMousedown={ startDrag }
        >
          { items }
        </ul>
      );
    }
  },
});
