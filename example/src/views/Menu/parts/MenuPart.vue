<template>
  <j-menu class="menu" list>
    <j-menu label="Transform">
      <j-menu label="Rotate Left" />
      <j-menu label="Rotate Right" />
      <j-menu label="Flip Horizontal" />
      <j-menu label="Flip Vertical" />
    </j-menu>
    <j-menu label="Alignment">
      <j-menu label="Align Left" />
      <j-menu label="Align Center" />
      <j-menu label="Align Right" />
      <j-menu-seperator />
      <j-menu label="Align Top" />
      <j-menu label="Align Middle" />
      <j-menu label="Align Bottom" />
      <j-menu-seperator />
      <j-menu label="Space Horizontally" />
      <j-menu label="Space Vertically" />
      <j-menu-seperator />
      <j-menu label="Distribute Vertically" />
      <j-menu label="Distribute Vertically" />
    </j-menu>
  </j-menu>
</template>

<style scoped>
.menu {
  width: 160px;
}
</style>
