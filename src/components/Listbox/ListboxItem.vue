<template>
  <li class="j-listbox-item" :class="{ 'j-active': active }" v-ripple>
    <j-icon class="j-listbox-icon" v-if="icon" :name="icon" />
    <span><slot></slot></span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JIcon from '../Icon/Icon.vue';
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
    JIcon,
  },
  directives: { ripple },
});
</script>
