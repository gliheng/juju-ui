<template>
  <h1>Tooltip</h1>
  <div>
    <section>
      <div class="box">
        <j-tooltip class="left" side="left" title="hello">
          <j-button>Left</j-button>
        </j-tooltip>
        <j-tooltip class="right" side="right" title="hello">
          <j-button>Right</j-button>
        </j-tooltip>
        <j-tooltip class="top" side="top" title="hello">
          <j-button>Top</j-button>
        </j-tooltip>
        <j-tooltip class="bottom" side="bottom" title="hello">
          <j-button>Bottom</j-button>
        </j-tooltip>
      </div>
    </section>
    <section>
      <h2>Tooltip triggered by a click</h2>
      <j-tooltip side="right" title="hello" trigger="click">
        <j-button>Tooltip</j-button>
      </j-tooltip>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 300px;
  height: 200px;
  position: relative;
  :deep(.j-tooltip) {
    position: absolute;
    &.top {
      left: 50%;
      transform: translateX(-50%);
    }
    &.left {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &.right {
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &.bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>