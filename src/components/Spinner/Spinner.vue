<template>
  <div class="j-spinner" :data-size="size"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      type: String,
      default: 'sm',
      validator(v: string) {
        return v == 'sm' || v == 'md' || v == 'lg';
      },
    },
  }
});
</script>

<style src="./Spinner.scss"></style>