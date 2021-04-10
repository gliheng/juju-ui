<template>
  <textarea class="j-textarea" :value="modelValue" @input="onInput"
    :placeholder="placeholder" :disabled="disabled"
    :autofocus="autofocus" :autocomplete="autocomplete" ></textarea>
</template>

<script lang="ts">
export default {
  props: {
    modelValue: String,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: '',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    function onInput(evt: InputEvent) {
      emit('update:modelValue', (evt.target as HTMLInputElement).value);
    }
    return { onInput };
  },
}
</script>

<style src="../assets/styles/Textarea.scss"></style>