<template>
  <div class="pool">
    <div>
      <j-flex-layout-drag-source class="j-shadow-5 pill" name="pane-a">
        Component A
      </j-flex-layout-drag-source>
      <j-flex-layout-drag-source class="j-shadow-5 pill" name="pane-b">
        Component B
      </j-flex-layout-drag-source>
      <j-flex-layout-drag-source class="j-shadow-5 pill" name="pane-c">
        Component C
      </j-flex-layout-drag-source>
      <j-flex-layout-drag-source class="j-shadow-5 pill" name="pane-d">
        Component D
      </j-flex-layout-drag-source>
      <j-flex-layout-drag-source class="j-shadow-5 pill" name="pane-e">
        Component E
      </j-flex-layout-drag-source>
    </div>
    <p>Drag these pills to the panel bellow to modify layout</p>
  </div>
  <j-tile-layout
    :library="library"
    :preset="preset"
    :cols="6"
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
    pos: [2, 0, 1, 1],
  },
  {
    use: 'pane-d',
    x: 3,
    y: 0,
    w: 1,
    h: 1,
    pos: [3, 0, 1, 1],
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

