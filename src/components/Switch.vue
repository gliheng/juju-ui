<template>
  <div class="j-switch" :class="{'j-on': on}" @click="toggle" tabindex="0">
    <div class="j-knob"></div>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from 'vue';
import { useSwitch } from '../utils/vue';

export default {
  props: {
    modelValue: Boolean,
  },
  setup(props, { emit }: SetupContext) {
    let [on, toggleValue] = useSwitch(props.modelValue);

    function toggle() {
      toggleValue();
      emit('update:modelValue', on.value);
    }

    return {
      on, toggle,
    };
  }
};
</script>

<style lang="scss">
.j-switch {
  display: inline-flex;
  align-items: center;
  width: 3rem;
  height: 1.75rem;
  border-radius: 0.875rem;
  background-color: #ccc;
  transition: background-color 0.2s, box-shadow 0.2s;
  outline: none;
  &:focus {
    box-shadow: $outline;
  }
  .j-knob {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 0.125rem;
    border-radius: 50%;
    background-color: var(--primary-color-text);
    transition: transform 0.2s;
  }
  &.j-on {
    background-color: var(--primary-color);
    .j-knob {
      transform: translateX(1.25rem);
    }
  }
}
</style>