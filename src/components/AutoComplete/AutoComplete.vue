<template>
  <div class="j-auto-complete">
    <j-input v-model="searchKey" :placeholder="placeholder"
      @update:modelValue="onInput" @click="onClick"
      @keydown.up="onKeyUp" @keydown.down="onKeyDown" @keyup.enter="onEnter" />
    <j-scroller v-if="listOn && suggestions.length" class="j-shadow-5">
      <j-listbox>
        <j-listbox-item v-for="(item, i) in suggestions" :key="String(item.value)"
          :class="{ 'j-active': selected == i}"
          @click="choose(item.value, i)">{{ item.label }}</j-listbox-item>
      </j-listbox>
    </j-scroller>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import JInput from '../Input/Input.vue';
import { debounce } from '../../utils/timer';
import { useBackdropAwareSwitch } from '../../utils/hooks';

export interface Suggestion {
  label: string,
  value: string | number,
}

export default defineComponent({
  props: {
    placeholder: String,
    query: {
      type: Function,
      required: true,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    let [ listOn, toggleList ] = useBackdropAwareSwitch(false);
    let searchKey = ref('');
    let selected = ref(0);
    let suggestions = ref<Suggestion[]>([]);

    let onInput = debounce(async (key: string) => {
      if (!key) return;

      let res = await props.query(key);
      if (res.length) {
        toggleList(true);
        selected.value = 0;
        suggestions.value = res;
      }
    }, 1000);

    function choose(value: string | number, i?: number) {
      if (typeof i == 'number') {
        selected.value = i;
      }
      searchKey.value = String(value);
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
        let v = suggestions.value[selected.value].value;
        choose(v);
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