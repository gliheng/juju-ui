import {
  h, Fragment, defineComponent,
  reactive, ref, shallowReactive,
  watch, TransitionGroup,
  PropType, toRaw, inject, InjectionKey, computed, nextTick, onMounted, getCurrentInstance,
} from 'vue';
import Icon from '../Icon/Icon.vue';
import './ReorderList.scss';

export const GroupInjectKey: InjectionKey<any> = Symbol();

type SendType = {
  item: Record<string, any>,
  cancel: () => void,
}

export function useShelf() {
  let shelf: SendType | undefined;
  return {
    dragging: ref(false),
    send(d: SendType) {
      shelf = d;
    },
    receive() {
      let s = shelf;
      shelf = undefined;
      return s;
    },
    cancel() {
      shelf?.cancel();
      shelf = undefined;
    },
  };
}

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    // removable prop decide if the dragged item can leave the current lane or not
    removable: Boolean,
    // onRemove is called when drag is stopped
    // and it decide if the dragged item will be dropped or not
    onRemove: {
      type: Function as PropType<(datum: Record<string, any>) => boolean>,
      default: () => true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    let parent = inject(GroupInjectKey, undefined);
    let shelf = parent ?? useShelf();
    let rootElm = ref();
    let copyData = shallowReactive<Record<string, any>[]>([]);
    let dragData = reactive({
      item: null as Record<string, any> | null,
      // last inserted index
      insert: -1,
      // The dragged box
      sourceRect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      // The box to disappear into
      targetRect: null as DOMRect | null,
      rootHeight: 0,
    });
    let dragFx = reactive({
      style: null as Record<string, any> | null,
      item: null as Record<string, any> | null,
    });
    let removable = computed(() => props.removable || Boolean(parent));

    // Use weakMap to get a unique key
    let idMap = new WeakMap();
    let currId = 0;
    watch(() => props.modelValue, (v) => {
      copyData.splice(0);
      for (let d of v) {
        copyData.push(d);
      }
    }, {
      immediate: true,
    });

    function startDrag(evt: MouseEvent) {
      evt.preventDefault();
      let li = (evt.target as Element).closest('li');
      if (!li) return;
      let idx = elementIndex(li);
      dragData.insert = idx;
      dragData.item = copyData[idx];
      let offsetBox = li.getBoundingClientRect();
      dragData.sourceRect = {
        x: evt.x - offsetBox.left,
        y: evt.y - offsetBox.top,
        width: li.clientWidth,
        height: li.clientHeight,
      };
      dragFx.item = copyData[idx];
      let ul = rootElm.value.$el as HTMLElement;
      let rootBox = ul.getBoundingClientRect();
      dragData.rootHeight = rootBox.height;

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', stopDrag, { once: true });
    }

    function move(evt: MouseEvent) {
      shelf.dragging.value = true;

      const { sourceRect } = dragData;
      dragFx.style = {
        left: `${evt.x - sourceRect.x}px`,
        top: `${evt.y - sourceRect.y}px`,
        width: `${sourceRect.width}px`,
        height: `${sourceRect.height}px`,
      };
    }

    function stopDrag(evt: MouseEvent) {
      let shouldRemove = removable.value && props.onRemove(dragFx.item!);
      if (shouldRemove) {
        shelf.stopDrag?.();
        dragData.targetRect = null;
        dragFx.style = null;
        dragFx.item = null;
        shelf.dragging.value = false;
      } else {
        shelf.cancel();
        // In case target is not rendered yet
        nextTick(() => {
          dragData.targetRect = shelf.stopDrag?.(true) ?? getTargetRect();
          dragFx.style = null;
          dragFx.item = null;
          shelf.dragging.value = false;
        });
      }

      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stopDrag);

      emit('update:modelValue', copyData);
    }

    function onLeave(el: Element, done: () => void) {
      if (el instanceof HTMLElement) {
        if (el.dataset.dragFx) {
          // drag fx is moved out
          const { targetRect } = dragData;
          if (targetRect) {
            el.style.top = `${targetRect.y}px`;
            el.style.left = `${targetRect.x}px`;
            el.addEventListener('transitionend', done);
          } else {
            done();
          }
        } else if (el.dataset.drag) {
          // Transition looks bad
          // list item is moved out
          // el.style.height = '0px';
          // el.style.transform = 'scaleY(0)',
          // el.addEventListener('transitionend', done);
          done();
       }
      }
    }

    function onMouseenter(evt: MouseEvent) {
      if (!shelf.dragging.value) return;
      let transfer = shelf.receive();
      if (transfer) {
        // got transfer from shelf group
        dragData.item = transfer.item;

        let ul = rootElm.value.$el as HTMLElement;
        let rootBox = ul.getBoundingClientRect();
        let insert = elementIndexAtPos(ul, evt.clientY - rootBox.y);
        copyData.splice(insert, 0, dragData.item!);
        dragData.insert = insert;
  
        shelf.onDragStop?.((canceled: boolean) => {
          let rect;
          if (canceled) {
            rect = getTargetRect();
          }
          dragData.item = null;
          dragData.insert = -1;
          return rect;
        });
      }
    }

    // Get the rect of the current inserted element
    function getTargetRect() {
      const { insert } = dragData;
      if (insert < 0) return;
      let target = rootElm.value.$el.children[dragData.insert];
      let rect = target?.getBoundingClientRect();
      return rect;
    }

    function onMouseleave(evt: MouseEvent) {
      const { insert, item } = dragData;
      if (removable.value && item && shelf.dragging.value) {
        shelf.send({
          item: item,
          cancel() {
            dragData.item = item;
            dragData.insert = insert;
            copyData.splice(insert, 0, item);
          },
        });
        if (insert != -1) {
          copyData.splice(insert, 1);
          dragData.insert = -1;
        }
        dragData.item = null;
      }
    }

    function onMouseover(evt: MouseEvent) {
      if (shelf.dragging.value && dragData.item) {
        let li = (evt.target as Element).closest('li');
        if (!li) return;  
        let ul = (evt.target as Element).closest('ul');
        if (!ul) return;
        let min = li.offsetTop;
        let max = min + li.clientHeight;
        let { y } = ul.getBoundingClientRect();
        let top = evt.y - y;
        if (top >= min && top < max) {
          let insert = elementIndex(li);
          let changed = dragData.insert != insert;
          if (changed) {
            if (dragData.insert != -1) {
              // remove
              copyData.splice(dragData.insert, 1);
            }
            // insert
            copyData.splice(insert, 0, dragData.item);
            dragData.insert = insert;
          }
        }
      }
    }

    function renderContent(datum: Record<string, any>) {
      let content;
      if (slots.default) {
        content = slots.default(datum);
      } else {
        content = datum.label;
      }
      return (
        <>
          <Icon
            class="j-reorder-list-handle"
            name="reorder-three-outline"
          />
          <main>{ content }</main>
        </>
      );
    }

    return () => {
      let items: JSX.Element[] = [];
      let { item, rootHeight } = dragData;
      let dragging = shelf.dragging.value;
      for (let d of copyData) {
        // This is the current dragged item
        let id = idMap.get(toRaw(d));
        if (id === undefined) {
          id = currId++;
          idMap.set(toRaw(d), id);
        }
        
        let isDrag = shelf.dragging.value && item && toRaw(d) == toRaw(item);
        items.push(
          <li class="j-reorder-list-item"
            key={ id }
            data-drag={ isDrag }
          >
            { renderContent(d) }
          </li>
        );
      }

      {
        // This is the element under pointer
        const { item } = dragFx;
        if (dragging && item) {
          items.push(
            <li class="j-reorder-list-item"
              key="drag"
              style={ dragFx.style }
              data-drag-fx
            >
              { renderContent(item) }
            </li>
          );
        }
      }

      let style;
      if (dragging) {
        style = {
          minHeight: `${rootHeight}px`,
        };
      }
      return (
        <TransitionGroup
          class="j-reorder-list"
          tag="ul"
          ref={ rootElm }
          data-dragging={ shelf.dragging.value }
          onMousedown={ startDrag }
          onMouseenter={ onMouseenter }
          onMouseleave={ onMouseleave }
          onMouseover={ onMouseover }
          onLeave={ onLeave }
          style={ style }
        >
          { items }
        </TransitionGroup>
      );
    }
  },
});

function elementIndex(e: HTMLElement): number {
  if (!e.parentElement) return -1;
  return Array.from(e.parentElement.children).indexOf(e);
}

function elementIndexAtPos(e: HTMLElement, y: number): number {
  for (const [i, el] of Array.from(e.children).entries()) {
    let e = el as HTMLElement;
    if (y < e.offsetTop + e.clientHeight) {
      return i;
    }
  }
  return e.childElementCount;
}
