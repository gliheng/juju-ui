<template>
  <div>
    <h1>Dropdown</h1>
    <div>
      <section>
        <h2>Simple dropdown</h2>
        <j-dropdown v-model="value1" placeholder="Blend Mode">
          <j-dropdown-item name="normal" value="normal">Normal</j-dropdown-item>
          <j-dropdown-seperator />
          <j-dropdown-item name="darken" value="darken">Darken</j-dropdown-item>
          <j-dropdown-item name="multiply" value="multiply">Multiply</j-dropdown-item>
          <j-dropdown-seperator />
          <j-dropdown-item name="lighten" value="lighten">Lighten</j-dropdown-item>
          <j-dropdown-item name="screen" value="screen">Screen</j-dropdown-item>
        </j-dropdown>
      </section>
      <section>
        <h2>Dropdown button</h2>
        <j-dropdown v-model="value2" placeholder="Blend Mode">
          <template #button>
            <j-button>Press me</j-button>
          </template>
          <j-dropdown-item name="normal" value="normal">Normal</j-dropdown-item>
          <j-dropdown-seperator />
          <j-dropdown-item name="darken" value="darken">Darken</j-dropdown-item>
          <j-dropdown-item name="multiply" value="multiply">Multiply</j-dropdown-item>
          <j-dropdown-seperator />
          <j-dropdown-item name="lighten" value="lighten">Lighten</j-dropdown-item>
          <j-dropdown-item name="screen" value="screen">Screen</j-dropdown-item>
        </j-dropdown>
      </section>
      <section>
        <h2>Dropdown with icon</h2>
        <j-dropdown v-model="value3" placeholder="Select a transport">
          <j-dropdown-item name="bicycle" icon="bicycle" value="bibycle">Bicycle</j-dropdown-item>
          <j-dropdown-item name="car" icon="car-sport" value="car">Car</j-dropdown-item>
          <j-dropdown-item name="bus" icon="bus" value="bus">Bus</j-dropdown-item>
          <j-dropdown-item name="boat" icon="boat" value="boat">Boat</j-dropdown-item>
        </j-dropdown>
      </section>
      <section>
        <h2>Dropdown with multiple selection</h2>
        <j-dropdown multiple v-model="multiValue1" placeholder="Select preferred tranport">
          <j-dropdown-item name="bicycle" icon="bicycle" value="bicyle">Bicycle</j-dropdown-item>
          <j-dropdown-item name="car" icon="car-sport" value="car">Car</j-dropdown-item>
          <j-dropdown-item name="bus" icon="bus" value="bus">Bus</j-dropdown-item>
          <j-dropdown-item name="boat" icon="boat" value="boat">Boat</j-dropdown-item>
        </j-dropdown>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    let value1 = ref();
    let value2 = ref();
    let value3 = ref();
    let multiValue1 = ref([]);
    return { value1, value2, value3, multiValue1 };
  }
};
</script>