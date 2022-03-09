<template>
  <p>Current color: <i class="box" :style="{'background-color': color}"></i> {{ color }}</p>
  <j-color-wheel v-model="color" />
</template>

<script setup>
import { ref } from 'vue';

let color = ref('rgb(255, 0, 255)');
</script>

<style scoped>
.box {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 3px;
}
</style>