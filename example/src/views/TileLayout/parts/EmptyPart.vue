<template>
  <div class="pool">
    <div>
      <j-tile-layout-drag-source class="j-shadow-5 pill" name="pane-a" :w="3" :h="3">
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
  <j-tile-layout :library="library">
    <template #placeholder>
      <div class="placeholder">Drop pill onto this block</div>
    </template>
  </j-tile-layout>
</template>

<script setup>
import library from './library';
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