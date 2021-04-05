<template>
  <div class="j-input-group">
    <i class="j-input-group-left-addons" v-if="hasLeftAddon"><slot name="left"></slot></i>
    <j-input v-bind="$attrs" />
    <i class="j-input-group-right-addons" v-if="hasRightAddon"><slot name="right"></slot></i>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Input from './Input.vue';

export default defineComponent({
  inheritAttrs: false,
  setup(_, context) {
    let hasLeftAddon = computed(() => {
      return !!context.slots.left;
    });
    let hasRightAddon = computed(() => {
      return !!context.slots.right;
    });
    return { hasLeftAddon, hasRightAddon };
  },
  components: { JInput: Input },
});
</script>

<style src="../../assets/styles/InputGroup.scss"></style>