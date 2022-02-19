<template>
  <div class="j-radio-group">
    <j-radio
      v-for="opt in options"
      :key="String(opt.value)"
      :value="opt.value"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      {{ opt.label }}
    </j-radio>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import JRadio from './Radio.vue';

export default defineComponent({
  components: { JRadio },
  props: {
    options: Array as PropType<{ label: string; value: string | number | boolean }[]>,
    modelValue: [String, Number, Boolean],
  },
  emits: ['update:modelValue'],
});
</script>

<style lang="scss" src="./Radio.scss"></style>
