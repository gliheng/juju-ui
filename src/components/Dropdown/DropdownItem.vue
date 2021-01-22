<template>
  <div class="j-dropdown-item" :data-size="size" :data-has-icon="!!icon" @click="onClick" v-ripple>
    <svg-icon :size="size" :name="icon" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import SvgIcon from '../SvgIcon.vue';
import { useParent } from '../../utils/vue';

export const DropdownItemSymbol = Symbol('DropdownItemSymbol');

export default {
  props: {
    name: String,
    icon: String,
    size: String,
  },
  setup(props, { slots }) {    
    let setActive = useParent<{ setActive: Function }>(DropdownItemSymbol)?.data?.setActive;

    function onClick(evt: MouseEvent) {
      if (typeof setActive == 'function') {
        let tar = evt.currentTarget as Element;
        let idx = Array.from(tar.parentNode!.children).indexOf(tar);
        setActive(idx);
      }
    }
    
    return { onClick };
  },
  components: { SvgIcon },
}
</script>
