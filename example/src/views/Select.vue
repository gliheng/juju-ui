<template>
  <div>
    <h1>Select</h1>
    <div>
      <section>
        <h2>Simple select</h2>
        <j-select v-model="value1" placeholder="Blend mode" :options="blendOptions" />
      </section>
      <section>
        <h2>Select with icon</h2>
        <j-select v-model="value2" placeholder="Select a transport" :options="transportOptions" />
      </section>
      <section>
        <h2>Select with multiple selection</h2>
        <j-select multiple v-model="value3" placeholder="Select preferred tranport" :options="transportOptions" />
      </section>
      <section>
        <h2>Customize select display</h2>
        <j-select v-model="value4" placeholder="Blend mode" :options="blendOptions">
          <j-button v-if="value4">Blend mode: {{ value4 }}</j-button>
          <j-button v-else>Press me</j-button>
        </j-select>
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
    let value3 = ref([]);
    let value4 = ref();

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
      value1, value2, value3, value4,
      blendOptions, transportOptions,
    };
  }
};
</script>