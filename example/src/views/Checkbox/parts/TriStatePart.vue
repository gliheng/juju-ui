<template>
  <p>Do you like banana?</p>
  <p>
    <j-checkbox
      class="check"
      :indeterminate="indeterminate"
      v-model="checked"
    >
      {{ indeterminate ? 'Not sure' : checked ? 'Yes' : 'No' }}
    </j-checkbox>
    <j-button @click="indeterminate = !indeterminate">Toggle indeterminate</j-button>
  </p>
</template>

<script setup>
import { ref } from 'vue';

let checked = ref(false);
let indeterminate = ref(false);
</script>

<style scoped>
.check {
  vertical-align: middle;
}
</style>