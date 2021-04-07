<template>
  <transition-group class="j-snackbar-manager" name="j-list" tag="div" v-if="snackBars.lengh != 0">
    <j-snackbar v-for="item in snackBars"
      :key="item.timestamp"
      :title="item.title"
      :closable="!item.timeout"
      @close="hideSnackbar(item)" />
  </transition-group>
</template>

<script>
import JSnackbar from '../../components/Snackbar.vue';

export default {
  data() {
    return {
      snackBars: [],
    };
  },
  methods: {
    showSnackbar(args) {
      args.timestamp = Date.now();
      this.snackBars.push(args);
      if (args && args.timeout) {
        this.snackBarTimer = setTimeout(this.hideSnackBar.bind(this, args), args.timeout);
      }
    },
    hideSnackbar(which) {
      let idx = this.snackBars.indexOf(which);
      if (idx != -1) {
        this.snackBars.splice(idx, 1);
      }
    },
  },
  components: { JSnackbar },
}
</script>
