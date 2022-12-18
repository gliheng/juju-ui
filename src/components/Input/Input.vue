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
      :type="iptType"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
      @focus="focus = true; $emit('focus', $event)"
      @blur="focus = false; $emit('blur', $event)"
    />
    <div v-if="hasAppend" class="j-input-append">
      <slot name="append"></slot>
    </div>
    <j-icon
      v-if="clearable"
      class="j-input-clear"
      name="close"
      @mousedown.prevent
      @click="clearIpt" />
    <j-icon
      v-if="showPassword"
      class="j-input-show-password"
      :name="revealing ? 'eye-off-outline' : 'eye-outline'"
      v-on="revealingEvents" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import JIcon from '../Icon/Icon.vue';

export default defineComponent({
  components: { JIcon },
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
    type: String,
    showPassword: {
      type: String as PropType<'mousedown' | 'click'>,
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

    let revealing = ref(false);
    let iptType = computed(() => {
      if (props.type == 'password') {
        return revealing.value ? 'text' : 'password';
      }
      return props.type;
    });
    let revealingEvents = computed(() => {
      if (props.showPassword == 'click') {
        return {
          click() {
            revealing.value = !revealing.value;
          },
        };
      } else if (props.showPassword == 'mousedown') {
        return {
          mousedown() {
            revealing.value = true;
            document.addEventListener('mouseup', () => {
              revealing.value = false;
            }, {
              once: true,
            });
          },
        };
      }
    });

    return {
      focus,
      onInput,
      hasPrepend,
      hasAppend,
      clearIpt,
      iptRef,
      iptType,
      revealing,
      revealingEvents,
    };
  },
});
</script>

<style src="./Input.scss"></style>