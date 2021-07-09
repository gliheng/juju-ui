<template>
  <j-menu-bar>
    <j-menu label="File" side="bottom">
      <j-menu label="New" />
      <j-menu-seperator />
      <j-menu label="Open" />
      <j-menu label="Save" />
    </j-menu>
    <j-menu label="Edit" side="bottom">
      <j-menu label="Undo" />
      <j-menu label="Redo" />
    </j-menu>
    <j-menu label="Object" side="bottom">
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
  </j-menu-bar>
</template>