<template>
  <p>Do you like apple?</p>
  <p>
    <j-checkbox v-model="checked">{{ checked ? 'Yes' : 'No' }}</j-checkbox>
  </p>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let checked = ref(false);
    return { checked };
  },
};
</script>
