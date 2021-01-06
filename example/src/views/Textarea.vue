<template>
  <div>
    <h1>Textarea</h1>
    <section>
      <j-textarea v-model="v" cols="40" rows="10" />
      <p>Current value: {{ v }}</p>
    </section>
    <section>
      <h2>Disabled</h2>
      <j-textarea v-model="v" cols="40" rows="10" disabled />
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let v = ref('');
    return { v };
  }  
}
</script>