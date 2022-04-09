<template>
  <div
    class="j-descriptions"
    :style="style"
    :data-direction="direction"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  props: {
    columns: {
      type: Number,
      default: 1,
    },
    minWidth: {
      type: Number,
      default: 200,
    },
    autoColumns: Boolean,
    direction: String as PropType<"vertical" | "horizontal">,
  },
  setup(props) {
    let style = computed(() => {
      let { autoColumns, columns, minWidth } = props;
      let colStyle;
      if (autoColumns) {
        colStyle = `repeat(auto-fit, minmax(${minWidth}px, 1fr))`;
      } else {
        colStyle = `repeat(${columns}, 1fr)`;
      }
      return {
        'grid-template-columns': colStyle,
      };
    });
    
    return {
      style,
    };
  },
});
</script>

<style lang="scss" src="./Descriptions.scss"></style>
