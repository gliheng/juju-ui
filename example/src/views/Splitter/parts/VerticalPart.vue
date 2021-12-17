<template>
  <div>
    <j-splitter class="splitter" vertical>
      <j-splitter-panel class="panel">
        <p>Panel A</p>
      </j-splitter-panel>
      <j-splitter-panel class="panel">
        <p>Panel B</p>
      </j-splitter-panel>
      <j-splitter-panel class="panel">
        <p>Panel C</p>
      </j-splitter-panel>
    </j-splitter>
  </div>
</template>

<style scoped>
.splitter {
  border: 1px solid var(--primary-color);
  height: 300px;
}
.panel {
  background-color: #78afdf;
  color: white;
  text-align: center;
}
</style>