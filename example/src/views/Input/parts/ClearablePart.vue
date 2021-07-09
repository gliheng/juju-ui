<template>
  <j-input placeholder="Username" clearable v-model="v">
    <template #prepend>
      <j-svg-icon name="search" />
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