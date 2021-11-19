<template>
  <div class="j-split-button">
    <button-group>
      <j-button :icon="icon"><slot></slot></j-button>
      <j-button icon="chevron-down" @click.stop="showMenu"></j-button>
    </button-group>
    <j-menu v-if="menuOn" list>
      <slot name="menu"></slot>
    </j-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JButton from '../Button/Button.vue';
import JMenu from '../Menu/Menu.vue';
import ButtonGroup from '../Button/ButtonGroup.vue';
import { useSwitch } from '@utils/hooks';

export default defineComponent({
  components: { ButtonGroup, JButton, JMenu },
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
});
</script>

<style src="./SplitButton.scss"></style>