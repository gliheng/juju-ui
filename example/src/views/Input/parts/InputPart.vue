<template>
  <p>
    <j-input placeholder="Username" v-model="v" />
  </p>
  <p>
    <j-input placeholder="Username" v-model="v" disabled />
  </p>
  <p>Current value: {{ v }}</p>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let v = ref('');
    return { v };
  },
}
</script>