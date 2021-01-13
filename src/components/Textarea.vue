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
