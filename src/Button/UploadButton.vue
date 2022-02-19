<template>
  <j-button icon="add" @click="onClick">
    <input
      ref="fileInput"
      class="j-upload-input"
      type="file"
      @change="$emit('select', $event)"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
    />
    <span>Upload</span>
  </j-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import JButton from './Button.vue';

export default defineComponent({
  components: { JButton },
  props: {
    accept: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select'],
  setup() {
    let fileInput = ref();
    function onClick() {
      fileInput.value.click();
    }
    return { fileInput, onClick };
  },
});
</script>

<style src="./UploadButton.scss"></style>