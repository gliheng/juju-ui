<template>
  <div :class="['j-snackbar', themeClass]"
    @click="$emit('dismiss')"
  >
    <j-icon
      v-if="icon"
      class="j-snackbar-icon"
      :name="icon" />
    <div class="j-snackbar-label">{{ title }}</div>
    <j-button
      v-if="closable"
      class="j-snackbar-close"
      outlined
      @click="$emit('close')"
    >OK</j-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import JButton from '@/Button/Button.vue';
import JIcon from '@/Icon/Icon.vue';

export default defineComponent({
  components: { JButton, JIcon },
  props: {
    title: String,
    closable: Boolean,
    theme: String as PropType<'success' | 'info' | 'warning' | 'danger' | 'help'>,
    icon: String,
  },
  setup(props) {
    let themeClass = computed(() => props.theme && `j-${props.theme}`);
    return {
      themeClass,
    };
  },
});
</script>

<style src="./Snackbar.scss"></style>
