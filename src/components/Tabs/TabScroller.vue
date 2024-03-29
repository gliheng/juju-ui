<template>
  <div class="j-tabs-scroller">
    <j-icon v-if="needAdjustBtns" class="j-tabs-scroller-btn" name="chevron-back"
      v-ripple="{color: 'var(--j-primary-color-light)'}"
      @click="scrollBy(-200)" />
    <div class="j-tabs-scroller-content" ref="content">
      <slot></slot>
    </div>
    <j-icon v-if="needAdjustBtns" class="j-tabs-scroller-btn" name="chevron-forward"
      v-ripple="{color: 'var(--j-primary-color-light)'}"
      @click="scrollBy(200)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onUpdated } from 'vue';
import anime from 'animejs';
import JIcon from '../Icon/Icon.vue';
import { useElementSize } from '@utils/hooks'
import ripple from '@directives/ripple';

export default defineComponent({
  components: { JIcon },
  directives: { ripple },
  setup() {
    let content = ref<HTMLElement>();
    let needAdjustBtns = ref<boolean>(false);

    function maxScroll(): number {
      if (content.value) {
        let sw = content.value.scrollWidth;
        let cw = content.value.clientWidth;
        return sw - cw;
      }
      return 0;
    }

    function checkScroll() {
      if (content.value) {
        needAdjustBtns.value = maxScroll() > 0;
      }
    }

    let size = useElementSize(content, v => v.firstElementChild!);
    watch(size, _size => {
      checkScroll();
    })

    onUpdated(() => {
      checkScroll();
    });

    function scrollBy(d: number, t: number = 200) {
      let el = content.value;
      if (!el) return;

      scrollTo(el.scrollLeft + d, t);
    }

    function scrollTo(n: number, t: number = 200) {
      let el = content.value;
      if (!el) return;

      let { scrollLeft } = el;
      let obj = { scrollLeft };
      n = Math.max(n, 0);
      n = Math.min(n, maxScroll());

      anime({
        targets: obj,
        scrollLeft: n,
        easing: 'easeInOutQuad',
        duration: t,
        update() {
          el!.scrollLeft = obj.scrollLeft;
        },
      });
    }

    function alignScroll(left: number, right: number) {
      let el = content.value;
      if (el) {
        let { scrollLeft } = el;
        if (left < scrollLeft) {
          // align to the left edge
          scrollTo(left);
        } else if (right > scrollLeft + el.clientWidth) {
          // align to the right edge
          scrollTo(right - el.clientWidth);
        }
      }
    }
  
    return { needAdjustBtns, content, scrollBy, alignScroll };
  },
});
</script>
