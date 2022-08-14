import { DirectiveBinding } from 'vue';

const LoadingDirectiveSymbol = Symbol('LoadingDirectiveSymbol');

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    setupLoading(el, binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    setupLoading(el, binding.value);
  },
}

function setupLoading(el: HTMLElement, yes: boolean = true) {
  if (yes != Boolean((el as any)[LoadingDirectiveSymbol])) {
    if (yes) {
      let el = document.createElement('div');
      el.className = 'j-loading';
      let spinner = document.createElement('div');
      spinner.className = 'j-spinner';
      el.appendChild(spinner);
      el.appendChild(el);
      (el as any)[LoadingDirectiveSymbol] = el;
    } else {
      (el as any)[LoadingDirectiveSymbol].remove();
      delete (el as any)[LoadingDirectiveSymbol];
    }
  }
}