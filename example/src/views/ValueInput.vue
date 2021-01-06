<template>
  <div>
    <h1>ValueInput</h1>
    <section>
      <h2>Button type</h2>
      <j-value-input v-model="a" />
      <p>Value: {{ a }}</p>
    </section>
    <section>
      <h2>Set min, max and step</h2>
      <j-value-input v-model="c" :min="50" :max="100" :step="10" />
      <p>Value: {{ c }}</p>
    </section>
    <section>
      <h2>Slider type</h2>
      <j-value-input type="slider" v-model="b" />
      <p>Value: {{ b }}</p>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let a = ref(0), b = ref(0), c = ref(50);
    return {
      a, b, c,
    };
  }  
}
</script>