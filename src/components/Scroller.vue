<template>
  <div v-scroller>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import scroller from '../directives/scroller';

export default defineComponent({
  directives: [
    scroller,
  ],
});
</script>

<style>

</style>
