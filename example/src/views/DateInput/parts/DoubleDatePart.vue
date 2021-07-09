<template>
  <j-date-range-input placeholder1="Start date" placeholder2="End date" v-model:startDate="startDate" v-model:endDate="endDate" />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let startDate = ref();
    let endDate = ref();
    return {
      startDate, endDate,
    };
  },
}
</script>
