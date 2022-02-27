<template>
  <j-reorder-list class="list" v-model="data" />
</template>

<script setup>
const data = [1, 2, 3, 4, 5];
</script>

<style scoped>
.list {
  width: 200px;
  border: 1px solid var(--j-foreground-color-2);
}
</style>