<template>
  <div class="j-carousel" :data-vertical="vertical">
    <div class="j-carousel-viewport">
      <transition
        :name="`j-carousel-slide-${data.direction}`"
      >
        <component :is="data.activeView" />
      </transition>
    </div>
    <template v-if="showControl">
      <j-button
        v-if="vertical"
        class="j-carousel-prev-btn"
        round
        flat
        icon="chevron-up-outline"
        :disabled="prevDisabled"
        @click="goPrev" />
      <j-button
        v-else
        class="j-carousel-prev-btn"
        round
        flat
        icon="chevron-back-outline"
        :disabled="prevDisabled"
        @click="goPrev" />
      <j-button
        v-if="vertical"
        class="j-carousel-next-btn"
        round
        flat
        icon="chevron-down-outline"
        :disabled="nextDisabled"
        @click="goNext" />
      <j-button
        v-else
        class="j-carousel-next-btn"
        round
        flat
        icon="chevron-forward-outline"
        :disabled="nextDisabled"
        @click="goNext" />
    </template>
    <Indicator
      v-if="showIndicator"
      :active-dot-size="activeDotSize"
      :current="data.current"
      :total="data.total"
      :model-value="data.current"
      :vertical="vertical"
      @update:modelValue="goTo($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, reactive, computed, Component } from 'vue';
import JButton from '@/Button/Button.vue';
import CarouselItem from './CarouselItem.vue';
import Indicator from './Indicator.vue';

export default defineComponent({
  components: {
    Indicator,
    JButton,
  },
  props: {
    vertical: Boolean,
    autoplay: Boolean,
    activeDotSize: {
      type: Number,
      default: 16,
    },
    loop: Boolean,
    showControl: {
      type: Boolean,
      default: true,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    let data = reactive<{
      total: number;
      current: number;
      activeView?: Component,
      direction: string,
    }>({
      total: 0,
      current: 0,
      direction: 'right',
    });

    watch(
      [
        () => slots.default,
        () => data.current,
      ],
      ([defaultSlot, curr]) => {
        let children = defaultSlot?.() || [];
        let nodes = children.filter(e => e.type == CarouselItem);
        let total = nodes.length;
        function activeView() {
          return nodes[curr];
        }
        data.total = total;
        data.activeView = activeView;
      },
      {
        immediate: true,
      },
    );

    const prevDisabled = computed(
      () => !props.loop && data.current <= 0
    );

    const nextDisabled = computed(
      () => !props.loop && data.current >= data.total - 1 && data.total > 0
    );

    function goPrev() {
      data.current = (data.current - 1 + data.total) % data.total;
      data.direction = props.vertical ? 'up' : 'left';
    }

    function goNext() {
      data.current = (data.current + 1) % data.total;
      data.direction = props.vertical ? 'down' : 'right';
    }

    function goTo(i: number) {
      data.direction =
        i < data.current
        ? (props.vertical ? 'up' : 'left')
        : (props.vertical ? 'down' : 'right');
      data.current = i;
    }

    return {
      data,
      prevDisabled,
      nextDisabled,
      goPrev,
      goNext,
      goTo,
    };
  },
});
</script>

<style lang="scss" src="./Carousel.scss" />
