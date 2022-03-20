<template>
  <div class="j-tree-item">
    <div class="j-tree-row" @click="toggle()" v-ripple :data-open="on">
      <svg-icon v-if="icon" class="j-tree-icon" :name="icon" />
      <span>{{ label }}</span>
      <svg-icon v-if="!isLeaf" class="j-tree-arrow" name="chevron-forward" />
    </div>
    <transition name="j-expand">
      <j-tree v-if="!isLeaf && on" :data="children" :key-field="keyField" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';
import ripple from '@directives/ripple';
import { useSwitch } from '@utils/hooks';

export default defineComponent({
  components: { SvgIcon },
  directives: { ripple },
  props: {
    label: String,
    icon: String,
    keyField: String,
    children: Array,
  },
  setup(props) {
    let [on, toggle] = useSwitch(false);
    let isLeaf = computed<boolean>(() => !props.children);
    return {
      on, toggle, isLeaf,
    };
  },
});
</script>
