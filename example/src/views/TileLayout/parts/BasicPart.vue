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
  >
    <template #placeholder>
      <div class="placeholder">Drop pill onto this block</div>
    </template>
  </j-tile-layout>
</template>

<script setup>
import library from './library';
const preset = [
  {
    use: 'pane-a',
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    closable: true,
  },
  {
    use: 'pane-b',
    x: 2,
    y: 0,
    w: 2,
    h: 2,
    closable: true,
  },
  {
    use: 'pane-c',
    x: 4,
    y: 0,
    w: 2,
    h: 2,
    closable: true,
  },
  {
    use: 'pane-d',
    x: 6,
    y: 0,
    w: 2,
    h: 2,
    closable: true,
  },
  {
    use: 'pane-e',
    x: 8,
    y: 0,
    w: 2,
    h: 2,
    closable: true,
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
.placeholder {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: silver;
}
</style>