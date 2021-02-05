<template>
  <div>
    <h1>DateInput</h1>
    <section>
      <h2>Single date</h2>
      <j-date-input placeholder="Select start date" v-model="date" />
    </section>
    <section>
      <h2>Double date</h2>
      <j-date-range-input placeholder1="Start date" placeholder2="End date" v-model:startDate="startDate" v-model:endDate="endDate" />
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let date = ref();
    let startDate = ref();
    let endDate = ref();
    return {
      date, startDate, endDate,
    };
  }  
}
</script>