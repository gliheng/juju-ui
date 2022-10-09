import { DirectiveBinding, ref, reactive, watchEffect, nextTick } from 'vue';

const ResizableDirectiveSymbol = Symbol('ResizableDirectiveSymbol');

class ResizeController {
  constructor(public el: HTMLElement) {
    let div = document.createElement('div');
    div.className = 'j-tile-resize';
    div.addEventListener('pointerdown', this.onPointerdown);
    el.appendChild(div);
  }

  private resizeMode = ref(false);
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
    this.resizeMode.value = true;

    this.stop = watchEffect(() => {
      if (this.resizeMode.value) {
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

    document.addEventListener('pointermove', this.onPointermove);
    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', this.onPointermove);
      this.resizeMode.value = false;
      nextTick(() => {
        this.stop?.();
      });
    }, { once: true });
  }

  onPointermove = (evt: PointerEvent) => {
    this.box.width = Math.max(this.box.width + evt.movementX, 0)
    this.box.height = Math.max(this.box.height + evt.movementY, 0)
  }
}

function setupResizable(el: HTMLElement, yes = true) {
  if (yes != Boolean((el as any)[ResizableDirectiveSymbol])) {
    if (yes) {
      (el as any)[ResizableDirectiveSymbol] = new ResizeController(el);
    } else {
      (el as any)[ResizableDirectiveSymbol].dispose();
      delete (el as any)[ResizableDirectiveSymbol];
    }
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    setupResizable(el, binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    setupResizable(el, binding.value);
  },
}
