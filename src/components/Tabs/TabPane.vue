<template>
  <div class="j-tab-pane" v-if="active"><slot></slot></div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, Ref } from 'vue';
import { useParent } from '../../utils/hooks';

export const TabPaneSymbol = Symbol('TabPaneSymbol');

export default {
  props: {
    label: String,
    icon: String,
    closable: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    let parent = useParent<{ active: Ref<number> }>(TabPaneSymbol);
    let inst = getCurrentInstance();
    let active = computed(() => {
      if (!parent || !parent.data) return false;
      let active = parent.data.active.value;
      if (!parent.children[active]) return false;
      return parent.children[active] == inst;
    });
    return { active };
  },
}
</script>
