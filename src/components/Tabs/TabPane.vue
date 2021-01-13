<template>
  <div class="j-tab-pane" v-if="active"><slot></slot></div>
</template>

<script lang="ts">
import { computed, unref, getCurrentInstance, Ref } from 'vue';
import { useParent } from '../../utils/vue';

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

    let active = computed(() => {
      if (!parent || !parent.data) return false;
      let active = parent.data.active.value;
      if (!parent.children[active]) return false;
      return parent.children[active] == getCurrentInstance();
    });
    return { active };
  },
}
</script>
