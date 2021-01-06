<template>
  <div>
    <h1>Slider</h1>
    <section>
      <h2>Basic slider</h2>
      <j-slider v-model="a" />
      <p>Value: {{ a }}</p>
    </section>
    <section>
      <h2>Set min, max and step</h2>
      <j-slider :min="100" :max="1000" :step="100" v-model="b" />
      <p>Value: {{ b }}</p>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let a = ref(0), b = ref(100);
    return { a, b };
  }
}
</script>