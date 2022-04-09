<template>
  <div>{{ label }}</div>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: String,
  },
  setup() {
    
  },
});
</script>
