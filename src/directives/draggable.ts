import { ref, reactive, watchEffect, DirectiveBinding, nextTick } from 'vue';

const DraggableDirectiveSymbol = Symbol('DraggableDirectiveSymbol');

class DraggableController {
  constructor(public el: HTMLElement) {
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

    document.addEventListener('pointermove', this.onPointermove);
    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', this.onPointermove);
      this.state.dragging = false;
      nextTick(() => {
        this.stop?.();
      });
    }, { once: true });
  }
  onPointermove = (evt: PointerEvent) => {
    this.state.left += evt.movementX;
    this.state.top += evt.movementY;
  }
}

function setupDraggable(el: HTMLElement, yes = true) {
  if (yes != Boolean((el as any)[DraggableDirectiveSymbol])) {
    if (yes) {
      (el as any)[DraggableDirectiveSymbol] = new DraggableController(el);
    } else {
      (el as any)[DraggableDirectiveSymbol].dispose();
      delete (el as any)[DraggableDirectiveSymbol];
    }
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    setupDraggable(el, binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    setupDraggable(el, binding.value);
  },
}
