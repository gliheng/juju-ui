<template>
  <div>
    <h1>Dropdown</h1>
    <div>
      <section>
        <h2>Simple dropdown</h2>
        <j-dropdown v-model="value1" placeholder="Blend Mode" :options="blendOptions" />
      </section>
      <section>
        <h2>Dropdown button</h2>
        <j-dropdown v-model="value2" placeholder="Blend Mode" :options="blendOptions">
          <j-button>Press me</j-button>
        </j-dropdown>
      </section>
      <section>
        <h2>Dropdown with icon</h2>
        <j-dropdown v-model="value3" placeholder="Select a transport" :options="transportOptions" />
      </section>
      <section>
        <h2>Dropdown with multiple selection</h2>
        <j-dropdown multiple v-model="multiValue1" placeholder="Select preferred tranport" :options="transportOptions" />
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

    let blendOptions = [{
      value: 'normal',
      label: 'Normal',
    }, {
      type: 'seperator',
    }, {
      value: 'darken',
      label: 'Darken',
    }, {
      value: 'multiply',
      label: 'Multiply',
    }, {
      type: 'seperator',
    }, {
      value: 'lighten',
      label: 'Lighten',
    }, {
      value: 'screen',
      label: 'Screen',
    }];

    let transportOptions = [{
      icon: 'bicycle',
      value: 'bicycle',
      label: 'Bicycle'
    }, {
      icon: 'car-sport',
      value: 'car',
      label: 'Car',
    }, {
      icon: 'bus',
      value: 'bus',
      label: 'Bus',
    }, {
      icon: 'boat',
      value: 'boat',
      label: 'Boat',
    }];

    return {
      value1, value2, value3, multiValue1,
      blendOptions, transportOptions,
    };
  }
};
</script>