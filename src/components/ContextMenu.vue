<template>
  <div class="j-context-menu" @contextmenu.prevent="onContextMenu">
    <slot></slot>
    <div class="j-context-menu-popup" v-if="showMenu" :style="{left: `${pos[0]}px`, top: `${pos[1]}px`}">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { watch, ref } from 'vue';
import { useSwitch } from '../utils/vue';

export default {
  setup() {
    let [showMenu, toggleShowMenu] = useSwitch(false);
    let pos = ref<[number, number]>([0, 0]);
    watch(showMenu, (v) => {
      if (v) {
        document.addEventListener('click', () => {
          toggleShowMenu(false);
        }, { once: true });
      }
    });
    function onContextMenu(evt: MouseEvent) {
      let rect = (evt.currentTarget as HTMLElement).getBoundingClientRect();
      let x = evt.clientX - rect.left,
        y = evt.clientY - rect.top;
      
      pos.value = [x, y];
      toggleShowMenu(true);
    }
    return { showMenu, pos, onContextMenu };
  },
};
</script>
