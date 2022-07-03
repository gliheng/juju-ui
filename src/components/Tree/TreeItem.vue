<template>
  <div class="j-tree-item">
    <div
      v-if="itemSlot"
      class="j-tree-row"
      @click="toggle()"
      v-ripple
      :data-open="on"
    >
      <div v-for="i in level" class="j-tree-row-indent"></div>
      <svg-icon v-if="!isLeaf" class="j-tree-arrow" name="chevron-forward" />
      <item-slot :renderer="itemSlot" :args="{ item }" />
    </div>
    <div
      v-else-if="itemRenderer == 'default'"
      class="j-tree-row"
      @click="toggle()"
      v-ripple
      :data-open="on"
    >
      <div v-for="i in level" class="j-tree-row-indent"></div>
      <svg-icon v-if="!isLeaf" class="j-tree-arrow" name="chevron-forward" />
      <svg-icon v-if="item.icon" class="j-tree-icon" :name="item.icon" />
      <span>{{ item.label }}</span>
      <div class="j-spacer" />
    </div>
    <div
      v-else-if="itemRenderer == 'nav'"
      class="j-tree-row"
      @click="toggle()"
      v-ripple
      :data-open="on"
    >
      <div v-for="i in level" class="j-tree-row-indent"></div>
      <svg-icon v-if="item.icon" class="j-tree-icon" :name="item.icon" />
      <span>{{ item.label }}</span>
      <div class="j-spacer" />
      <svg-icon v-if="!isLeaf" class="j-tree-arrow" name="chevron-forward" />
    </div>
    <transition name="j-expand">
      <j-tree v-if="!isLeaf && on" :data="item.children" :level="level + 1" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, inject } from 'vue';
import SvgIcon from '@/SvgIcon/SvgIcon.vue';
import ripple from '@directives/ripple';
import { useSwitch } from '@utils/hooks';
import { treeInjectKey, TreeItemType } from './constants';
import ItemSlot from './ItemSlot';

export default defineComponent({
  components: { SvgIcon, ItemSlot },
  directives: { ripple },
  props: {
    level: Number,
    item: {
      type: Object as PropType<TreeItemType>,
      required: true,
    },
  },
  setup(props) {
    const { slots: treeSlots, itemRenderer } = inject(treeInjectKey)!;
    let [on, toggle] = useSwitch(false);
    let isLeaf = computed<boolean>(() => !props.item.children && !props.item?.getChildren);
    return {
      on, toggle, isLeaf,
      itemRenderer, 
      itemSlot: treeSlots.default,
    };
  },
});
</script>
