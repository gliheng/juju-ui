import { DirectiveBinding, ref, reactive, watchEffect, nextTick } from 'vue';

type ResizableParams = boolean | {
  onResizeStart?: () => void;
  onResize?: (w: number, h: number) => void;
  onResizeEnd?: () => void;
};

const ResizableDirectiveSymbol = Symbol('ResizableDirectiveSymbol');

class ResizeController {
  constructor(private el: HTMLElement, private params: ResizableParams) {
    let div = document.createElement('div');
    div.className = 'j-tile-resize';
    div.addEventListener('pointerdown', this.onPointerdown);
    el.appendChild(div);
  }

  dispose() {
  }

  private state = reactive({
    resizing: false,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  private stop?: () => void;

  onPointerdown = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    let box = this.el.getBoundingClientRect().toJSON()
    let offsetBox = this.el.offsetParent?.getBoundingClientRect();
    if (offsetBox) {
      box.left -= offsetBox.left;
      box.top -= offsetBox.top;
      box.x -= offsetBox.x;
      box.y -= offsetBox.y;
    }
    Object.assign(this.state, box);

    document.addEventListener('pointermove', this.onPointermove);
    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', this.onPointermove);
      this.state.resizing = false;
      delete this.el.dataset.resizing;
      nextTick(() => {
        this.stop?.();
        if (typeof this.params == 'object') {
          this.params.onResizeEnd?.();
        }
      });
    }, { once: true });
  }

  onPointermove = (evt: PointerEvent) => {
    const { state } = this;
    if (state.resizing) {
      state.width = Math.max(state.width + evt.movementX, 0)
      state.height = Math.max(state.height + evt.movementY, 0)
      if (typeof this.params == 'object') {
        this.params.onResize?.(state.width, state.height);
      }
    } else {
      state.resizing = true;
      if (typeof this.params == 'object') {
        this.params.onResizeStart?.();
      }
      this.stop = watchEffect(() => {
        if (state.resizing) {
          this.el.style.position = 'absolute';
          // Absolute positioning within grid are relative to grid cell
          // so left and top are not applied
          // this.el.style.left = `${this.box.left}px`;
          // this.el.style.top = `${this.box.top}px`;
          this.el.style.width = `${state.width}px`;
          this.el.style.height = `${state.height}px`;
          this.el.style.zIndex = '1';
        } else {
          this.el.style.position = '';
          // this.el.style.left = '';
          // this.el.style.top = '';
          this.el.style.width = '';
          this.el.style.height = '';
          this.el.style.zIndex = '';
        }
      });
      this.el.dataset.resizing = "";
    }
  }
}

function setupResizable(el: HTMLElement, params: ResizableParams) {
  if (Boolean(params) != Boolean((el as any)[ResizableDirectiveSymbol])) {
    if (params) {
      (el as any)[ResizableDirectiveSymbol] = new ResizeController(el, params);
    } else {
      (el as any)[ResizableDirectiveSymbol].dispose();
      delete (el as any)[ResizableDirectiveSymbol];
    }
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<ResizableParams>) {
    setupResizable(el, binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<ResizableParams>) {
    setupResizable(el, binding.value);
  },
}
