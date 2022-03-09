<template>
  <j-tabs type="card" :add="true" @tab-add="addTab" @tab-remove="removeTab($event)">
    <j-tab-pane label="Home" icon="home">
      Add more by clicking the add button
    </j-tab-pane>
    <j-tab-pane v-for="(tab, i) in tabs" :key="i"
      :label="tab.label" :icon="tab.icon" closable>{{ tab.label }}</j-tab-pane>
  </j-tabs>
</template>

<script setup>
import { reactive } from 'vue';

let allTabs = [
  { label: 'Airplane', icon: 'airplane' },
  { label: 'Car', icon: 'car' },
  { label: 'Bicycle', icon: 'bicycle' },
  { label: 'Bus', icon: 'bus' },
];
let tabs = reactive([]);
function addTab() {
  let choice = Math.floor(Math.random()*allTabs.length);
  tabs.push(allTabs[choice]);
}
function removeTab(i) {
  tabs.splice(i-1, 1);
}
</script>
