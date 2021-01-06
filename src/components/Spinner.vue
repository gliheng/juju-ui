<template>
  <div class="j-spinner" :data-size="size"></div>
</template>

<script lang="ts">
export default {
  props: {
    size: {
      type: String,
      default: 'sm',
      validator(v: string) {
        return v == 'sm' || v == 'md' || v == 'lg';
      },
    },
  }
}
</script>

<style lang="scss">
.j-spinner {
  position: relative;
  box-sizing: border-box;
  border: 2px solid var(--primary-color-text);
  border-radius: 50%;
  display: inline-flex;
  vertical-align: middle;
  &[data-size="sm"] {
    width: 20px;
    height: 20px;
  }
  &[data-size="md"] {
    width: 30px;
    height: 30px;
  }
  &[data-size="lg"] {
    width: 40px;
    height: 40px;
  }
  &:after {
    flex: 1;
    content: '';
    display: block;
    border-radius: 50%;
    margin: -2px;
    border-top: 2px solid var(--primary-color);
    border-right: 2px solid transparent;
    animation: j-spinner-rotate .6s linear infinite;
  }
}

@keyframes j-spinner-rotate {
  to {
    transform: rotate(360deg)
  }
}
</style>