<template>
  <j-select multiple v-model="v" placeholder="Select preferred tranport" :options="transportOptions" />
</template>

<script>
import { ref } from 'vue';
import { transportOptions } from './options';

export default {
  setup() {
    let v = ref([]);
    return { v, transportOptions };
  },
}
</script>