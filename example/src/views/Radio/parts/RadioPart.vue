<template>
  <p>Which fruit do you like?</p>
  <p>
    <j-radio value="apple" v-model="grp">Apple</j-radio>
    <j-radio value="banana" v-model="grp">Banana</j-radio>
    <j-radio value="orange" v-model="grp">Orange</j-radio>
    <j-radio value="melon" v-model="grp">Melon</j-radio>
  </p>
  <p>Current value: {{ grp }}</p>
</template>

<script setup>
import { ref } from 'vue';

let grp = ref('apple');
</script>

<style scoped>
:deep(.j-radio) {
  margin-right: 10px;
}
</style>