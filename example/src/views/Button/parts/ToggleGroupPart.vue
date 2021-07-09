<template>
  <j-toggle-button-group v-model="toggleGroupIndex">
    <j-toggle-button>Primary</j-toggle-button>
    <j-toggle-button>Secondary</j-toggle-button>
    <j-toggle-button>Success</j-toggle-button>
  </j-toggle-button-group>
</template>


<script>
import { ref } from 'vue';

export default {
  setup() {
    let toggleGroupIndex = ref(0);
    return { toggleGroupIndex };
  },
};
</script>
