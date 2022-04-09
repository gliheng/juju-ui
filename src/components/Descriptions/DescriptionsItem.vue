<template>
  <div class="j-descriptions-item">
    <div class="j-descriptions-label">{{ label }}</div>
    <div class="j-descriptions-value"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: String,
  },
});
</script>
