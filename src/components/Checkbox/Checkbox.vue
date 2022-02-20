<template>
  <label class="j-checkbox" :tabindex="0"
    :data-checked="!indeterminate && checked"
    :data-indeterminate="indeterminate"
  >
    <input
      type="checkbox"
      :name="name"
      :checked="checked"
      :indeterminate="indeterminate"
      hidden
      @change="onChange"
    />
    <i class="j-checkbox-check"></i>
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    name: String,
    value: [String, Number],
    indeterminate: {
      type: Boolean,
      default: false,
    },
    modelValue: [ Array, Boolean ],
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    let checked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.indexOf(props.value) != -1
      }
      return props.modelValue === true;
    });

    function onChange(evt: Event) {
      if (props.indeterminate) return;
      if (Array.isArray(props.modelValue)) {
        if (checked.value) {
          let idx = props.modelValue.indexOf(props.value);
          if (idx != -1) {
            props.modelValue.splice(idx, 1);
          }
        } else {
          props.modelValue.push(props.value);
        }
      } else {
        emit('update:modelValue', !checked.value);
      }
    }

    return { checked, onChange };
  },
});
</script>

<style src="./Checkbox.scss" lang="scss"></style>