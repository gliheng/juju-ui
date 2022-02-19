<template>
  <j-space>
    <j-number-input v-model="num" :min="0" :max="100" type="slider" />
  </j-space>
  <div>
    <p>Value: {{ num }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let num = ref(0);
    return {
      num,
    };
  },
}
</script>