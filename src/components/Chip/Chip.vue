<template>
  <div class="j-chip" :data-closable="closable">
    <j-icon v-if="icon" :name="icon" />
    <slot></slot>
    <j-icon v-if="closable" name="close" alt="close-circle" @click="$emit('close')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JIcon from '../Icon/Icon.vue';

export default defineComponent({
  components: { JIcon },
  props: {
    icon: String,
    closable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
});
</script>

<style src="./Chip.scss"></style>