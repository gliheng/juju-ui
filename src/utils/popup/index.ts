import { createApp, ComponentPublicInstance, markRaw } from 'vue';
import SnackbarManager from './SnackbarManager.vue';
import PopupManager from './PopupManager.vue';

let snackbar: ComponentPublicInstance;
export function showSnackbar(title: string, opts?: {
  type?: string;
  theme?: string;
  icon?: string;
  timeout?: number;
}) {
  if (!snackbar) {
    let dom = document.createElement('div');
    document.body.appendChild(dom);
    snackbar = createApp(SnackbarManager).mount(dom);
  }
  (snackbar as any).showSnackbar({
    title,
    ...opts,
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

export function alert(msg: string | JSX.Element, opts: PopupOpts): Promise<void> {
  let popups = ensurePopupRoot();
  if (typeof msg != 'string') {
    msg = markRaw(msg);
  }
  return (popups as any).showAlert(msg, opts);
}

export function confirm(msg: string | JSX.Element, opts: PopupOpts): Promise<void> {
  let popups = ensurePopupRoot();
  if (typeof msg != 'string') {
    msg = markRaw(msg);
  }
  return (popups as any).showConfirm(msg, opts);
}
