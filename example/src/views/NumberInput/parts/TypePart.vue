<template>
  <j-space>
    <j-number-input v-model="num" />
    <j-number-input v-model="num" type="horizontal" />
    <j-number-input v-model="num" type="slider" />
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