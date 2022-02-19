import { DirectiveBinding } from 'vue';

const CLASSNAME = 'j-ink-active';

class RippleHandler {
  center: boolean;

  constructor(center: boolean = false) {
    this.center = center;
  }

  getInk(node: Element): HTMLElement {
    let ink = node.querySelector(':scope > .j-ink');
    if (!ink) {
      ink = document.createElement('div');
      ink.addEventListener('animationend', this.onAnimationEnd);
    }
    return ink as HTMLElement;
  }
  
  handleEvent(evt: PointerEvent) {
    // only accept primary mouse button click
    if (evt.buttons != 1) return;

    let target = evt.currentTarget as Element;
    let ink = this.getInk(target);
    let rect = target.getBoundingClientRect();
    let { clientX, clientY } = evt;
    let offsetX, offsetY;
    if (this.center) {
      offsetX = rect.width / 2;
      offsetY = rect.height / 2;
    } else {
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
    }
    let size = Math.max(rect.width, rect.height);
    ink.className = 'j-ink';
    ink.style.left = `${offsetX - size/2}px`;
    ink.style.top = `${offsetY - size/2}px`;
    ink.style.width = `${size}px`;
    ink.style.height = `${size}px`;
    (target! as Node).appendChild(ink);
    ink.classList.add(CLASSNAME);
  }
  onAnimationEnd(evt: Event) {
    (evt.currentTarget! as Element).classList.remove(CLASSNAME);
  }
}

const RippleDirectiveSymbol = Symbol('RippleDirectiveSymbol');

export interface RippleDef {
  center: boolean,
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean | string | RippleDef>) {
    let center = false;
    if (binding.arg == 'center') {
      center = binding.value as boolean;
    } else if (typeof binding.value == 'object') {
      center = binding.value.center;
    }
    let handler = new RippleHandler(center);
    (el as any)[RippleDirectiveSymbol] = handler;
    el.addEventListener('mousedown', handler);
  },
  unmounted(el: HTMLElement) {
    let handler = (el as any)[RippleDirectiveSymbol];
    if (handler) {
      el.removeEventListener('mousedown', handler);
    }
  },
}