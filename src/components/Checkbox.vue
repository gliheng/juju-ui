<template>
  <label class="j-checkbox" tabindex="0" :data-checked="checked" :data-indeterminate="indeterminate">
    <input type="checkbox" :name="name" :checked="checked" :indeterminate="indeterminate" hidden @change="onChange" />
    <i class="j-checkbox-check"></i>
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { computed, SetupContext } from 'vue';

export default {
  props: {
    name: String,
    value: [String, Number],
    toggleIndeterminate: Boolean,
    modelValue: [ Array, Boolean ],
  },
  emits: ['update:modelValue'],
  setup(props, { emit }: SetupContext) {
    let indeterminate = computed(() => props.modelValue === null);
    let checked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.indexOf(props.value) != -1
      }
      return props.modelValue === true;
    });
    function onChange(evt: Event) {
      if (props.toggleIndeterminate) {
        // tri state checkbox toggle 3 states
        let v;
        if (props.modelValue === false) {
          v = null;
        } else if (props.modelValue === null) {
          v = true;
        } else {
          v = false;
        }
        emit('update:modelValue', v);
      } else {
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
    }
    return { checked, onChange, indeterminate };
  },
}
</script>
