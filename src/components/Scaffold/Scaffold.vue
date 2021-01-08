<template>
  <div class="j-scaffold" :data-wide="wideLayout" :data-expanded="expanded" :data-has-nav="hasNav">
    <j-drawer v-if="!wideLayout" v-model="drawerOn" side="left" >
      <slot name="drawer"></slot>
    </j-drawer>
    <nav v-else class="j-scaffold-nav">
      <slot name="drawer"></slot>
    </nav>
    <main class="j-scaffold-content">
      <slot name="content"></slot>
    </main>
    <header class="j-appbar j-shadow-1" :data-align="wideLayout || titleAlign == 'left' ? 'left' : 'center'">
      <div class="j-appbar-left-actions" v-if="$slots.drawer">
        <j-button rounded icon="menu" @click="toggleNav" />
      </div>
      <div class="j-appbar-title"><slot name="title"></slot></div>
      <div v-if="actions && actions.all.length" class="j-appbar-right-actions">
        <template v-for="(act, i) in actions.sticky" :key="i">
          <a v-if="act.link" :href="act.link" :target="act.target">
            <j-button rounded :icon="act.icon" @click="act.onClick"></j-button>
          </a>
          <j-button v-else rounded :icon="act.icon" @click="act.onClick"></j-button>
        </template>
        <j-dropdown v-if="!wideLayout && actions.others.length" align="right" @change="doAction">
          <template #button>
            <j-button rounded icon="ellipsis-vertical" />
          </template>
          <j-dropdown-item v-for="(act, i) in actions.others" :key="i"
            :with-icon="true" :name="act.label" :icon="act.icon">{{ act.label }}</j-dropdown-item>
        </j-dropdown>
        <template v-else>
          <j-button v-for="(act, i) in actions.others" :key="i + actions.sticky.length"
            rounded :icon="act.icon" @click="act.onClick">{{ act.label }}</j-button>
        </template>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext } from 'vue';
import JButton from '../Button.vue';
import Dropdown from '../Dropdown/Dropdown.vue';
import DropdownItem from '../Dropdown/DropdownItem.vue';
import { useSwitch, useWindowSize } from '../../utils/vue';
import { getScreenSizeClass } from '../../utils/screen';
import SvgIcon from '../SvgIcon.vue';

type Action = {
  label?: string,
  icon?: string,
  sticky?: boolean,
  onClick?: () => void,
  link?: string,
  target?: string,
};

export default {
  props: {
    actions: Array,
    titleAlign: String,
    initialExpanded: {
      // focus on the right pane in wide layout mode
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }: SetupContext) {
    let [ expanded, toggleExpanded ] = useSwitch(props.initialExpanded);
    let [ drawerOn, toggleDrawer ] = useSwitch(false);

    let actions = computed(() => {
      let actions = (props.actions || []) as Array<Action>;
      return {
        sticky: actions.filter(a => a.sticky),
        others: actions.filter(a => !a.sticky),
        all: actions,
      };
    });

    function doAction(i: number) {
      actions.value.others[i].onClick?.();
    }

    let size = useWindowSize();
    let sizeClass = computed(() => getScreenSizeClass(size.width, size.height));
    let wideLayout = computed(() => sizeClass.value != 'sm');
    let hasNav = computed(() => !!slots.drawer);

    function toggleNav() {
      if (wideLayout.value) {
        toggleExpanded();
      } else {
        toggleDrawer();
      }
    }

    return { drawerOn, toggleNav, actions, doAction, sizeClass, wideLayout, expanded, hasNav };
  },
  components: { JButton, Dropdown, DropdownItem, SvgIcon },
};
</script>

<style lang="scss">
.j-scaffold {
  display: flow-root;
  min-height: 100vh;
  $left: 300px;
  $hh: 60px;
  .j-appbar {
    $pad: 10px;
    position: relative;
    height: 60px;
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    padding: 0 $pad;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: left 0.2s $curve;
    .j-appbar-title {
      text-align: center;
    }
    .j-appbar-left-actions {
      position: absolute;
      left: $pad;
    } 
    > .j-appbar-right-actions {
      display: flex;
      position: absolute;
      right: $pad;
      > * {
        margin-left: 0.2rem;
      }
    }
    &[data-align="left"] {
      justify-content: left;
      .j-appbar-left-actions {
        position: relative;
        left: 0;
      }
    }
  }
  .j-scaffold-nav {
    position: fixed;
    transform: translateX(-$left);
    top: 0;
    left: 0;
    bottom: 0;
    width: $left;
    box-sizing: border-box;
    transition: transform 0.2s $curve;
    padding: 1rem;
  }
  .j-scaffold-content {
    transition: margin-left 0.2s $curve;
    display: flow-root;
    margin-top: $hh;
  }
  &[data-has-nav="true"][data-wide="true"][data-expanded="false"] {
    .j-appbar {
      left: $left;
    }
    .j-scaffold-nav {
      transform: translateX(0);
    }
    .j-scaffold-content {
      margin-left: $left;
    }
  }
  // &[data-wide="true"] {
  //   .j-appbar-title {
  //     display: none;
  //   }
  // }
}
</style>