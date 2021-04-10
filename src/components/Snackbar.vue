<template>
  <div class="j-snackbar" @click="$emit('dismiss')">
    <div>{{title}}</div>
    <j-button v-if="closable" outlined @click="$emit('close')">OK</j-button>
  </div>
</template>

<script>
import JButton from './Button.vue';

export default {
  props: {
    title: String,
    closable: Boolean,
  },
  components: { JButton },
}
</script>

<style src="../assets/styles/Snackbar.scss"></style>