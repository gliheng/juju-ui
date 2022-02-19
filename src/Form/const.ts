import { InjectionKey, Ref } from 'vue';

export const FormSymbol: InjectionKey<{
  errors: Ref<Record<string, any>>;
 }> = Symbol('Form symbol');
