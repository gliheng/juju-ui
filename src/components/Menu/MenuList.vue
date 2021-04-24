<template>
  <div class="j-menu j-shadow-3">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { provideCloseHandler } from './helper';

export default defineComponent({
  setup() {
    provideCloseHandler();
  },
});
</script>

<style src="../../assets/styles/Menu.scss"></style>