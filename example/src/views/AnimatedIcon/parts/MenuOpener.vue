<template>
  <j-animated-icon:menu-opener v-model="on" />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let on = ref(false);
    return { on };
  },
}
</script>