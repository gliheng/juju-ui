<template>
  <transition-group class="j-snackbar-manager" name="j-list" tag="div" v-if="snackbars.length != 0">
    <j-snackbar v-for="item in snackbars"
      :key="item.timestamp"
      :title="item.title"
      :closable="!item.timeout"
      @close="hideSnackbar(item)" />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JSnackbar from '@/Snackbar/Snackbar.vue';

interface SnackbarItem {
  title: string;
  timestamp: number;
  timeout?: number;
}

export default defineComponent({
  components: { JSnackbar },
  data() {
    return {
      snackbarTimer: undefined as ReturnType<typeof setTimeout> | undefined,
      snackbars: [] as Array<SnackbarItem>,
    };
  },
  methods: {
    showSnackbar(args: {
      title: string;
      timeout?: number;
    }) {
      let item = {
        ...args,
        timestamp: Date.now(),
      };
      this.snackbars.push(item);
      if (args && args.timeout) {
        
        this.snackbarTimer = setTimeout(this.hideSnackbar.bind(this, item), args.timeout);
      }
    },
    hideSnackbar(which: SnackbarItem) {
      let idx = this.snackbars.indexOf(which);
      if (idx != -1) {
        this.snackbars.splice(idx, 1);
      }
    },
  },
});
</script>
