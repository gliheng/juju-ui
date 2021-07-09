<template>
  <j-input placeholder="Username" v-model="v">
    <template #prepend>
      <j-svg-icon name="alarm" />
    </template>
    <template #append>
      <j-svg-icon name="arrow-forward" />
    </template>
  </j-input>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let v = ref('');
    return { v };
  },
}
</script>