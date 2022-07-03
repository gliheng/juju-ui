<template>
  <j-carousel class="carousel" loop>
    <j-carousel-item>A</j-carousel-item>
    <j-carousel-item>B</j-carousel-item>
    <j-carousel-item>C</j-carousel-item>
    <j-carousel-item>D</j-carousel-item>
    <j-carousel-item>E</j-carousel-item>
  </j-carousel>
</template>

<style lang="scss" scoped>
.carousel {
  width: 400px;
  height: 300px;
  :deep(.j-carousel-item) {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
  }
}
</style>
