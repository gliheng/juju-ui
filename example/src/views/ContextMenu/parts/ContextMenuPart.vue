<template>
  <j-context-menu class="box">
    <template #menu>
      <j-menu class="menu" list>
        <j-menu label="Windows" icon="logo-windows" @click="onClick('logo-windows')" />
        <j-menu label="Google" icon="logo-google" @click="onClick('logo-google')" />
        <j-menu label="Linux" icon="logo-tux" @click="onClick('logo-tux')" />
        <j-menu label="Slack" icon="logo-slack" @click="onClick('logo-slack')" />
      </j-menu>
    </template>
    <div v-if="!sel">Please select an app from context menu</div>
    <j-svg-icon v-else :name="sel" size="lg" />
  </j-context-menu>
</template>

<script setup>
import { ref } from 'vue';

let sel = ref('');
function onClick(v) {
  sel.value = v;
}
</script>

<style scoped>
.box {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--j-background-color-2);
  color: var(--j-text-color);
}
</style>