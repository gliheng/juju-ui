<template>
  <li class="j-listbox-item" :class="{ 'j-active': active }" v-ripple>
    <svg-icon class="j-listbox-icon" v-if="icon" :name="icon" />
    <span><slot></slot></span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';
import ripple from '@directives/ripple';

export default defineComponent({
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
});
</script>
