<template>
  <div>
    <j-button @click="openDrawer('left')" icon="arrow-back"></j-button>
    <j-button @click="openDrawer('top')" icon="arrow-up"></j-button>
    <j-button @click="openDrawer('right')" icon="arrow-forward"></j-button>
    <j-button @click="openDrawer('bottom')" icon="arrow-down"></j-button>
    <j-drawer v-model="open" :side="side">
      Drawer content
    </j-drawer>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let open = ref(false), side = ref('left');
    function openDrawer(_side) {
      open.value = !open.value;
      side.value = _side;
    }
    return { open, side, openDrawer };
  }  
}
</script>

<style scoped>
div :deep(.j-button) {
  margin: 0.2rem;
}
</style>