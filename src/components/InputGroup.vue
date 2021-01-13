<template>
  <div class="j-input-group" ref="el">
    <i class="j-input-group-left-addons" v-if="hasLeftAddon"><slot name="left"></slot></i>
    <j-input />
    <i class="j-input-group-right-addons" v-if="hasRightAddon"><slot name="right"></slot></i>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext, onMounted } from 'vue';
import Input from './Input.vue';

export default {
  setup(_, context: SetupContext) {
    let el = ref<HTMLElement | null>(null);
    let hasLeftAddon = computed(() => {
      return !!context.slots.left;
    });
    let hasRightAddon = computed(() => {
      return !!context.slots.right;
    });
    onMounted(() => {
      el.value!.addEventListener('click', function(evt) {
        console.log('el:', evt.target);
      });
    });
    return { el, hasLeftAddon, hasRightAddon };
  },
  components: { JInput: Input },
};
</script>
