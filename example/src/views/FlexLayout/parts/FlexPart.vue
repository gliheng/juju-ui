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
  <j-flex-layout
    class="layout"
    :library="library"
    :preset="preset"
    :gap="6"
    storage-key="juju-flex-layout"
  >
    <template #placeholder><div class="placeholder">Drop pill onto this block</div></template>
  </j-flex-layout>
</template>

<script setup>
import library from './library';

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
        'pane-b',
        'pane-c',
      ]
    },
    {
      use: '$tab',
      props: {
        tabs: [
          'pane-d', 'pane-e',
        ],
      }
    },
  ]
};
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
.layout {
  height: 500px;
  --j-divider-color: transparent;
  .placeholder {
    color: silver;
  }
}
</style>