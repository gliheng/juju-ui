<template>
  <label class="j-radio" tabindex="0" :data-checked="checked">
    <input type="radio" :name="name" :value="modelValue" :checked="checked" hidden @change="onChange">
    <i class="j-radio-disc"></i>
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
  props: {
    name: String,
    value: null,
    modelValue: null,
  },
  emit: ['update:modelValue'],
  setup(props, { emit }) {
    let checked = computed(() => props.modelValue == props.value);
    function onChange(evt: Event) {
      emit('update:modelValue', props.value);
    }
    return { onChange, checked };
  },
};
</script>

<style src="../assets/styles/Radio.scss"></style>