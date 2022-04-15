<template>
  <div :class="['j-input', wrapperClass]"
    :data-focus="focus"
    :data-disabled="disabled"
    :data-has-prepend="hasPrepend"
    :data-has-append="hasAppend"
    :data-can-clear="!!modelValue"
  >
    <div v-if="hasPrepend" class="j-input-prepend">
      <slot name="prepend"></slot>
    </div>
    <input
      ref="iptRef"
      v-bind="$attrs"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
      @focus="focus = true; $emit('focus', $event)"
      @blur="focus = false; $emit('blur', $event)"
    />
    <div v-if="hasAppend" class="j-input-append">
      <slot name="append"></slot>
    </div>
    <svg-icon
      v-if="clearable"
      class="j-input-clear"
      name="close"
      @mousedown.prevent
      @click="clearIpt" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';

export default defineComponent({
  components: { SvgIcon },
  props: {
    modelValue: String,
    wrapperClass: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  inheritAttrs: false,
  emits: ['update:modelValue', 'focus', 'blur'],
  setup(props, { slots, emit, expose }) {
    let iptRef = ref<HTMLInputElement>();
    expose({
      focus() {
        iptRef.value!.focus();
      },
      get input() {
        return iptRef.value;
      },
    });
    function onInput(evt: Event) {
      emit('update:modelValue', (evt.target as HTMLInputElement).value);
    }
    let hasPrepend = computed(() => {
      return !!slots.prepend;
    });
    let hasAppend = computed(() => {
      return !!slots.append || props.clearable;
    });
    let focus = ref(false);
    function clearIpt() {
      emit('update:modelValue', '');
    }
    return { focus, onInput, hasPrepend, hasAppend, clearIpt, iptRef };
  },
});
</script>

<style src="./Input.scss"></style>