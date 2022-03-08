<template>
  <div class="j-tabs" :data-type="type" :data-icon-side="iconSide">
    <div class="j-tabs-inner">
      <tab-scroller ref="scroller">
        <div class="j-tabs-bar">
          <div class="j-tabs-bar-inner" ref="tabBar">
            <div
              v-for="(tab, i) in tabs"
              v-ripple
              class="j-tabs-btn"
              :key="i"
              :class="{ 'j-active': active == i }"
              @click="setActive($event, i)"
            >
              <slot
                v-if="$slots.tab"
                name="tab"
                :i="i"
                :tab="tab"
                :emit="$emit"
              />
              <div class="j-tabs-btn-inner" v-else>
                <button>
                  <svg-icon class="j-tabs-icon" v-if="tab.icon" :name="tab.icon" />
                  <span>{{ tab.label }}</span>
                </button>
                <a
                  v-if="tab.closable"
                  class="j-tabs-close"
                  @mousedown.stop
                  @click="removeTab(i)"
                >
                  <svg-icon name="close-outline" />
                </a>
              </div>
            </div>
            <div
              v-if="add"
              class="j-tabs-btn"
              v-ripple
              @click="addTab"
            >
              <button>
                <svg-icon name="add" />
              </button>
            </div>
          </div>
          <div class="j-spacer"></div>
          <div class="j-tabs-active-bar" :style="activeBarStyle"></div>
        </div>
      </tab-scroller>
      <div class="j-tabs-addon">
        <slot name="addon"></slot>
      </div>
    </div>
    <main class="j-tabs-content">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch, computed, nextTick,
} from 'vue';
import TabPane, { TabPaneSymbol } from './TabPane.vue';
import TabScroller from './TabScroller.vue';
import { useChildren } from '@utils/hooks'
import SvgIcon from '../SvgIcon/SvgIcon.vue';
import ripple from '@directives/ripple';

interface TabDef {
  label: string,
  icon: string,
  closable: boolean,
  attrs: Record<string, any>,
};

export default defineComponent({
  components: { SvgIcon, TabScroller },
  directives: { ripple },
  props: {
    type: String,
    iconSide: {
      type: String,
      default: 'left',
    },
    add: Boolean,
  },
  emits: ['tab-add', 'tab-remove'],
  setup(props, { emit }) {
    let active = ref(0);
    let tabBar = ref<HTMLElement>();
    let scroller = ref<typeof TabScroller>();

    let children = useChildren(TabPaneSymbol, { active });

    let tabs = computed<Array<TabDef>>(() => {
      let tabs: Array<TabDef> = [];
      children.forEach(child => {
        if (child.type == TabPane) {
          let { props } = (child as any);
          tabs.push({
            label: props.label,
            icon: props.icon,
            closable: props.closable,
            attrs: child.attrs,
          });
        }
      });

      return tabs;
    });

    // When tabs are closed, set active tab to max possible tab
    watch([tabs, active], ([tabs, i], _) => {
      let tabLen = (tabs as Array<TabDef>).length;
      if (tabLen <= i) {
        active.value = tabLen - 1;
      }
    });

    let activeBarStyle = computed(() => {
      let width = 0, left = 0;
      if (tabBar.value && tabs.value.length) {
        let el = tabBar.value.children[active.value] as HTMLElement;
        if (el) {
          width = el.clientWidth;
          left = el.offsetLeft;
        }
      }
      return {
        width: `${width}px`, left: `${left}px`,
      };
    });

    function setActive(evt: Event, i: number) {
      active.value = i;
      // scroll tab if necessary
      let el = evt.currentTarget as HTMLElement;
      alignScroller(el);
    }

    function alignScroller(el: HTMLElement) {
      // scroll tab if necessary
      if (scroller.value) {
        let { offsetLeft, offsetWidth } = el;
        let right = offsetLeft + offsetWidth;
        // card tab's button only has left border
        // when aligning to the right edge, border width need to be added
        if (props.type == 'card') {
          let last = !el.nextElementSibling;
          if (!last) {
            // add border width
            right += el.offsetWidth - el.clientWidth;
          }
        }
        scroller.value.alignScroll(offsetLeft, right);
      }
    }

    function addTab(evt: Event) {
      emit('tab-add');
      // Ensure add is visible after tab scroll
      nextTick(() => {
        let el = evt.currentTarget as HTMLElement;
        alignScroller(el);
      });
    }

    function removeTab(i: number) {
      emit('tab-remove', i)
    }

    return {
      active, setActive,
      tabs, tabBar, activeBarStyle,
      addTab, removeTab, scroller,
    };
  },
});
</script>

<style src="./Tabs.scss"></style>