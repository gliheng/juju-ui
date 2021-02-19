<template functional>
  <div class="j-progress" :data-indeterminate="indeterminate" :data-striped="striped">
    <div class="j-progress-bar" :style="{width: `${length}%`}"></div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let length = computed(() => {
      if (props.indeterminate) return 40;
      return props.value;
    });
    return { length };
  },
};
</script>

<style src="../assets/styles/Progress.scss"></style>