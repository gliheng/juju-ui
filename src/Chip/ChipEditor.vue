<template>
  <div class="j-chip-editor">
    <div class="j-input"
      :data-focus="focus"
      @click="focusOnInput">
      <j-chip v-for="(tag, idx) in tags" v-bind:key="idx" closable
        @close="removeTagAt(idx)" @mousedown.prevent>{{ tag }}</j-chip>
      <input type="text" v-model="value"
        ref="ipt"
        :placeholder="placeholderText"
        @focus="onFocus"
        @blur="onBlur"
        @keypress="onKeyPress"
        @keydown="onKeyDown">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import JChip from './Chip.vue';

export default defineComponent({
  components: { JChip },
  props: {
    placeholder: String,
  },
  setup(props) {
    let ipt = ref<HTMLElement>();
    let value = ref('');
    let focus = ref(false);
    let tags = reactive<Array<string>>([]);

    let placeholderText = computed(() => {
      if (value.value || tags.length) return '';
      return props.placeholder;
    });

    function focusOnInput() {
      ipt.value?.focus();
    }

    function removeTagAt(i: number) {
      tags.splice(i, 1);
    }

    function onKeyPress(evt: KeyboardEvent) {
      if (evt.key == 'Enter') {
        if (!value.value) return;
        tags.push(value.value);
        value.value = '';
      }
    }

    function onKeyDown(evt: KeyboardEvent) {
      if (evt.key == 'Backspace' && value.value == '') {
        tags.pop();
      }
    }

    function onFocus() {
      focus.value = true;
    }

    function onBlur() {
      if (value.value) {
        tags.push(value.value);
        value.value = '';
      }
      focus.value = false;
    }

    return {
      value, tags, ipt, placeholderText,
      removeTagAt, onKeyDown, onKeyPress,
      focus, onFocus, onBlur, focusOnInput,
    };
  },
});
</script>

<style src="./ChipEditor.scss" lang="scss"></style>