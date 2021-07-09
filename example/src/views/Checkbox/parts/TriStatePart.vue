<template>
  <p>Do you like banana?</p>
  <p>
    <j-checkbox toggle-indeterminate v-model="triChecked">{{ triChecked === null ? 'Not sure' : triChecked ? 'Yes' : 'No' }}</j-checkbox>
  </p>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let triChecked = ref(false);
    return { triChecked };
  },
};
</script>
