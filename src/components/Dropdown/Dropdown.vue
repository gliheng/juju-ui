<template>
  <div class="j-dropdown" :data-align="align">
    <div v-if="trigger == 'click'" class="j-dropdown-trigger" @click.stop="toggle()">
      <slot />
    </div>
    <div v-else-if="trigger == 'hover'" class="j-dropdown-trigger" @mouseenter="toggle(true)">
      <slot />
    </div>
    <div class="j-dropdown-menu" v-if="menuOn" :style="{marginTop: `${menuOffset}px`}">
      <slot name="menu" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBackdropAwareSwitch } from '../../utils/hooks';

export default defineComponent({
  props: {
    align: {
      type: String,
      default: 'left',
    },
    trigger: {
      type: String,
      default: 'click', // click | hover
    },
    menuOffset: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    let [ menuOn, toggle ] = useBackdropAwareSwitch();

    return { menuOn, toggle, triggerEvent: props.trigger };
  },
});
</script>

<style src="./Dropdown.scss"></style>