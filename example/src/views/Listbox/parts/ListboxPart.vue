<template>
  <div class="box">
    <j-listbox>
      <j-listbox-item
        v-for="(item, i) in items"
        :key="item.label"
        :icon="item.icon"
        :active="i == active"
        @click="active = i"
      >
        {{ item.label }}
      </j-listbox-item>
    </j-listbox>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let active = ref(0);
const items = [
  {
    icon: 'airplane', label: 'Airplane',
  },
  {
    icon: 'car', label: 'Car',
  },
  {
    icon: 'bicycle', label: 'Bicycle',
  },
  {
    icon: 'bus', label: 'Bus',
  },
];
</script>

<style scoped>
.box {
  width: 200px;
}
</style>
