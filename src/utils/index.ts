import { App, Component, Directive, Plugin } from 'vue';
export * as hooks from './hooks';
export * as popup from './popup';
export * as backdrop from './backdrop';
export * as emitter from './emitter';
export * as timer from './timer';
export * as scrollLock from './scroll-lock';

export function withInstall(name: string, options: Component): Plugin & Component {
  (options as Record<string, unknown>).install = (app: App) => {
    app.component(name, options);
  };

  return options as Plugin & Component;
}

export function withDirectiveInstall(name: string, options: Directive): Plugin & Directive {
  (options as Record<string, unknown>).install = (app: App) => {
    app.directive(name, options);
  };

  return options as Plugin & Directive;
}
