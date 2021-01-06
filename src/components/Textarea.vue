<template>
  <textarea class="j-textarea" :value="modelValue" :disabled="disabled" @input="onInput"></textarea>
</template>

<script lang="ts">
import { SetupContext } from 'vue';

export default {
  props: {
    modelValue: String,
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  setup(_, context: SetupContext) {
    function onInput(evt: InputEvent) {
      context.emit('update:modelValue', (evt.target as HTMLInputElement).value);
    }
    return { onInput };
  },
}
</script>

<style lang="scss">
.j-textarea {
  padding: 0.5rem;
  border: 1px solid var(--neutral-color-light);
  border-radius: 3px;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus:not([disabled]) {
    box-shadow: $outline;
    border-color: var(--primary-color);
    outline: none;
  }
  &[disabled] {
    background-color: #eee;
    cursor: not-allowed;
  }
}
</style>
