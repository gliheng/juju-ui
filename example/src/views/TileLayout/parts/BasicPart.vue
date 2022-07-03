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
    storage-key="juju-tile-layout"
  />
</template>

<script setup>
import library from './library';
const preset = [
  {
    use: 'pane-a',
  },
  {
    use: 'pane-b',
  },
  {
    use: 'pane-c',
  },
  {
    use: 'pane-d',
  },
  {
    use: 'pane-e',
  },
];
</script>

