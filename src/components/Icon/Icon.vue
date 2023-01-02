<template>
  <i class="j-icon" :data-size="size" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <i v-if="svg" class="j-icon-inner">
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" :viewBox="viewBox" v-html="hover ? alt || svg : svg"></svg>
    </i>
    <i v-else class="j-icon-inner" v-html="hover ? altImg || img : img" />
  </i>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import * as icons from 'ionicons/icons';
import { camelCase } from '@utils/string';
import { get as getConfig } from '@utils/config';

export default defineComponent({
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
});

function getIconSvg(name?: string): string {
  if (!name) return '';
  let userIcons = getConfig().icons;
  let key = camelCase(name);
  let str = userIcons?.[key];
  if (!str) {
    str = (icons as Record<string, string>)[key];
  }
  if (!str) return '';
  let start = str.indexOf('<');
  return str.substring(start).replace(/<title>.*?<\/title>/, '');
}
</script>

<style src="./Icon.scss"></style>
