<template>
  <div>
    <h1>Calendar</h1>
    <div>
      <j-calendar v-model="date" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let date = ref();
    return { date };
  }
}
</script>
