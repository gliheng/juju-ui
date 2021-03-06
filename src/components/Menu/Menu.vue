<template>
  <div v-if="list" v-bind="$attrs" class="j-menu j-shadow-3">
    <slot></slot>
  </div>
  <div v-else class="j-menu-entry" :data-side="side">
    <div class="j-menu-label" v-on="{
      click: showMenu,
      mouseenter: onMouseEnter,
    }" v-bind="$attrs" v-ripple>
      <svg-icon class="j-menu-icon" v-if="icon" :name="icon"></svg-icon>
      <span>{{ label }}</span>
      <svg-icon v-if="$slots.default" name="chevron-forward"></svg-icon>
    </div>
    <div class="j-menu j-shadow-3" v-if="menuOn">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { provide, inject, ref, Ref } from 'vue';
import { watch } from 'vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';

type SetLastCloseFunction = (cbk: Function) => void;

export default {
  inheritAttrs: false,
  props: {
    label: String,
    icon: String,
    list: Boolean,
    side: {
      type: String,
      default: 'right',
    },
  },
  setup(props, { emit }) {
    let setCloseLast = inject<SetLastCloseFunction | null>(MenuSetCloseSymbol, null);
    let activated = inject<Ref<boolean> | null>(MenuBarActivateSymbol, null);

    provideCloseHandler();
    if (props.list) return;

    // clicking non-menu area hides the menu
    let menuOn = ref(false);
    watch(menuOn, v => {
      if (v) {
        emit('open');
        setTimeout(function() {
          document.addEventListener('click', hideMenu, { once: true });
        }, 0);
      } else {
        emit('close');
      }
    });

    function showMenu(evt?: MouseEvent) {
      if (setCloseLast) {
        setCloseLast(hideMenu);
      }
      menuOn.value = true;
    }

    function hideMenu() {
      menuOn.value = false;
    }

    function onMouseEnter() {
      if (!activated || activated && activated.value) {
        showMenu();
      }
    }

    return { menuOn, showMenu, onMouseEnter };
  },
  components: {
    SvgIcon,
  },
};


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

</script>

<style src="./Menu.scss"></style>