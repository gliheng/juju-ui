<template>
  <div class="j-chip" :data-closable="closable">
    <svg-icon v-if="icon" :name="icon" />
    <slot></slot>
    <svg-icon v-if="closable" name="close" alt="close-circle" @click="$emit('close')" />
  </div>
</template>

<script lang="ts">
import SvgIcon from '../SvgIcon/SvgIcon.vue';

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

<style src="./Chip.scss"></style>