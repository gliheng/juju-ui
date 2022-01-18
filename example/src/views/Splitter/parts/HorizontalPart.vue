<template>
  <div>
    <j-splitter class="splitter">
      <j-splitter-panel class="panel">
        <p>Panel A</p>
      </j-splitter-panel>
      <j-splitter-panel class="panel">
        <p>Panel B</p>
      </j-splitter-panel>
    </j-splitter>
  </div>
</template>

<style scoped>
.splitter {
  border: 1px solid var(--j-primary-color);
}
.panel {
  background-color: #78afdf;
  color: white;
  text-align: center;
}
</style>