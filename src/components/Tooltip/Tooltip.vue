<template>
  <j-popover>
    <slot />
    <template #popover>
      {{ title }}
    </template>
  </j-popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: String,
  },
});
</script>
