import { DirectiveBinding } from 'vue';

const CLASSNAME = 'j-ink-active';

class RippleHandler {
  center: boolean;
  color: string;

  constructor(center: boolean = false, color: string = '') {
    this.center = center;
    this.color = color;
  }

  getInk(node: Element): HTMLElement {
    let ink = node.querySelector(':scope > .j-ink');
    if (!ink) {
      ink = document.createElement('div');
      if (this.color) {
        (ink as HTMLElement).style.backgroundColor = this.color;
      }
      ink.addEventListener('animationend', this.onAnimationEnd);
    }
    return ink as HTMLElement;
  }
  
  handleEvent(evt: MouseEvent) {
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

const RippleEventHandlerSymbol = Symbol('RippleEventHandlerSymbol');

interface RippleDef {
  color: string,
  center: boolean,
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean | string | RippleDef>) {
    let color = '', center = false;
    if (binding.arg == 'center') {
      center = binding.value as boolean;
    } else if (binding.arg == 'color') {
      color = binding.value as string;
    } else if (typeof binding.value == 'object') {
      color = binding.value.color;
      center = binding.value.center;
    }
    let handler = new RippleHandler(center, color);
    (el as any)[RippleEventHandlerSymbol] = handler;
    el.addEventListener('mousedown', handler);
  },
  unmounted(el: HTMLElement) {
    let handler = (el as any)[RippleEventHandlerSymbol];
    if (handler) {
      el.removeEventListener('mousedown', handler);
    }
  },
}