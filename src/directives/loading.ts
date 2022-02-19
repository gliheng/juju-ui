import { DirectiveBinding } from 'vue';

const LoadingDirectiveSymbol = Symbol('LoadingDirectiveSymbol');

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    syncLoader(el, binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    syncLoader(el, binding.value);
  },
}

function syncLoader(ref: HTMLElement, yes: boolean) {
  if (yes != Boolean((ref as any)[LoadingDirectiveSymbol])) {
    if (yes) {
      let el = document.createElement('div');
      el.className = 'j-loading';
      let spinner = document.createElement('div');
      spinner.className = 'j-spinner';
      el.appendChild(spinner);
      ref.appendChild(el);
      (ref as any)[LoadingDirectiveSymbol] = el;
    } else {
      (ref as any)[LoadingDirectiveSymbol].remove();
      delete (ref as any)[LoadingDirectiveSymbol];
    }
  }
}