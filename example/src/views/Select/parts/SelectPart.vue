<template>
  <j-select v-model="v" placeholder="Blend mode" :options="blendOptions" />
</template>

<script>
import { ref } from 'vue';
import { blendOptions } from './options';

export default {
  setup() {
    let v = ref();
    return { v, blendOptions };
  },
}
</script>