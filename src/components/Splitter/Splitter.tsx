import {
  defineComponent, h, computed,
  watch, reactive, ref,
} from 'vue';
import { useElementSize } from '../../utils/hooks';
import Divider from '../Divider/Divider';
import "./Splitter.scss";

export default defineComponent({
  props: {
    vertical: Boolean,
  },
  setup(props, { slots }) {
    let splitterElm = ref<HTMLDivElement>();
    let containerSize = useElementSize(splitterElm);
    let resizing = ref(false);

    function onDragStart() {
      resizing.value = true;
    }

    function onDragMove(which: number, d: number) {
      let size = containerSize.width;
      if (props.vertical) {
        size = containerSize.height;
      }
      
      sizes[which] += d / size * 100;
      sizes[which + 1] -= d / size * 100;
    }

    function onDragEnd() {
      resizing.value = false;
    }

    let panels = computed<Array<any>>(() => {
      if (!slots.default) return [];
      let panels = slots.default();
      return panels;
    });

    let sizes = reactive<number[]>([]);
    watch(
      () => panels.value.length,
      (len) => {
        sizes.splice(0);
        let n = 100 / len;
        for (let i = 0; i < len; i++) {
          sizes.push(n);
        }
      },
      {
        immediate: true,
      }
    );

    return () => {
      let content: JSX.Element[] = [];
      let panelCount = panels.value.length;
      let dividerSize = (panelCount - 1) * 2 / panelCount;
      panels.value.forEach((p, i) => {
        p.key = i;
        p.props = {
          ...p.props,
          actualSize: `calc(${Math.floor(sizes[i])}% - ${dividerSize}px`,
        };
        content.push(p);
        if (i != panels.value.length - 1) {
          content.push(
            <Divider
              key={`d:${i}`}
              vertical={ !props.vertical }
              onDragStart={ onDragStart }
              onDragMove={ onDragMove.bind(null, i) }
              onDragEnd={ onDragEnd }
            />
          );
        }
      });
      return (
        <div class="j-splitter"
          ref={splitterElm}
          data-vertical={props.vertical}
          data-resizing={resizing.value}
        >
          { content }
        </div>
      );
    }
  }
});
