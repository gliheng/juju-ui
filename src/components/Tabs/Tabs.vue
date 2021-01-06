<template>
  <div class="j-tabs" :data-type="type" :data-icon-side="iconSide">
    <tab-scroller ref="scroller">
      <div class="j-tabs-bar" ref="tabBar">
        <div class="j-tabs-bar-inner">
          <div class="j-tabs-btn" v-for="(tab, i) in tabs" :key="i" :class="{ 'j-active': active == i }"
            v-ripple:color="'var(--primary-color-light)'"
            @click="setActive($event, i)">
            <button>
              <svg-icon class="j-tabs-icon" v-if="tab.icon" :name="tab.icon" />
              <span>{{ tab.label }}</span>
            </button>
            <a class="j-tabs-close" v-if="tab.closable" @click="$emit('tab-remove', i)">
              <svg-icon name="close-outline" />
            </a>
          </div>
          <div class="j-tabs-btn" v-if="add" @click="addTab" v-ripple:color="'var(--primary-color-light)'">
            <button>
              <svg-icon name="add" />
            </button>
          </div>
        </div>
        <div class="j-spacer"></div>
        <div class="j-tabs-active-bar" :style="activeBarStyle"></div>
      </div>
    </tab-scroller>
    <div class="j-tabs-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref, watch, computed, SetupContext, nextTick,
} from 'vue';
import TabPane, { TabPaneSymbol } from './TabPane.vue';
import TabScroller from './_TabScroller.vue';
import { useChildren } from '../../utils/vue'
import SvgIcon from '../SvgIcon.vue';
import ripple from '../../directives/ripple';

interface TabDef {
  label: string,
  icon: string,
  closable: boolean,
};

export default {
  props: {
    type: String,
    iconSide: {
      type: String,
      default: 'left',
    },
    add: Boolean,
  },
  setup(props, { slots, emit }: SetupContext) {
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
      if (tabBar.value) {
        let el = tabBar.value.firstElementChild!.children[active.value] as HTMLElement;
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
      nextTick(() => {
        let el = evt.currentTarget as HTMLElement;
        alignScroller(el);
      });
    }

    return {
      active, setActive,
      tabs, tabBar, activeBarStyle,
      addTab, scroller,
    };
  },
  components: { SvgIcon, TabScroller },
  directives: { ripple },
};
</script>

<style lang="scss">
.j-tabs {
  text-align: left;
  .j-tabs-bar {
    border-bottom: 2px solid var(--neutral-color-lighter);
    position: relative;
    display: flex;
    white-space: nowrap;
    .j-tabs-bar-inner {
      display: flex;
    }
    .j-tabs-btn {
      position: relative;
      display: inline-block;
      transition: background-color 0.2s, color 0.2s, opacity 0.2s;
      padding: 0 0.2rem;
      overflow: hidden;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      
      &.j-active {
        color: var(--primary-color);
        button {
          color: var(--primary-color);
        }
      }
      &:hover {
        opacity: 0.75;
      }
      > button {
        color: var(--text-color);
        padding: 0.5rem;
        background: none;
        border: none;
        outline: none;
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        display: inline-flex;
      }
      .j-tabs-close {
        display: inline-block;
        line-height: 0;
        &:hover {
          background-color: var(--neutral-color-light);
        }
      }
    }
    .j-spacer {
      flex: 1;
    }
    .j-tabs-active-bar {
      transition: left .2s cubic-bezier(.645,.045,.355,1);
      height: 2px;
      background-color: var(--primary-color);
      position: absolute;
      bottom: -2px;
    }
  }
  &[data-icon-side="left"] {
    .j-tabs-btn {
      button {
        flex-direction: row;
        .j-tabs-icon.j-icon {
          margin-right: 0.2rem;
        }
      }
    }
  }
  &[data-icon-side="top"] {
    .j-tabs-btn {
      button {
        flex-direction: column;
        .j-tabs-icon.j-icon {
          margin-bottom: 0.2rem;
        }
      }
    }
  }
  &[data-icon-side="bottom"] {
    .j-tabs-btn {
      button {
        flex-direction: column-reverse;
        .j-tabs-icon.j-icon {
          margin-top: 0.2rem;
        }
      }
    }
  }
  &[data-icon-side="right"] {
    .j-tabs-btn {
      button {
        flex-direction: row-reverse;
        .j-tabs-icon.j-icon {
          margin-left: 0.2rem;
        }
      }
    }
  }
  &[data-type="card"] {
    $border: 1px solid var(--neutral-color-lighter);
    .j-tabs-bar {
      border-bottom: none;
      .j-tabs-btn {
        border: $border;
        border-right: none;
        &:first-child {
          border-top-left-radius: 3px;
        }
        &:last-child {
          border-right: $border;
          border-top-right-radius: 3px;
        }
        &.j-active {
          border-bottom: none;
        }
      }
    }
    .j-spacer {
      border-bottom: $border;
    }
    .j-tabs-active-bar {
      display: none;
    }
  }
}
</style>