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
    <svg-icon v-if="icon" :size="size" :name="icon"></svg-icon>
    <span v-if="iconWithText">&nbsp;</span>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext } from 'vue';
import ripple from '../directives/ripple';
import SvgIcon from './SvgIcon.vue';

export default defineComponent({
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
});
</script>
