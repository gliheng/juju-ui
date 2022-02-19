<template>
  <div class="j-form-item" :data-error="Boolean(error)" :class="{'j-danger': error}">
    <div class="j-form-item-label">
      {{ label }}
    </div>
    <div class="j-form-item-content">
      <slot></slot>
      <span class="error" v-if="error">{{ error.message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useParent } from '../utils/hooks';
import { getField } from '../utils/object';
import { FormSymbol } from './const';


export default defineComponent({
  props: {
    label: String,
    field: String,
    rules: [Object, Array],
  },
  setup(props) {
    let parent = useParent(FormSymbol);
    if (parent === undefined) {
      throw 'j-form is needed';
    }

    let error = computed(
      () => getField(parent?.data?.errors.value, props.field)
    );

    return {
      error,
    };
  }
});
</script>
