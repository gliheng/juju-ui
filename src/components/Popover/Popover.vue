<template>
  <div
    class="j-popover"
    v-on="events"
    :data-side="side"
  >
    <slot />
    <transition name="j-fade">
      <aside v-if="on" class="j-shadow-5" @click.stop>
        <div class="j-arrow" :data-side="arrowSide" />
        <slot name="popover" :toggle="toggle" />
      </aside>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, nextTick } from 'vue';
import { useBackdropAwareSwitch } from '@utils/hooks';

export default defineComponent({
  props: {
    title: String,
    side: {
      type: String,
      default: 'bottom',
    },
    trigger: {
      type: String,
      default: 'hover',
    },
  },
  emits: ['show', 'hide'],
  setup(props, { emit }) {
    let arrowSide = computed(() => {
      if (props.side.startsWith('left')) return 'right';
      if (props.side.startsWith('right')) return 'left';
      if (props.side.startsWith('top')) return 'bottom';
      if (props.side.startsWith('bottom')) return 'top';
      return '';
    });

    let [on, toggle] = useBackdropAwareSwitch();

    let events = computed(() => {
      let evts: Record<string, Function> = {};
      if (props.trigger == 'hover') {
        let enterTimer = 0, leaveTimer = 0;
        evts.mouseenter = () => {
          if (leaveTimer) {
            clearTimeout(leaveTimer);
            leaveTimer = 0;
          }
          enterTimer = setTimeout(() => toggle(true), 300);
        };
        evts.mouseleave = () => {
          if (enterTimer) {
            clearTimeout(enterTimer);
            enterTimer = 0;
          }
          leaveTimer = setTimeout(() => toggle(false), 300);
        };
      } else if (props.trigger == 'click') {
        evts.click = (evt: MouseEvent) => {
          evt.stopPropagation();
          toggle(true);
        };
      }
      return evts;
    });

    watch(on, (v) => {
      emit(v ? 'show' : 'hide')
    });
    
    return {
      on,
      arrowSide,
      events,
      toggle,
    };
  },
});
</script>

<style src="./Popover.scss"></style>
