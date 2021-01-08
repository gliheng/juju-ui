<template>
  <ul class="j-listbox">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
export default {
  setup() {
  }
};
</script>

<style lang="scss">
ul.j-listbox {
  list-style: none;
  text-align: left;
  margin: 0;
  padding: $margin 0;
}
</style>