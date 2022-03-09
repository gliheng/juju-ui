<template>
  <j-select v-model="v" placeholder="Blend mode" :options="blendOptions">
    <j-button v-if="v">Blend mode: {{ v }}</j-button>
    <j-button v-else>Press me</j-button>
  </j-select>
</template>

<script setup>
import { ref } from 'vue';
import { blendOptions } from './options';

let v = ref();
</script>