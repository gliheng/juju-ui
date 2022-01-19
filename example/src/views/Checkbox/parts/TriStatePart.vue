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

<script>
import { ref } from 'vue';

export default {
  setup() {
    let checked = ref(false);
    let indeterminate = ref(false);
    return { checked, indeterminate };
  },
};
</script>

<style>
.check {
  vertical-align: middle;
}
</style>