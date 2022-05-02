<template>
  <j-select
    v-model="v"
    placeholder="Blend mode"
    :options="blendOptions"
    clearable />
</template>

<script setup>
import { ref } from 'vue';
import { blendOptions } from './options';

let v = ref();
</script>