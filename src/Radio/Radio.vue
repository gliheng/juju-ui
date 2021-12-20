<template>
  <label class="j-radio" :tabindex="0" :data-checked="checked">
    <input type="radio" :name="name" :value="modelValue" :checked="checked" hidden @change="onChange">
    <i class="j-radio-disc"></i>
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    name: String,
    value: null,
    modelValue: null,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    let checked = computed(() => props.modelValue == props.value);
    function onChange(evt: Event) {
      emit('update:modelValue', props.value);
    }
    return { onChange, checked };
  },
});
</script>

<style src="./Radio.scss"></style>