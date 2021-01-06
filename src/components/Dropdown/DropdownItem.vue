<template>
  <div class="j-dropdown-item" :data-has-icon="!!icon" @click="onClick" v-ripple>
    <svg-icon :name="icon" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue';
import SvgIcon from '../SvgIcon.vue';
import { useParent } from '../../utils/vue';
import { DropdownItem } from '../..';

export const DropdownItemSymbol = Symbol('DropdownItemSymbol');

export default {
  props: {
    name: String,
    icon: String,
  },
  setup(props, { slots }) {    
    let setActive = useParent<{ setActive: Function }>(DropdownItemSymbol)?.value?.setActive;

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