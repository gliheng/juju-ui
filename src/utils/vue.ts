import {
  ref, shallowReactive, Ref, getCurrentInstance,
  onMounted, onUnmounted,
  provide, inject,
  ComponentInternalInstance,
  reactive,
} from 'vue';

export function useSwitch(v: boolean = false): [Ref, (v?: boolean) => void] {
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

type DescendantInjection<T> = {
  link: Function,
  unlink: Function,
  instance: ComponentInternalInstance,
  children: Array<ComponentInternalInstance>,
  data?: T,
};

export function useParent<T>(key: string | Symbol): DescendantInjection<T> | undefined {
  let obj = inject<DescendantInjection<T>>(key);
  if (obj) {
    let { link, unlink } = obj;
    let inst = getCurrentInstance();
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