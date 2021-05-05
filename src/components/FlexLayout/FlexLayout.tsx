import { defineComponent, ref, h, PropType, watch } from 'vue';
import Pane from './Pane';
import Divider from './Divider';
import { useElementSize } from '../../utils/hooks';
import { DIVIDER, idGenerator, normalizePreset, layout } from './layout';
import { PaneAttrs, RenderBox, Library } from './types';
import './FlexLayout.scss';

export default defineComponent({
  props: {
    library: {
      type: Object as PropType<Library>,
      required: true,
    },
    preset: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let elm = ref<HTMLDivElement>();
    let resizing = ref(false);
    let renderBox: RenderBox;
    let r = ref(0);
    function forceUpdate() {
      r.value += 1;
    }

    let viewSize = useElementSize(elm);
    watch(viewSize, (size) => {
      if (!renderBox) {
        let preset = normalizePreset(idGenerator(), props.preset as PaneAttrs, undefined);
        let box = layout(preset, 0, 0, size.width, size.height);
        // console.log('after layout', box);
        renderBox = box;
      } else {
        renderBox.layout(0, 0, size.width, size.height);
      }
      forceUpdate();
    });

    function onDragStart(box: RenderBox) {
      resizing.value = true;
    }
  
    function onDragMove(box: RenderBox, d: number) {
      let parent = box.parent;
      if (parent && parent.children) {
        let idx = parent.children.findIndex(item => item.id == box.id);
        if (idx != -1) {
          let prev = parent.children[idx - 1];
          let next = parent.children[idx + 1];
          // in case two sides are numbered
          if (typeof prev.size == 'number' && typeof next.size == 'number') {
            if (d > 0) {
              d = Math.min(next.size, d);
            } else {
              d = Math.max(-prev.size, d);
            }
            prev.size += d;
            next.size -= d;
          } else if (typeof prev.size == 'number') {
            // in case prev side is numbered, next is flex
            if (d < 0) {
              d = Math.max(-prev.size, d);
            }
            prev.size += d;
          } else if (typeof next.size == 'number') {
            // in case next side is numbered, prev is flex
            if (d > 0) {
              d = Math.min(next.size, d);
            }
            next.size -= d;
          } else if (typeof prev.flex == 'number' && typeof next.flex == 'number') {
            let ctx = parent.layoutContext!;
            let { flexSize } = ctx;
            let flex = d / flexSize;
            if (flex > 0) {
              flex = Math.min(next.flex, flex);
            } else {
              flex = Math.max(-prev.flex, flex);
            }
            prev.flex += flex;
            next.flex -= flex;
          }
          // relayout self
          parent.layout();
          forceUpdate();
        }
      }
    }
  
    function onDragEnd(box: RenderBox) {
      resizing.value = false;
    }
  
    function onAction(action: string, box: RenderBox, arg: any) {
      if (action == 'remove') {
        if (box.removeChild(box.id)) {
          forceUpdate();
        }
      } else if (action == 'replace') {
        box.use = arg as string;
        forceUpdate();
      }
    }
  
    function renderLayout(box: RenderBox, collect: JSX.Element[]) {
      if (box.children) {
        box.children.forEach(item => {
          renderLayout(item, collect);
        });
      } else if (box.use == DIVIDER) {
        collect.push(
          <Divider
            key={ box.id }
            {...box}
            {...box.props}
            box={ box }
            onDragStart={ onDragStart }
            onDragMove={ onDragMove }
            onDragEnd={ onDragEnd }
          />
        );
      } else {
        collect.push(
          <Pane key={ box.id } 
            {...box}
            box={ box }
            library={ props.library }
            onAction={ onAction }
          />
        );
      }
    }
  
    return () => {
      let nodes: JSX.Element[] = [];
      // using r.value here makes the render function reactive to r
      if (r.value >= 0 && renderBox) {
        renderLayout(renderBox, nodes);
      }
      return (
        <div class="j-flex-layout" ref={ elm } data-resizing={ resizing.value }>
          { nodes }
        </div>
      );
    };
  },
});
