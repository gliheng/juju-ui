<template>
  <j-popover v-bind="$attrs">
    <slot />
    <template #popover>
      {{ title }}
    </template>
  </j-popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  props: {
    title: String,
  },
});
</script>
