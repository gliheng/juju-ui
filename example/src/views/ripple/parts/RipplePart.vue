<template>
  <p class="box" v-ripple>Normal ripple</p>
  <p class="box" v-ripple:center="true">Ripple from center</p>
  <p class="box j-warning" v-ripple>Ripple with black color</p>
  <p class="box j-warning" v-ripple="{center: true}">Ripple from center with black color</p>
</template>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 200px;
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--j-primary-color);
  color: var(--j-primary-color-text);
  position: relative;
  overflow: hidden;
  margin: 10px;
}
.j-warning {
  --j-ink-color: purple;
}
</style>
