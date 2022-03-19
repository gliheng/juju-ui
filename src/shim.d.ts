declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'b-validate'

interface ImportMeta {
  env: Record<string, any>;
}