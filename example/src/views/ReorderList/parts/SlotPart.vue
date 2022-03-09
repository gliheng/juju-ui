<template>
  <j-reorder-list class="list" v-model="data" v-slot="item">
    <h1>{{ item }}</h1>      
  </j-reorder-list>
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
