<template>
  <j-reorder-list class="list" v-model="data" removable />
</template>

<script setup>
const data = [
  {label: 1},
  {label: 2},
  {label: 3},
  {label: 4},
  {label: 5},
];
</script>

<style scoped>
.list {
  width: 200px;
  border: 1px solid var(--j-foreground-color-2);
}
</style>
