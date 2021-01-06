<template>
  <div class="j-split-button">
    <button-group>
      <j-button :icon="icon"><slot></slot></j-button>
      <j-button icon="chevron-down" @click.stop="showMenu"></j-button>
    </button-group>
    <j-menu v-if="menuOn" type="list">
      <slot name="menu"></slot>
    </j-menu>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import JButton from './Button.vue';
import JMenu from './Menu.vue';
import ButtonGroup from './ButtonGroup.vue';
import { useSwitch } from '../utils/vue';

export default {
  props: {
    icon: String,
  },
  setup() {
    let [ menuOn, toggleMenu ] = useSwitch();
    function showMenu() {
      toggleMenu();
      if (menuOn.value) {
        document.addEventListener('click', function() {
          toggleMenu(false);
        }, { once: true });
      }
    }
    return { showMenu, menuOn };
  },
  components: { ButtonGroup, JButton, JMenu },
};
</script>

<style lang="scss">
.j-split-button {
  position: relative;
  display: inline-block;
  > .j-menu {
    position: absolute;
    min-width: 100%;
  }
}
</style>