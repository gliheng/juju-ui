<template>
  <main>
    <j-pop-select
      v-model="selected"
      label="Location"
      :side="side"
      :trigger="trigger"
      :options="options"
      @search="search"
      show-input
    />
  </main>
</template>

<script setup>
import { ref } from 'vue';

let side = ref('bottom');
let trigger = ref('click');
let selected = ref();

const defaultOptions = [
  {label: 'Bei Jing', value: 'bj'},
  {label: 'Shang Hai', value: 'sh'},
  {label: 'Shen Zhen', value: 'sz'},
];
const options = ref(defaultOptions);

function search(v) {
  options.value = defaultOptions.filter(e => e.label.startsWith(v));
}
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
.confirm {
  width: 350px;
}
</style>