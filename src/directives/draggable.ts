import { reactive, watchEffect, DirectiveBinding, nextTick } from 'vue';

type DraggableParams = boolean | {
  onDragStart?: () => void;
  onDragMove?: (x: number, y: number) => void;
  onDragEnd?: () => void;
};

const DraggableDirectiveSymbol = Symbol('DraggableDirectiveSymbol');

class DraggableController {
  constructor(private el: HTMLElement, private params: DraggableParams) {
    el.addEventListener('pointerdown', this.onPointerdown);
  }
  dispose() {
    this.el.removeEventListener('pointerdown', this.onPointerdown);
  }

  private state = reactive({
    dragging: false,
    left: 0,
    top: 0,
  });
  private stop?: () => void;

  onPointerdown = (evt: PointerEvent) => {
    evt.preventDefault();

    document.addEventListener('pointermove', this.onPointermove);
    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', this.onPointermove);
      this.state.dragging = false;
      delete this.el.dataset.dragging;
      nextTick(() => {
        this.stop?.();
          if (typeof this.params == 'object') {
            this.params.onDragEnd?.();
          }
        });
      }, { once: true });
  }
  onPointermove = (evt: PointerEvent) => {
    if (this.state.dragging) {
      // drag moving
      this.state.left += evt.movementX;
      this.state.top += evt.movementY;
      if (typeof this.params == 'object') {
        this.params.onDragMove?.(this.state.left, this.state.top);
      }
    } else {
      // drag start
      this.state.dragging = true;
      this.state.left = 0;
      this.state.top = 0;
      this.stop = watchEffect(() => {
        if (this.state.dragging) {
          this.el.style.transform = `translate(${this.state.left}px, ${this.state.top}px)`;
          this.el.style.zIndex = '1';
        } else {
          this.el.style.transform = '';
          this.el.style.zIndex = '';
        }
      });
      if (typeof this.params == 'object') {
        this.params.onDragStart?.();
      }
      this.el.dataset.dragging = "";
    }
  }
}

function setupDraggable(el: HTMLElement, params: DraggableParams) {
  if (Boolean(params) != Boolean((el as any)[DraggableDirectiveSymbol])) {
    if (params) {
      (el as any)[DraggableDirectiveSymbol] = new DraggableController(el, params);
    } else {
      (el as any)[DraggableDirectiveSymbol].dispose();
      delete (el as any)[DraggableDirectiveSymbol];
    }
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<DraggableParams>) {
    setupDraggable(el, binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<DraggableParams>) {
    setupDraggable(el, binding.value);
  },
}
