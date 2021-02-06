<template>
  <div class="j-switch" :class="{'j-on': on}" @click="toggle" tabindex="0">
    <div class="j-knob"></div>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from 'vue';
import { useSwitch } from '../utils/hooks';

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
