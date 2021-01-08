<template>
  <li class="j-listbox-item" :class="{ 'j-active': active }" v-ripple>
    <svg-icon class="j-listbox-icon" v-if="icon" :name="icon" /><slot></slot>
  </li>
</template>

<script lang="ts">
import SvgIcon from './SvgIcon.vue';
import ripple from '../directives/ripple';

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    icon: String,
  },
  components: {
    SvgIcon,
  },
  directives: { ripple },
};
</script>

<style lang="scss">
.j-listbox-item {
  position: relative;
  overflow: hidden;
  margin: 0;
  border-radius: 3px;
  padding: $margin 2*$margin;
  cursor: default;
  &:hover {
    background-color: var(--primary-color-lighter);
  }
  &.j-active {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
  }
  .j-listbox-icon {
    margin-right: $margin;
  }
}
</style>

