<template>
  <div class="outer">
    <j-flex-layout :library="library" :preset="preset" />
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

    return {
      library, preset,
    };
  },
};
</script>

<style scoped>
.outer {
  height: 400px;
}
</style>