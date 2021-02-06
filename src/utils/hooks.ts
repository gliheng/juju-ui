import {
  ref, shallowReactive, Ref, getCurrentInstance,
  onMounted, onUnmounted,
  provide, inject,
  ComponentInternalInstance,
  reactive, watch,
} from 'vue';

export function useSwitch(v: boolean = false): [Ref<boolean>, (v?: boolean) => void] {
  let on = ref(v);
  function toggle(v?: boolean) {
    if (typeof v === 'boolean') {
      on.value = v;
    } else {
      on.value = !on.value;
    }
  }
  return [on, toggle];
}

export function useBackdropAwareSwitch(v: boolean = false): [Ref<boolean>, (v?: boolean) => void] {
  let [on, toggle] = useSwitch(v);
  watch(on, (v) => {
    if (v) {
      document.addEventListener('click', () => {
        toggle(false);
      }, { once: true });
    }
  });
  return [on, toggle];
}

type DescendantInjection<T> = {
  link: Function,
  unlink: Function,
  instance: ComponentInternalInstance,
  children: Array<ComponentInternalInstance>,
  data?: T,
};

export function useParent<T>(key: string | Symbol): DescendantInjection<T> | undefined {
  let obj = inject<DescendantInjection<T>>(key);
  let inst = getCurrentInstance();
  if (obj) {
    let { link, unlink } = obj;
    onMounted(() => {
     link(inst);
    });
    onUnmounted(() => {
      unlink(inst);
    });
  }
  return obj;
}

export function useChildren<T>(key: string | Symbol, data?: T): Array<ComponentInternalInstance> {
  let children = shallowReactive<Array<ComponentInternalInstance>>([]);
  function link(inst: ComponentInternalInstance) {
    children.push(inst);
  }

  function unlink(inst: ComponentInternalInstance) {
    let idx = children.indexOf(inst);
    if (idx != -1) {
      children.splice(idx, 1);
    }
  }

  let instance = getCurrentInstance();

  if (instance) {
    provide<DescendantInjection<T>>(key, { link, unlink, instance, children, data });
  }

  return children;
}

export function useWindowSize() {
  let size = reactive({ width: window.innerWidth, height: window.innerHeight });
  function onResize() {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
  }
  onMounted(() => {
    window.addEventListener('resize', onResize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });
  return size;
}

declare let ResizeObserver: any;

export function useElementSize(
  elementRef: Ref<HTMLElement | undefined>,
  nodeFetcher?: (node: Element) => Element): {
    width: number, height: number
} {
  let size = reactive({ width: 0, height: 0 });
  let watchNode: Element;
  let observer = new ResizeObserver((entries: Array<any>) => {
    entries.forEach(entry => {
      if (entry.target == watchNode) {
        size.width = entry.contentRect.width;
        size.height = entry.contentRect.height;
      }
    });
  });
  onMounted(() => {
    let elm = elementRef.value!;
    size.width = elm.clientWidth;
    size.height = elm.clientHeight;
    watchNode = nodeFetcher ? nodeFetcher(elm) : elm;
    observer.observe(watchNode);
  });
  onUnmounted(() => {
    observer.disconnect(elementRef.value);
  });

  return size;
}
