<template>
  <j-date-range-input placeholder1="Start date" placeholder2="End date" v-model:startDate="startDate" v-model:endDate="endDate" />
</template>

<script setup>
import { ref } from 'vue';

let startDate = ref();
let endDate = ref();
</script>
