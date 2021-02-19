<template>
  <div class="j-spinner" :data-size="size"></div>
</template>

<script lang="ts">
export default {
  props: {
    size: {
      type: String,
      default: 'sm',
      validator(v: string) {
        return v == 'sm' || v == 'md' || v == 'lg';
      },
    },
  }
}
</script>

<style src="../assets/styles/Spinner.scss"></style>