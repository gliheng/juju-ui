<template>
  <div class="j-animated-icon j-menu-toggle"
    :data-on="modelValue"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <div class="j-line" />
    <div class="j-line"/>
    <div class="j-line" />
    <div class="j-tri" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: Boolean,
  },
  emits: ['update:modelValue'],
});
</script>

<style lang="scss" src="./AnimatedIcon.scss"></style>
