<template>
  <button class="j-button" :class="{
    'is-flat': flat,
    'is-outlined': outlined,
    'is-raised': raised,
    'is-rounded': rounded,
    'is-icon': iconOnly,
    'is-right': iconPos == 'right',
    ['is-' + size]: size,
  }" :disabled="disabled" v-ripple:center="iconOnly">
    <svg-icon v-if="icon" :name="icon"></svg-icon>
    <span v-if="iconWithText">&nbsp;</span>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, SetupContext } from 'vue';
import ripple from '../directives/ripple';
import SvgIcon from './SvgIcon.vue';

export default {
  props: {
    disabled: Boolean,
    flat: Boolean,
    outlined: Boolean,
    raised: Boolean,
    rounded: Boolean,
    size: String,
    icon: String,
    iconPos: String,
  },
  setup(props, { slots }: SetupContext) {
    let hasLabel = computed<boolean>(() => {
      return slots.default && (slots.default() as any).length != 0 || false;
    });
    let iconOnly = computed(() => {
      return !!(props.icon && !hasLabel.value);
    });
    let iconWithText = computed(() => {
      return !!(props.icon && hasLabel.value);
    });
    return {
      hasLabel, iconOnly, iconWithText,
    };
  },
  directives: {
    ripple,
  },
  components: { SvgIcon }
};
</script>

<style lang="scss">
.j-button {
  border: none;
  outline: none;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  box-sizing: border-box;
  user-select: none;
  direction: ltr;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, opacity 0.2s;
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  color: var(--primary-color-text);
  &.is-icon {
    padding: 0.5rem;
  }
  &.is-right {
    direction: rtl;
  }
  &:active:not([disabled]) {
    filter: brightness(80%);
  }
  &:focus {
    box-shadow: $outline;
    z-index: 1;
  }
  &:hover {
    opacity: 0.75;
  }
  &[disabled] {
    opacity: 0.5;
  }
  &.is-flat {
    background-color: transparent;
    color: var(--primary-color);
    border-color: transparent;
  }
  &.is-raised {
    box-shadow: $shadow;
    &:focus {
      box-shadow: $shadow, $outline;
    }
  }
  &.is-outlined {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    box-sizing: border-box;
  }
  &.is-rounded {
    border-radius: 2rem;
  }
  &.is-sm {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
  &.is-lg {
    font-size: 1.25rem;
    padding: 0.625rem 1.25rem;
  }
}
</style>