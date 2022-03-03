<template>
  <div class="j-chip-editor">
    <div class="j-input"
      :data-focus="focus"
      @click="focusOnInput">
      <j-chip v-for="(tag, idx) in modelValue" v-bind:key="idx" closable
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
import { defineComponent, ref, computed, PropType } from 'vue';
import JChip from './Chip.vue';

export default defineComponent({
  components: { JChip },
  props: {
    placeholder: String,
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    let ipt = ref<HTMLElement>();
    let value = ref('');
    let focus = ref(false);

    let placeholderText = computed(() => {
      if (value.value || props.modelValue.length) return '';
      return props.placeholder;
    });

    function focusOnInput() {
      ipt.value?.focus();
    }

    function removeTagAt(i: number) {
      changeValue((tags) => {
        tags.splice(i, 1);
      });
    }

    function onKeyPress(evt: KeyboardEvent) {
      if (evt.key == 'Enter') {
        if (!value.value) return;
        changeValue((tags) => {
          tags.push(value.value);
        });
        value.value = '';
      }
    }

    function onKeyDown(evt: KeyboardEvent) {
      if (evt.key == 'Backspace' && value.value == '') {
        changeValue((tags) => {
          tags.pop();
        });
      }
    }

    function onFocus() {
      focus.value = true;
    }

    function changeValue(cb: (arr: string[]) => void) {
      let tags = props.modelValue.slice();
      cb(tags);
      emit('update:modelValue', tags);
    }

    function onBlur() {
      if (value.value) {
        changeValue((tags) => {
          tags.push(value.value);
        });
        value.value = '';
      }
      focus.value = false;
    }

    return {
      value, ipt, placeholderText,
      removeTagAt, onKeyDown, onKeyPress,
      focus, onFocus, onBlur, focusOnInput,
    };
  },
});
</script>

<style src="./ChipEditor.scss" lang="scss"></style>