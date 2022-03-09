<template>
  <div>
    <h1>Drawer</h1>
    <code-block :code="drawerPartCode">
      <drawer-part />
    </code-block>
  </div>
</template>

<script setup>
import DrawerPart from './parts/DrawerPart.vue'
import drawerPartCode from './parts/DrawerPart.vue?raw'
</script>
