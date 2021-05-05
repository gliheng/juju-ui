<template>
  <div class="j-menu-bar j-shadow-1">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, provide, watchEffect } from 'vue';
import { MenuSetCloseSymbol, MenuBarActivateSymbol } from './Menu.vue';

export default {
  setup() {
    // The menu bar is *activated* by a click, then mouseover triggered it
    let activated = ref(false);
    provide(MenuBarActivateSymbol, activated);

    // lastCloseHandle is for exclusive menu display
    let lastCloseHandle: Function;
    provide<(cbk: Function) => void>(MenuSetCloseSymbol, (closeThis: Function) => {
      if (typeof lastCloseHandle == 'function') {
        lastCloseHandle();
      }
      lastCloseHandle = closeThis;
      activated.value = true;
    });

    watchEffect(() => {
      if (activated.value) {
        setTimeout(function() {
          document.addEventListener('click', () => {
            if (typeof lastCloseHandle == 'function') {
              lastCloseHandle();
            }
            activated.value = false;
          }, { once: true });
        }, 0);
      }
    });
    return { activated };
  },
};
</script>

<style src="./MenuBar.scss"></style>