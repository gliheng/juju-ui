<template>
  <div>
    <h1>Tabs</h1>
    <section class="tabs">
      <h2>Basic tabs</h2>
      <j-tabs>
        <j-tab-pane label="Airplane" icon="airplane">Airplane</j-tab-pane>
        <j-tab-pane label="Car" icon="car">Car</j-tab-pane>
        <j-tab-pane label="Bicycle" icon="bicycle">Bicycle</j-tab-pane>
        <j-tab-pane label="Bus" icon="bus">Bus</j-tab-pane>
      </j-tabs>
    </section>

    <section class="tabs">
      <h2>Icon side</h2>
      <j-tabs icon-side="top">
        <j-tab-pane label="Airplane" icon="airplane">Airplane</j-tab-pane>
        <j-tab-pane label="Car" icon="car">Car</j-tab-pane>
        <j-tab-pane label="Bicycle" icon="bicycle">Bicycle</j-tab-pane>
        <j-tab-pane label="Bus" icon="bus">Bus</j-tab-pane>
      </j-tabs>
    </section>

    <section class="tabs">
      <h2>Tabs with icon and card type</h2>
      <j-tabs type="card">
        <j-tab-pane label="Airplane" icon="airplane">Airplane</j-tab-pane>
        <j-tab-pane label="Car" icon="car">Car</j-tab-pane>
        <j-tab-pane label="Bicycle" icon="bicycle">Bicycle</j-tab-pane>
        <j-tab-pane label="Bus" icon="bus">Bus</j-tab-pane>
      </j-tabs>
    </section>
    
    <section class="tabs">
      <h2>Managable tabs</h2>
      <j-tabs type="card" :add="true" @tab-add="addTab" @tab-remove="removeTab($event)">
        <j-tab-pane label="Home" icon="home">Add more by clicking the add button</j-tab-pane>
        <j-tab-pane v-for="(tab, i) in tabs" :key="i"
          :label="tab.label" :icon="tab.icon" closable>{{ tab.label }}</j-tab-pane>
      </j-tabs>
    </section>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
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
    return { tabs, addTab, removeTab };
  },
};
</script>