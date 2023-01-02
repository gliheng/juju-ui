<template>
  <div class="pool">
    <div>
      <j-tile-layout-drag-source class="j-shadow-5 pill" name="pane-a">
        Component A
      </j-tile-layout-drag-source>
      <j-tile-layout-drag-source class="j-shadow-5 pill" name="pane-b">
        Component B
      </j-tile-layout-drag-source>
      <j-tile-layout-drag-source class="j-shadow-5 pill" name="pane-c">
        Component C
      </j-tile-layout-drag-source>
      <j-tile-layout-drag-source class="j-shadow-5 pill" name="pane-d">
        Component D
      </j-tile-layout-drag-source>
      <j-tile-layout-drag-source class="j-shadow-5 pill" name="pane-e">
        Component E
      </j-tile-layout-drag-source>
    </div>
    <p>Drag these pills to the panel bellow to modify layout</p>
  </div>
  <j-tile-layout
    :library="library"
    :preset="preset"
    storage-key="juju-tile-layout"
  />
</template>

<script setup>
import library from './library';
const preset = [
  {
    use: 'pane-a',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
  },
  {
    use: 'pane-b',
    x: 1,
    y: 0,
    w: 1,
    h: 1,
  },
  {
    use: 'pane-c',
    x: 2,
    y: 0,
    w: 1,
    h: 1,
  },
  {
    use: 'pane-d',
    x: 3,
    y: 0,
    w: 1,
    h: 1,
  },
  {
    use: 'pane-e',
    x: 4,
    y: 0,
    w: 1,
    h: 1,
  },
];
</script>

<style lang="scss" scoped>
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
  p {
    color: grey;
  }
}
</style>