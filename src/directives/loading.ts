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
      let div = document.createElement('div');
      div.className = 'j-loading';
      let spinner = document.createElement('div');
      spinner.className = 'j-spinner';
      div.appendChild(spinner);
      el.appendChild(div);
      (el as any)[LoadingDirectiveSymbol] = div;
    } else {
      (el as any)[LoadingDirectiveSymbol].remove();
      delete (el as any)[LoadingDirectiveSymbol];
    }
  }
}