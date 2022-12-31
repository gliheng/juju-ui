import { DirectiveBinding, ref, reactive, watchEffect, nextTick } from 'vue';

type ResizableParams = boolean | {
  onResizeStart?: () => void;
  onResize?: (w: number, h: number) => void;
  onResizeEnd?: () => void;
};

const ResizableDirectiveSymbol = Symbol('ResizableDirectiveSymbol');

class ResizeController {
  constructor(public el: HTMLElement, public params: ResizableParams) {
    let div = document.createElement('div');
    div.className = 'j-tile-resize';
    div.addEventListener('pointerdown', this.onPointerdown);
    el.appendChild(div);
  }

  private resizing = ref(false);
  private box = reactive({
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
    Object.assign(this.box, box);

    document.addEventListener('pointermove', this.onPointermove);
    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', this.onPointermove);
      this.resizing.value = false;
      nextTick(() => {
        this.stop?.();
        if (typeof this.params == 'object') {
          this.params.onResizeEnd?.();
        }
      });
    }, { once: true });
  }

  onPointermove = (evt: PointerEvent) => {
    if (this.resizing.value) {
      this.box.width = Math.max(this.box.width + evt.movementX, 0)
      this.box.height = Math.max(this.box.height + evt.movementY, 0)
      if (typeof this.params == 'object') {
        this.params.onResize?.(this.box.width, this.box.height);
      }
    } else {
      this.resizing.value = true;
      if (typeof this.params == 'object') {
        this.params.onResizeStart?.();
      }
      this.stop = watchEffect(() => {
        if (this.resizing.value) {
          this.el.style.position = 'absolute';
          // Absolute positioning within grid are relative to grid cell
          // so left and top are not applied
          // this.el.style.left = `${this.box.left}px`;
          // this.el.style.top = `${this.box.top}px`;
          this.el.style.width = `${this.box.width}px`;
          this.el.style.height = `${this.box.height}px`;
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
