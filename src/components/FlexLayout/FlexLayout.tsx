import { defineComponent, ref, h, PropType, watch } from 'vue';
import { useElementSize } from '@utils/hooks';
import { idGenerator, normalizePreset, RenderBox, HitTestAlignment } from './layout';
import { PaneAttrs, Library, Dimension } from './types';
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
      required: false,
    },
    showActionMenu: {
      type: Boolean,
      default: true,
    },
    gap: {
      type: Number,
      default: 2,
    },
    closable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
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
        let preset = normalizePreset(props.preset);
        renderBox = new RenderBox(preset, {
          idGen: idGenerator(), 
          library: props.library,
          onDividerDragStart,
          onDividerDragMove,
          onDividerDragEnd,
          onAction,
          placeholder: slots.placeholder,
          showActionMenu: props.showActionMenu,
          closable: props.closable,
          gap: props.gap,
        });
      }
      renderBox.layout(0, 0, size.width, size.height);
      forceUpdate();
    }, {
      flush: 'post',
    });

    function onDividerDragStart(box: RenderBox) {
      // When resizing, css transition is disabled
      resizing.value = true;
    }
  
    function onDividerDragMove(box: RenderBox, d: number) {
      let parent = box.parent;
      if (parent && parent.children) {
        let idx = parent.children.findIndex(item => item.id == box.id);
        if (idx != -1) {
          let prev = parent.children[idx - 1];
          let next = parent.children[idx];
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
            // in case two sides are flex
            let ctx = parent.layoutContext!;
            let { flexSize, totalFlex } = ctx;
            let flex = d / flexSize * totalFlex;
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

    let hintBox = ref<{
      box: RenderBox;
      alignment: HitTestAlignment;
      dimension: Dimension;
    }>();

    function validData(dt?: DataTransfer | null): boolean {
      return dt ? dt.types.indexOf(MIME) != -1 : false;
    }

    let tabHeight = 0;
    let rect: DOMRect | undefined;
    function onDragenter(evt: DragEvent) {
      if (validData(evt.dataTransfer)) {
        evt.preventDefault();
        evt.dataTransfer!.dropEffect = "copy";
        rect = elm.value?.getBoundingClientRect();
        
        let tabs = (evt.target as HTMLElement).closest('.j-tabs');
        let header = tabs?.querySelector(':scope > .j-tabs-inner');
        if (header) {
          tabHeight = header.clientHeight;
        } else {
          tabHeight = 0;
        }
      } else {
        rect = undefined;
      }
    }

    function onDragover(evt: DragEvent) {
      if (rect) {
        evt.preventDefault();
        let { clientX, clientY } = evt;
        let offsetX = clientX - rect.left, offsetY = clientY - rect.top;
        let hit = renderBox.hitTest(offsetX, offsetY, tabHeight);
        if (hit) {
          hintBox.value = hit;
        } else {
          hintBox.value = undefined;
        }
      }
    }

    function onDragleave(evt: DragEvent) {
      // relatedTarget is the element entering into
      if (!elm.value?.contains(evt.relatedTarget as HTMLElement)) {
        hintBox.value = undefined;
      }
    }

    function onDrop(evt: DragEvent) {
      evt.preventDefault();
      const data = evt.dataTransfer?.getData(MIME);
      if (data) {
        hintBox.value?.box.splitComponent(
          data,
          hintBox.value?.alignment,
        );
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

      // decide hintBox location
      let hintBoxNode: JSX.Element | undefined;
      if (hintBox.value) {
        let { x, y, width, height } = hintBox.value.dimension;
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
