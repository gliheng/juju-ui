<template>
  <div>
    <j-flex-layout :library="library" :preset="preset"/>
  </div>
</template>

<script>
import library from './FlexLayoutLibrary';

export default {
  setup() {
    let preset = {
      use: '$col',
      children: [
        {
          use: '$row',
          children: [
            {
              use: 'pane-a',
              size: 300,
            },
            '$divider',
            'pane-b',
            '$divider',
            'pane-c',
          ]
        },
        '$divider',
        {
          use: '$row',
          children: [
            'pane-d', '$divider', 'pane-e',
          ],
        }, 
      ]
    };

    // let preset = {
    //   use: '$row',
    //   children: [
    //     {
    //       use: 'pane-a',
    //       size: 300,
    //     },
    //     '$divider',
    //     'pane-b',
    //     '$divider',
    //     'pane-c',
    //   ]
    // };

    return {
      library, preset,
    }
  },
};
</script>

<style>

</style>