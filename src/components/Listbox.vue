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
  padding: 0.5rem 0;
}
</style>