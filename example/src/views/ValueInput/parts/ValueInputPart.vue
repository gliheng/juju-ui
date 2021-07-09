<template>
  <j-value-input v-model="num" />
  <p>Value: {{ num }}</p>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let num = ref(0);
    return {
      num
    };
  },
}
</script>