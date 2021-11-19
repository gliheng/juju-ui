<template>
  <div class="j-tooltip" :data-side="side" v-on="events" >
    <slot/>
    <transition name="j-fade">
      <div v-if="title && on" class="j-tooltip-title j-dark">
        <div class="j-arrow" :data-side="arrowSide"></div>{{ title }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useBackdropAwareSwitch } from '@utils/hooks';

export default defineComponent({
  props: {
    title: String,
    side: {
      type: String,
      default: 'right',
    },
    trigger: {
      type: String,
      default: 'hover',
    },
  },
  setup(props) {
    let arrowSide = computed(() => {
      if (props.side == 'left') return 'right';
      if (props.side == 'right') return 'left';
      if (props.side == 'top') return 'bottom';
      if (props.side == 'bottom') return 'top';
      return '';
    });

    let [on, toggle] = useBackdropAwareSwitch();

    let events = computed(() => {
      let evts: Record<string, Function> = {};
      if (props.trigger == 'hover') {
        evts.mouseenter = () => toggle(true);
        evts.mouseleave = () => toggle(false);
      } else if (props.trigger == 'click') {
        evts.click = (evt: MouseEvent) => {
          evt.stopPropagation();
          toggle(true);
        };
      }
      return evts;
    });
    
    return { on, arrowSide, events };
  },
});
</script>

<style src="./Tooltip.scss"></style>
