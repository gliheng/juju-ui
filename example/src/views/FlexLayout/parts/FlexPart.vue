<template>
  <div>
    <div class="pool" @dragstart="onDragStart">
      <div class="j-shadow-5 pill" data-use="pane-a" draggable="true">Component A</div>
      <div class="j-shadow-5 pill" data-use="pane-b" draggable="true">Component B</div>
      <div class="j-shadow-5 pill" data-use="pane-c" draggable="true">Component C</div>
      <div class="j-shadow-5 pill" data-use="pane-d" draggable="true">Component D</div>
      <div class="j-shadow-5 pill" data-use="pane-e" draggable="true">Component E</div>
    </div>
    <j-flex-layout class="layout" :library="library" :preset="preset" />
  </div>
</template>

<script>
import library from './FlexLayoutLibrary';

export default {
  setup() {
    function onDragStart(evt) {
      let use = evt.target.dataset['use'];
      evt.dataTransfer.setData("application/j-flex-layout", use);
    }

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
      library,
      preset,
      onDragStart,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 500px;
}
.pool {
  margin-bottom: 8px;
  .pill {
    display: inline-block;
    background: white;
    line-height: 30px;
    margin: 0 8px;
    border-radius: 20px;
    padding: 5px;
  }
}
</style>