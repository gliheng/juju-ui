<template>
  <div>
    <h1>Menu</h1>
    <section>
      <h2>Menu</h2>
      <j-menu class="menu" type="list">
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
          <j-menu type="seperator" />
          <j-menu label="Align Top" />
          <j-menu label="Align Middle" />
          <j-menu label="Align Bottom" />
          <j-menu type="seperator" />
          <j-menu label="Space Horizontally" />
          <j-menu label="Space Vertically" />
          <j-menu type="seperator" />
          <j-menu label="Distribute Vertically" />
          <j-menu label="Distribute Vertically" />
        </j-menu>
      </j-menu>
    </section>
    <section>
      <h2>Menu with icon</h2>
      <j-menu class="menu" type="list">
        <j-menu label="Apps" icon="apps">
          <j-menu label="Windows" icon="logo-windows" />
          <j-menu label="Google" icon="logo-google" />
          <j-menu label="Linux" icon="logo-tux" />
          <j-menu label="Slack" icon="logo-slack" />
        </j-menu>
      </j-menu>
    </section>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.menu {
  width: 160px;
}
</style>