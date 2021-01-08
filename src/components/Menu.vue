<template>
  <hr class="j-seperator" v-if="type == 'seperator'" v-bind="$attrs" />
  <div class="j-menu j-shadow-3" v-else-if="type == 'list'" v-bind="$attrs">
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
import { provide, inject, ref, SetupContext, Ref, watchEffect } from 'vue';
import { watch } from 'vue';
import SvgIcon from './SvgIcon.vue';

export const MenuSetCloseSymbol = Symbol('MenuSetCloseSymbol');
export const MenuBarActivateSymbol = Symbol('MenuBarActivateSymbol');

type SetLastCloseFunction = (cbk: Function) => void;

export default {
  inheritAttrs: false,
  props: {
    label: String,
    icon: String,
    type: String,
    side: {
      type: String,
      default: 'right',
    },
  },
  setup(props, { emit }: SetupContext) {
    if (props.type == 'seperator') return;

    // lastCloseHandle is for exclusive menu display
    let setCloseLast = inject<SetLastCloseFunction | null>(MenuSetCloseSymbol, null);
    let activated = inject<Ref<boolean> | null>(MenuBarActivateSymbol, null);

    let lastCloseHandle: Function;
    provide<(cbk: Function) => void>(MenuSetCloseSymbol, (closeThis) => {
      if (lastCloseHandle) {
        lastCloseHandle();
      }
      lastCloseHandle = closeThis;
    });

    if (props.type == 'list') return;

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

</script>

<style lang="scss">
.j-menu-entry {
  position: relative;
  color: var(--text-color);
  background-color: var(--background-color);
  min-width: 5rem;
  & hr.j-seperator {
    margin: 0.2rem 0.8rem 0.2rem 2.2rem;
    border: none;
    border-bottom: 1px solid var(--neutral-color-light);
  }

  .j-menu-label {
    min-height: 2rem;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    align-items: center;
    cursor: default;
    padding: 0 1rem 0 2.2rem;
    white-space: nowrap;
    display: flex;
    position: relative;
    overflow: hidden;
    &:hover {
      color: var(--primary-color-text);
      background-color: var(--primary-color);
      // background-color: var(--primary-color-lighter);
    }
    > span {
      flex: 1;
    }
    > .j-icon {
      margin-left: $margin;
    }
  }
  .j-menu-icon {
    position: absolute;
    left: 0rem;
    top: 50%;
    margin-top: -10px;
  }
}

.j-menu {
  color: var(--text-color);
  background-color: var(--background-color);
  z-index: 1;
  &:not(:empty) {
    padding: 0.3rem 0;
  }
}

.j-menu-entry[data-side="right"] {
  > .j-menu {
    position: absolute;
    left: 100%;
    margin-left: -10px;
    top: 0;
  }
}
.j-menu-entry[data-side="bottom"] {
  > .j-menu {
    position: absolute;
    top: 100%;
    left: 0;
  }
}
</style>