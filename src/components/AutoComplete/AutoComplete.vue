<template>
  <div class="j-auto-complete">
    <j-input
      v-model="searchKey"
      @update:modelValue="onInput"
      @click="onClick"
      @keydown.up="onKeyUp"
      @keydown.down="onKeyDown"
      @keyup.enter="onEnter"
      v-bind="$attrs"
    >
      <template v-if="$slots.prepend" #prepend>
        <slot name="prepend"></slot>
      </template>
      <template v-if="$slots.append" #append>
        <slot name="append"></slot>
      </template>
    </j-input>
    <j-scroller v-if="listOn && suggestions.length" class="j-shadow-5">
      <j-listbox>
        <j-listbox-item v-for="(item, i) in suggestions" :key="item"
          :class="{ 'j-active': selected == i}"
          @click="choose(item, i)"
        >
          {{ item }}
        </j-listbox-item>
      </j-listbox>
    </j-scroller>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';
import JInput from '../Input/Input.vue';
import { debounce } from '@utils/timer';
import { useBackdropAwareSwitch } from '@utils/hooks';

export default defineComponent({
  inheritAttrs: false,
  props: {
    query: {
      type: Function,
    },
    options: {
      type: Array as PropType<string[]>,
    },
    debounce: {
      type: Number,
      default: 300,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    let [ listOn, toggleList ] = useBackdropAwareSwitch(false);
    let searchKey = ref('');
    let selected = ref(0);
    let suggestions = ref<string[]>([]);
    watch(
      () => props.options,
      (opts) => {
        if (opts) {
          suggestions.value = [...opts];
        }
      },
      {
        immediate: true,
      }
    );

    let onInput = debounce(async (key: string) => {
      if (!key && props.options) {
        suggestions.value = props.options;
        toggleList(true);
        selected.value = 0;
      } else if (props.query) {
        let res = await props.query(key);
        if (res.length) {
          toggleList(true);
          selected.value = 0;
          suggestions.value = res;
        }
      }
    }, props.debounce);

    function choose(value: string, i?: number) {
      if (typeof i == 'number') {
        selected.value = i;
      }
      searchKey.value = value;
      toggleList(false);
      emit('select', value);
    }

    function onClick(evt: Event) {
      // show suggestion list when clicked
      if (suggestions.value.length) {
        evt.stopPropagation();
        toggleList(true);
      }
    }

    function onEnter() {
      if (listOn.value && suggestions.value.length) {
        let v = suggestions.value[selected.value];
        choose(v, selected.value);
      } else {
        emit('select', searchKey.value);
      }
    }

    function onKeyDown() {
      selected.value = Math.min(selected.value + 1, suggestions.value.length - 1);
    }

    function onKeyUp() {
      selected.value = Math.max(selected.value - 1, 0);
    }

    return {
      listOn,
      onInput,
      searchKey,
      suggestions,
      selected,
      choose,
      onClick,
      onEnter,
      onKeyUp,
      onKeyDown,
    };
  },
  components: { JInput },
});
</script>

<style src="./AutoComplete.scss"></style>
