<template>
  <nav class="j-scaffold-nav">
    <div class="j-scaffold-appbar j-shadow-1">
      <slot v-if="$slots['title']" name="title"></slot>
      <span v-else>{{ title }}</span>
    </div>
    <slot></slot>
  </nav>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
});
</script>
