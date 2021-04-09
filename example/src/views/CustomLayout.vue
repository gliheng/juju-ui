<template>
  <div>
    <j-custom-layout :library="library" :preset="preset"/>
  </div>
</template>

<script>
import library from './CustomLayoutLibrary';

export default {
  setup() {
    let preset = {
      layout: 'column',
      children: [
        {
          layout: 'row',
          height: 300,
          children: [
            {
              name: 'a',
              width: 300,
            }, {
              name: 'b',
            },
          ]
        },
        {
          layout: 'row',
          children: [
            {
              name: 'c',
              flex: 2,
            },
            {
              name: 'd',
              flex: 2,
            },
          ]
        }, 
      ]
    };

    return {
      library, preset,
    }
  },
};
</script>

<style>

</style>