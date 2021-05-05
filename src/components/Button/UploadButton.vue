<template>
  <j-button icon="add" @click="onClick">
    <input class="j-upload-input" ref="fileInput" type="file" @change="$emit('select', $event)" :multiple="multiple" :accept="accept" :disabled="disabled" />
    <span>Upload</span>
  </j-button>
</template>

<script lang="ts">
import { ref } from 'vue';
import JButton from './Button.vue';

export default {
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
  emit: ['select'],
  setup(props) {
    let fileInput = ref();
    function onClick() {
      fileInput.value.click();
    }
    return { fileInput, onClick };
  },
  components: { JButton },
}
</script>

<style src="./UploadButton.scss"></style>