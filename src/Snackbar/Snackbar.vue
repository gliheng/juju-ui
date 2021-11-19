<template>
  <div class="j-snackbar" @click="$emit('dismiss')">
    <div>{{ title }}</div>
    <j-button v-if="closable" outlined @click="$emit('close')">OK</j-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JButton from '../Button/Button.vue';

export default defineComponent({
  components: { JButton },
  props: {
    title: String,
    closable: Boolean,
  },
});
</script>

<style src="./Snackbar.scss"></style>