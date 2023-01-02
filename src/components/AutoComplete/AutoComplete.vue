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
        <j-listbox-item v-for="(item, i) in suggestions" :key="item.value"
          :class="{ 'j-active': selected == i}"
          @click="choose(i)"
        >
          {{ item.label ?? item.value }}
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

export interface Option {
  label?: string,
  value: string | number,
}

function transformOptions(opts?: (Option | string)[]): Option[] {
  return opts?.map(e => {
    if (typeof e == 'string') {
      return {
        value: e,
      };
    }
    return e;
  }) ?? [];
}

export default defineComponent({
  inheritAttrs: false,
  props: {
    query: {
      type: Function as PropType<(key: string) => Promise<(Option | string)[]>>,
    },
    options: {
      type: Array as PropType<(Option | string)[]>,
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
    let suggestions = ref<Option[]>([]);
    watch(
      () => props.options,
      (opts) => {
        suggestions.value = transformOptions(opts);
      },
      {
        immediate: true,
      }
    );

    let onInput = debounce(async (key: string) => {
      if (!key && props.options) {
        suggestions.value = transformOptions(props.options);
        toggleList(true);
        selected.value = 0;
      } else if (props.query) {
        let res = await props.query(key);
        if (res.length) {
          toggleList(true);
          selected.value = 0;
          suggestions.value = res.map(e => {
            if (typeof e == "string") {
              return {
                value: e,
              };
            }
            return e;
          });
        }
      }
    }, props.debounce);

    function choose(i: number) {
      selected.value = i;
      let opt = suggestions.value[selected.value];
      let value = String(opt.value);
      searchKey.value = value;
      toggleList(false);
      emit('select', value, opt);
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
        choose(selected.value);
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
