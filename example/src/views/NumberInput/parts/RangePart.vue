<template>
  <j-number-input v-model="num" :min="50" :max="100" :step="10" />
  <p>Value: {{ num }}</p>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let num = ref(50);
    return {
      num,
    };
  },
}
</script>