<template>
  <main>
    <j-pop-select
      v-model="selected"
      label="Location"
      :side="side"
      :trigger="trigger"
      :options="options"
    />
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';

let side = ref('bottom');
let trigger = ref('click');
let selected = ref();

const options = reactive([
  {label: 'Bei Jing', value: 'bj'},
  {label: 'Shang Hai', value: 'sh'},
  {label: 'Shen Zhen', value: 'sz'},
]);
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