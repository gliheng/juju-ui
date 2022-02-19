<template>
  <j-button @click="loading = !loading">Toggle loading</j-button>
  <div>
    <p class="box" v-loading="loading"></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false);
</script>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: var(--j-background-color-1);
  color: var(--j-forground-color-1);
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>