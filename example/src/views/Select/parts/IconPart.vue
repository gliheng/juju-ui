<template>
  <j-select v-model="v" placeholder="Select a transport" :options="transportOptions" />
</template>

<script>
import { ref } from 'vue';
import { transportOptions } from './options';

export default {
  setup() {
    let v = ref();
    return { v, transportOptions };
  },
}
</script>