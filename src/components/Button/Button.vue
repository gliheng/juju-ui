<template>
  <button class="j-button" :class="{
    'is-flat': flat,
    'is-outlined': outlined,
    'is-raised': raised,
    'is-rounded': rounded,
    'is-icon': iconOnly,
    'is-right': iconPos == 'right',
    ['is-' + size]: size,
  }"
    :disabled="disabled"
    :type="type"
    v-ripple:center="iconOnly"
  >
    <j-spinner v-if="loading" />
    <svg-icon
      v-else-if="icon"
      :size="size"
      :name="icon"
    />
    <div class="j-seperator" v-if="iconWithText"></div>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';
import JSpinner from '../Spinner/Spinner.vue'
import ripple from '@directives/ripple';
import './Button.scss';

export default defineComponent({
  components: { SvgIcon, JSpinner },
  directives: {
    ripple,
  },
  props: {
    disabled: Boolean,
    flat: Boolean,
    outlined: Boolean,
    raised: Boolean,
    rounded: Boolean,
    size: String,
    icon: String,
    iconPos: String,
    loading: Boolean,
    type: {
      type: String as PropType<"button" | "submit" | "reset">,
      default: 'button',
    },
  },
  setup(props, { slots }) {
    let hasLabel = computed<boolean>(() => {
      return slots.default && (slots.default() as any).length != 0 || false;
    });
    let iconOnly = computed(() => {
      return !!(props.icon && !hasLabel.value);
    });
    let iconWithText = computed(() => {
      return !!((props.icon || props.loading) && hasLabel.value);
    });
    return {
      hasLabel, iconOnly, iconWithText,
    };
  },
});
</script>

<style src="./Button.scss"></style>