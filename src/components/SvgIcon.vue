<template>
  <i class="j-icon" :data-size="size" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <i v-if="svg" class="j-icon-svg">
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" :viewBox="viewBox" v-html="hover ? alt || svg : svg" />
    </i>
    <i v-else class="j-icon-svg" v-html="hover ? altImg || img : img" />
  </i>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import * as icons from 'ionicons/icons';
import { camelCase } from '../utils/string';

export default {
  props: {
    name: String,
    alt: String,
    svg: String,
    viewBox: {
      type: String,
      default: '0 0 512 512',
    },
    size: {
      type: String,
      default: 'sm',
      // validator(v: string) {
      //   return v == 'sm' || v == 'md' || v == 'lg';
      // },
    },
  },
  setup(props) {
    let hover = ref(false);
    let img = computed(() => getIconSvg(props.name));
    let altImg = computed(() => getIconSvg(props.alt));
    function onMouseEnter() {
      hover.value = true;
    }
    function onMouseLeave() {
      hover.value = false;
    }
    return { img, altImg, hover, onMouseEnter, onMouseLeave };
  },
};

function getIconSvg(name?: string): string {
  if (!name) return '';
  let str = (icons as Record<string, string>)[camelCase(name)];
  if (!str) return '';
  let start = str.indexOf('<');
  return str.substring(start);
}
</script>

<style lang="scss">
.j-icon {
  display: inline-block;
  vertical-align: middle;
  &[data-size="sm"] {
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
  }
  &[data-size="md"] {
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
  }
  &[data-size="lg"] {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
  .j-icon-svg {
    display: block;
    line-height: 0;
    width: 100%;
    height: 100%;
    svg {
      width: 100%;
      height: 100%;
    }

    .ionicon {
      fill:currentColor;
      stroke:currentColor
    }
    .ionicon-fill-none {
      fill:none
    }
    .ionicon-stroke-width {
      stroke-width:32px
    }
  }
}
</style>