<template>
  <j-button @click="toggle" :icon="on ? onIcon : offIcon" :outlined="!on">
    <slot v-if="hasAlt && on" name="on"></slot>
    <slot v-else-if="hasAlt" name="off"></slot>
    <slot v-else></slot>
  </j-button>
</template>

<script lang="ts">
import { computed, inject, SetupContext, Ref } from 'vue';
import { useSwitch } from '../../utils/vue';

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    onIcon: String,
    offIcon: String,
  },
  emit: ['update:modelValue'],
  setup(props, { emit, slots }: SetupContext) {
    let hasAlt = computed(() => {
      return slots.on && slots.off;
    });
    let on = computed(() => {
      return props.modelValue;
    });
    function toggle() {
      emit('update:modelValue', !props.modelValue)
    } 
    return { on, toggle, hasAlt };
  }
}
</script>
