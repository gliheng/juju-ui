<template>
  <j-animated-icon:menu-toggle v-model="on" />
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