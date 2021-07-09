<template>
  <j-slider :min="100" :max="1000" :step="100" v-model="v" />
  <p>Value: {{ v }}</p>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let v = ref(100);
    return { v };
  }
}
</script>