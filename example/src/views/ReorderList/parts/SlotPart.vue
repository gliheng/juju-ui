<template>
  <j-reorder-list class="list" v-model="data" v-slot="{n}">
    <h1>{{ n }}</h1>      
  </j-reorder-list>
</template>

<script setup>
const data = [
  {n: 1},
  {n: 2},
  {n: 3},
  {n: 4},
  {n: 5},
];
</script>

<style scoped>
.list {
  width: 200px;
  border: 1px solid var(--j-foreground-color-2);
}
</style>
