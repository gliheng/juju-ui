<template>
  <div class="j-input"
  :data-focus="focus"
  :data-disabled="disabled"
  :data-has-prepend="hasPrepend"
  :data-has-append="hasAppend"
  :data-can-clear="!!modelValue">
    <div v-if="hasPrepend" class="j-input-prepend">
      <slot name="prepend"></slot>
    </div>
    <input v-if="modelValue === undefined"
      @input="onInput" @focus="focus = true" @blur="focus = false"
      :disabled="disabled" v-bind="$attrs" />
    <input v-else :value="modelValue"
      @input="onInput" @focus="focus = true" @blur="focus = false"
      :disabled="disabled" v-bind="$attrs" />
    <div v-if="hasAppend" class="j-input-append">
      <slot name="append"></slot>
    </div>
    <j-svg-icon v-if="clearable" class="j-input-clear" name="close" @mousedown.prevent @click="clearIpt" />
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext } from 'vue';
import JSvgIcon from '../SvgIcon.vue';

export default {
  props: {
    modelValue: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }: SetupContext) {
    function onInput(evt: InputEvent) {
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
    return { focus, onInput, hasPrepend, hasAppend, clearIpt };
  },
  components: { JSvgIcon},
};
</script>
