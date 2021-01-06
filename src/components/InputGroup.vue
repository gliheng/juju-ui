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

<style lang="scss">
.j-input-group {
  display: flex;
  align-items: stretch;
  white-space: nowrap;
  > .j-input-group-left-addons, > .j-input-group-right-addons {
    .j-button {
      margin: 0;
      height: 100%;
    }
  }
  > .j-input-group-left-addons {
    .j-button {
      border-radius: 0;
      &:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
    }
  }
  > .j-input-group-right-addons {
    .j-button {
      border-radius: 0;
      &:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
  }
  > .j-input {
    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>