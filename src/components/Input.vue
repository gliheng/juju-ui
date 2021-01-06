<template>
  <div class="j-input"
  :data-focus="focus"
  :data-disabled="disabled"
  :data-has-prepend="hasPrepend"
  :data-has-append="hasAppend"
  :data-can-clear="!!modelValue">
    <slot v-if="hasPrepend" name="prepend"></slot>
    <input :value="modelValue" @input="onInput" @focus="focus = true" @blur="focus = false" :disabled="disabled" />
    <slot v-if="hasAppend" name="append"></slot>
    <j-svg-icon v-if="clearable" class="j-input-clear" name="close" @mousedown.prevent @click="clearIpt" />
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext } from 'vue';
import JSvgIcon from './SvgIcon.vue';

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

<style lang="scss">
.j-input {
  display: inline-flex;
  border-radius: 3px;
  border: 1px solid var(--neutral-color-light);
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 16rem;
  align-items: center;
  > input {
    padding: 0.5rem;
    border: none;
    outline: none;
    background: none;
    flex: 1;
  }
  &[data-focus="true"] {
    box-shadow: $outline;
    border-color: var(--primary-color);
    outline: none;
    z-index: 1;
  }
  &:hover:not([data-disabled="true"]) {
    border-color: var(--primary-color);
  }
  &[data-disabled="true"] {
    background-color: #eee;
    cursor: not-allowed;
    > input {
      cursor: not-allowed;
    }
  }
  > .j-icon {
    margin: 0 0.5rem;
  }
  &[data-has-prepend="true"] {
    > input {
      margin-left: -0.5rem;
    }
  }
  &[data-has-append="true"] {
    > input {
      margin-right: -0.5rem;
    }
  }
  .j-input-clear {
    visibility: hidden;
    cursor: pointer;
  }
  &[data-can-clear="true"] {
    .j-input-clear {
      visibility: visible;
    }
  }
}
</style>