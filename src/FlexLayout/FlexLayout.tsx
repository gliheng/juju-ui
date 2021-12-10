import { defineComponent, ref, h, PropType, watch } from 'vue';
import { useElementSize } from '@utils/hooks';
import { idGenerator, normalizePreset, RenderBox } from './layout';
import { PaneAttrs, Library } from './types';
import './FlexLayout.scss';

export const MIME = "application/j-flex-layout";

export default defineComponent({
  props: {
    library: {
      type: Object as PropType<Library>,
      required: true,
    },
    preset: {
      type: Object as PropType<PaneAttrs>,
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
        let preset = normalizePreset(
          idGenerator(), props.preset,
        );
        renderBox = new RenderBox(preset, {
          library: props.library,
          onDividerDragStart,
          onDividerDragMove,
          onDividerDragEnd,
          onAction,
        });
      }
      renderBox.layout(0, 0, size.width, size.height);
      forceUpdate();
    }, {
      flush: 'post',
    });

    function onDividerDragStart(box: RenderBox) {
      resizing.value = true;
    }
  
    function onDividerDragMove(box: RenderBox, d: number) {
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
          parent.doLayout();
          forceUpdate();
        }
      }
    }
  
    function onDividerDragEnd(box: RenderBox) {
      resizing.value = false;
    }

    let hintBox = ref<RenderBox>();

    function validData(dt?: DataTransfer | null): boolean {
      return dt ? dt.types.includes(MIME) : false;
    }

    let rect: DOMRect | undefined;
    function onDragenter(evt: DragEvent) {
      if (validData(evt.dataTransfer)) {
        evt.preventDefault();
        evt.dataTransfer!.dropEffect = "copy";
        rect = elm.value?.getBoundingClientRect();
      } else {
        rect = undefined;
      }
    }

    // TODO: This event triggers a lots, may use a mousemove handler to optimize
    function onDragover(evt: DragEvent) {
      if (rect) {
        evt.preventDefault();
        let { clientX, clientY } = evt;
        let offsetX = clientX - rect.left, offsetY = clientY - rect.top;
        let hit = renderBox.hitTest(offsetX, offsetY);
        if (hit) {
          hintBox.value = hit;
        } else {
          hintBox.value = undefined;
        }
      }
    }

    function onDragleave(evt: DragEvent) {
      console.log('dragleave');
      hintBox.value = undefined;
    }

    function onDrop(evt: DragEvent) {
      evt.preventDefault();
      const data = evt.dataTransfer?.getData(MIME);
      if (data) {
        hintBox.value?.swapComponent(data);
      }
      hintBox.value = undefined;
      forceUpdate();
    }
  
    function onAction(action: string, box: RenderBox, arg: unknown) {
      if (action == 'remove') {
        box.remove();
        forceUpdate();
      } else if (action == 'replace') {
        box.swapComponent(arg as string);
        forceUpdate();
      } else if (action == 'expand') {
        box.expand();
        forceUpdate();
      } else if (action == 'contract') {
        box.contract();
        forceUpdate();
      }
    }
  
    return () => {
      let nodes: JSX.Element[] = [];
      // checking r.value is useless but it makes the render function reactive to r
      if (r.value >= 0 && renderBox) {
        renderBox.render(nodes);
      }

      let hintBoxNode: JSX.Element | undefined;
      if (hintBox.value) {
        let { x, y, width, height } = hintBox.value;
        let style: Record<string, any> = {
          top: `${y}px`,
          left: `${x}px`,
          width: `${width}px`,
          height: `${height}px`,
        };
        hintBoxNode = (
          <div
            class="j-flex-layout-hint"
            style={style}
          ></div>
        );
      }

      return (
        <div class="j-flex-layout"
          ref={ elm }
          data-resizing={ resizing.value }
          onDragenter={ onDragenter }
          onDragleave={ onDragleave }
          onDragover={ onDragover }
          onDrop={ onDrop }
        >
          { nodes }
          { hintBoxNode }
        </div>
      );
    };
  },
});
