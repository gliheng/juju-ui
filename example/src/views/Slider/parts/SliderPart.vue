<template>
  <j-slider v-model="v" />
  <p>Value: {{ v }}</p>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let v = ref(0);
    return { v };
  }
}
</script>