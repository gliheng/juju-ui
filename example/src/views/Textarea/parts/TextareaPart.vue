<template>
  <j-textarea v-model="v" cols="40" rows="10" />
  <p>Current value: {{ v }}</p>
  <j-textarea v-model="v" cols="40" rows="10" disabled />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    let v = ref('');
    return { v };
  }  
}
</script>
