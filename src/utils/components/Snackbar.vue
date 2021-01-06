<template>
  <div class="j-snackbar" @click="$emit('dismiss')">
    <div>{{title}}</div>
    <j-button v-if="closable" outlined @click="$emit('close')">OK</j-button>
  </div>
</template>

<script>
import JButton from '../../components/Button.vue';

export default {
  props: {
    title: String,
    closable: Boolean,
  },
  components: { JButton },
}
</script>

<style lang="scss">
.j-snackbar {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 3px;
  margin-top: 1rem;
  cursor: default;
  box-shadow: $shadow;
  background-color: var(--background-color);
  div {
    flex: 1;
    max-width: 40vw;
    width: max-content;
    overflow-wrap: break-word;
    text-align: left;
  }
  .j-button {
    margin: 0;
    margin-left: 10px;
  }
}
</style>