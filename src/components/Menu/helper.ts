import { provide } from 'vue';

export const MenuSetCloseSymbol = Symbol('MenuSetCloseSymbol');
export const MenuBarActivateSymbol = Symbol('MenuBarActivateSymbol');

export function provideCloseHandler(onClose?: () => void) {
  let lastCloseHandle: Function;
  provide<(cbk: Function) => void>(MenuSetCloseSymbol, (closeThis) => {
    if (lastCloseHandle) {
      lastCloseHandle();
    }
    lastCloseHandle = closeThis;
    if (onClose !== undefined) {
      onClose();
    }
  });
}