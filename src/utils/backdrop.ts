import { get as getConfig } from './config';

// backdrop dom element
let backdrop: HTMLElement;
// this callback is called when backdrop is clicked
let clickCbk: undefined | Function;

export function show(idx?: number, cbk?: Function) {
  if (idx === undefined) {
    idx = getConfig().popupBaseDepth;
  }
  let dom: HTMLElement | null = document.querySelector('#j-backdrop');
  if (!dom) {
    dom = document.createElement('div');
    dom.id = 'j-backdrop';
    document.body.prepend(dom);
    backdrop = dom;
    dom.addEventListener('click', () => {
      if (typeof clickCbk == 'function') {
        clickCbk();
      }
    });
  }
  dom.style.zIndex = '' + idx;
  dom.hidden = false;
  clickCbk = cbk;
}

export function hide() {
  if (!backdrop) return;
  backdrop.hidden = true;
}