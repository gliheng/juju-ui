<template>
  <j-tile-layout :library="library">
    <template #placeholder>
      <div class="placeholder">Drop pill onto this block</div>
    </template>
  </j-tile-layout>
</template>

<script setup>
import library from './library';
</script>

<style lang="scss" scoped>
.pool {
  margin-bottom: 8px;
  .pill {
    display: inline-block;
    background: white;
    line-height: 30px;
    margin: 0 8px;
    border-radius: 20px;
    padding: 5px;
  }
  p {
    color: grey;
  }
}
.layout {
  height: 500px;
  .placeholder {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: silver;
  }
}
</style>