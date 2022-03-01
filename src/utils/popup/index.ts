import { createApp, ComponentPublicInstance } from 'vue';
import SnackbarManager from './SnackbarManager.vue';
import PopupManager from './PopupManager.vue';

let snackbar: ComponentPublicInstance;
export function showSnackbar(title: string, timeout = 5) {
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