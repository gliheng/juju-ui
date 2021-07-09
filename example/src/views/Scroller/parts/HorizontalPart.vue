<template>
  <j-scroller class="outer">
    <div class="inner"></div>
  </j-scroller>
</template>

<style lang="scss" scoped>
.outer {
  width: 300px;
  height: 300px;
  .inner {
    width: 2000px;
    height: 100%;
    background-color: rgb(123, 123, 221);
    background-image: linear-gradient(135deg,hsla(0,0%,100%,.25) 25%, transparent 0,transparent 50%, hsla(0,0%,100%,.25) 0, hsla(0,0%,100%,.25) 75%,transparent 0, transparent);
    background-size: 30px 30px;
    background-repeat: repeat;
  }
}
</style>