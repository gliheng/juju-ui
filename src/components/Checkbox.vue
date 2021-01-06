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

<style lang="scss">
.j-checkbox {
  display: inline-flex;
  align-items: center;
  .j-checkbox-check {
    border: 2px solid var(--neutral-color-light);
    border-radius: 3px;
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
    box-sizing: border-box;
    box-shadow: 0 0 3px inset rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s, border 0.2s;
    position: relative;
    overflow: hidden;
  }
  &:focus {
    outline: none;
    .j-checkbox-check {
      box-shadow: $outline;
    } 
  }
  &:hover {
    .j-checkbox-check {
      border-color: var(--primary-color);
    }
  }
  &[data-indeterminate="true"] {
    .j-checkbox-check {
      $w: 8px;
      $h: 2px;
      &:before {
        content: '';
        display: block;
        position: absolute;
        width: $w;
        height: $h;
        left: 50%;
        margin-left: -$w/2;
        top: 50%;
        margin-top: -$h/2;
        background-color: var(--primary-color);
      }
    }
  }
  &[data-checked="true"] {
    .j-checkbox-check {
      border-color: var(--primary-color);
      background-color: var(--primary-color);
      $w: 4px;
      $h: 8px;
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: $w;
        height: $h;
        margin-left: -$w/2-1px;
        margin-top: -$h/2;
        border: 2px solid var(--primary-color-text);
        border-left-width: 0;
        border-top-width: 0;
        border-radius: 0 0 2px 0;
        transform: translate(0px, -2px) rotateZ(45deg);
        transform-origin: center;
      }
    }
  }
}
</style>