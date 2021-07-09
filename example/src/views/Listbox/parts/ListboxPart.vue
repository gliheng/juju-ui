<template>
  <div class="box">
    <j-listbox>
      <j-listbox-item v-for="(item, i) in items" :key="item.label"
      @click="active = i"
      :icon="item.icon" :active="i == active">{{ item.label }}</j-listbox-item>
    </j-listbox>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let active = ref(0);
    return {
      items: [{
        icon: 'airplane', label: 'Airplane',
      }, {
        icon: 'car', label: 'Car',
      }, {
        icon: 'bicycle', label: 'Bicycle',
      }, {
        icon: 'bus', label: 'Bus',
      }],
      active,
    }
  }
}
</script>

<style scoped>
.box {
  width: 200px;
}
</style>