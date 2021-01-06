<template>
  <div class="j-chip" :data-closable="closable">
    <svg-icon v-if="icon" :name="icon" />
    <slot></slot>
    <svg-icon v-if="closable" name="close" alt="close-circle" @click="$emit('close')" />
  </div>
</template>

<script lang="ts">
import SvgIcon from './SvgIcon.vue';

export default {
  props: {
    icon: String,
    closable: {
      type: Boolean,
      default: false,
    },
  },
  emit: ['close'],
  components: { SvgIcon },
};
</script>

<style lang="scss">
.j-chip {
  display: inline-flex;
  align-items: center;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  border-radius: 1rem;
  padding: 0.2rem 0.5rem;
  &[data-closable="true"] {
    padding-right: 0.15rem;
  }
  >.j-icon {
    vertical-align: middle;
  }
  > .j-icon:first-of-type {
    margin-right: 0.2rem;
  }
  > .j-icon:last-of-type {
    margin-left: 0.2rem;
  }
}
</style>