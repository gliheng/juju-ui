<template>
  <j-date-input placeholder="Select start date" v-model="date" />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let date = ref();
    return {
      date,
    };
  },
}
</script>
