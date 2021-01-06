<template>
  <div>
    <h1>scroller</h1>
    <section>
      <h2>Both directions</h2>
      <div class="outer" v-scroller>
        <div class="inner">
        </div>
      </div>
    </section>
    <section>
      <h2>Vertical</h2>
      <div class="outer" v-scroller>
        <div class="inner vertical">
        </div>
      </div>
    </section>
    <section>
      <h2>Horizontal</h2>
      <div class="outer" v-scroller>
        <div class="inner horizontal">
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.outer {
  width: 300px;
  height: 300px;
  .inner {
    width: 2000px;
    height: 2000px;
    background-color: rgb(123, 123, 221);
    background-image: linear-gradient(135deg,hsla(0,0%,100%,.25) 25%, transparent 0,transparent 50%, hsla(0,0%,100%,.25) 0, hsla(0,0%,100%,.25) 75%,transparent 0, transparent);
    background-size: 30px 30px;
    background-repeat: repeat;
    &.horizontal {
      height: 100%;
    }
    &.vertical {
      width: 100%;
    }
  }

}
</style>