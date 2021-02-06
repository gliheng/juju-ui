import { createApp, ComponentPublicInstance } from 'vue';
import SnackbarManager from './components/_SnackbarManager.vue';
import PopupManager from './components/_PopupManager.vue';

let snackbar: ComponentPublicInstance;
export function showSnackbar(title: string, timeout: number) {
  if (!snackbar) {
    let dom = document.createElement('div');
    document.body.appendChild(dom);
    snackbar = createApp(SnackbarManager).mount(dom);
  }
  (snackbar as any).showSnackbar({
    title, timeout,
  });
}

let popups: ComponentPublicInstance;
function ensurePopupRoot(): ComponentPublicInstance {
  if (!popups) {
    let dom = document.createElement('div');
    document.body.appendChild(dom);
    popups = createApp(PopupManager).mount(dom);
  }
  return popups;
}

export interface PopupOpts {
  title: string,
  modal: boolean,
  icon: string,
}

export function alert(msg: string, opts: PopupOpts): Promise<void> {
  let popups = ensurePopupRoot();
  return (popups as any).showAlert(msg, opts);
}

export function confirm(msg: string, opts: PopupOpts): Promise<void> {
  let popups = ensurePopupRoot();
  return (popups as any).showConfirm(msg, opts);
}