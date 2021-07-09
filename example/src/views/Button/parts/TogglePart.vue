<template>
  <j-toggle-button on-icon="heart" off-icon="heart-dislike" v-model="toggleOn">
    <template #on>Like</template>
    <template #off>Dislike</template>
  </j-toggle-button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let toggleOn = ref(false);
    return { toggleOn };
  },
};
</script>
