<template>
  <div class="j-scaffold" :data-wide="wideLayout" :data-expanded="expanded" :data-has-nav="hasNav">
    <j-drawer v-if="!wideLayout" v-model="drawerOn" side="left" >
      <div class="j-scaffold-appbar j-shadow-1" v-if="$slots['nav-title']">
        <slot name="nav-title"></slot>
      </div>
      <slot name="nav"></slot>
    </j-drawer>
    <nav v-else class="j-scaffold-nav">
      <div class="j-scaffold-appbar j-shadow-1" v-if="$slots['nav-title']">
        <slot name="nav-title"></slot>
      </div>
      <slot name="nav"></slot>
    </nav>
    <main class="j-scaffold-content">
      <slot name="content"></slot>
    </main>
    <header class="j-appbar j-shadow-1" :data-align="wideLayout || titleAlign == 'left' ? 'left' : 'center'">
      <div class="j-appbar-left-actions" v-if="hasNav">
        <j-button rounded size="md" icon="menu" @click="toggleNav" />
        <slot v-if="$slots['left-actions']" name="left-actions"></slot>
      </div>
      <div class="j-appbar-title"><slot name="title"></slot></div>
      <div v-if="actions && actions.all.length" class="j-appbar-right-actions">
        <slot v-if="$slots['right-actions']" name="right-actions"></slot>
        <template v-for="(act, i) in actions.sticky">
          <a :key="`link-${i}`" v-if="act.link" :href="act.link" :target="act.target">
            <j-button rounded size="md" :icon="act.icon" @click="act.onClick"></j-button>
          </a>
          <j-button :key="i" v-else rounded size="md" :icon="act.icon" @click="act.onClick">{{ act.label }}</j-button>
        </template>
        <j-dropdown v-if="!wideLayout && actions.others.length" align="right" :menu-offset="10">
          <j-button rounded size="md" icon="ellipsis-vertical" />
          <template #menu>
            <j-menu list>
              <j-menu v-for="(item, i) in actions.others" :key="i" :label="item.label" :icon="item.icon" />
            </j-menu>
          </template>
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
import { computed } from 'vue';
import JButton from '../Button/Button.vue';
import JDropdown from '../Dropdown/Dropdown.vue';
import JMenu from '../Menu/Menu.vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';
import { useSwitch, useWindowSizeClass } from '../../utils/hooks';

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
  },
  setup(props, { slots }) {
    let [ expanded, toggleExpanded ] = useSwitch(false);
    let [ drawerOn, toggleDrawer ] = useSwitch(false);

    let actions = computed(() => {
      let actions = (props.actions || []) as Array<Action>;
      return {
        sticky: actions.filter(a => a.sticky),
        others: actions.filter(a => !a.sticky).map(opt => {
          return {
            label: opt.label,
            icon: opt.icon,
            onClick: opt.onClick,
          };
        }),
        all: actions,
      };
    });

    let sizeClass = useWindowSizeClass();
    let wideLayout = computed(() => sizeClass.value != 'sm');
    let hasNav = computed(() => !!slots.nav);

    function toggleNav() {
      if (wideLayout.value) {
        toggleExpanded();
      } else {
        toggleDrawer();
      }
    }

    return { drawerOn, toggleNav, actions, sizeClass, wideLayout, expanded, hasNav };
  },
  components: { JButton, JDropdown, JMenu, SvgIcon },
};
</script>

<style src="./Scaffold.scss"></style>