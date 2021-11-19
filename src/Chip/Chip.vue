<template>
  <div class="j-chip" :data-closable="closable">
    <svg-icon v-if="icon" :name="icon" />
    <slot></slot>
    <svg-icon v-if="closable" name="close" alt="close-circle" @click="$emit('close')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';

export default defineComponent({
  components: { SvgIcon },
  props: {
    icon: String,
    closable: {
      type: Boolean,
      default: false,
    },
  },
  emit: ['close'],
});
</script>

<style src="./Chip.scss"></style>