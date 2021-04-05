<template>
  <div class="j-auto-complete">
    <j-input v-model="searchKey" :placeholder="placeholder"
      @update:modelValue="onInput" @click="onClick"
      @keydown.up="onKeyUp" @keydown.down="onKeyDown" @keyup.enter="onEnter" />
    <j-scroller v-if="listOn && suggestions.length" class="j-shadow-5">
      <j-listbox>
        <j-listbox-item v-for="(item, i) in suggestions" :key="item.value"
          :class="{ 'j-active': selected == i}"
          @click="choose(item.value, i)">{{ item.label }}</j-listbox-item>
      </j-listbox>
    </j-scroller>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// @ts-ignore
import { hooks } from 'juju-ui/utils';


interface Suggestion {
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
    let [ listOn, toggleList ] = hooks.useBackdropAwareSwitch(false);
    let searchKey = ref('');
    let selected = ref(0);
    let suggestions = ref<Suggestion[]>([]);

    async function onInput(key: string) {
      if (!key) return;

      let res = await props.query(key);
      if (res.length) {
        toggleList(true);
        selected.value = 0;
        suggestions.value = res;
      }
    }

    function choose(key: string, i?: number) {
      if (typeof i == 'number') {
        selected.value = i;
      }
      searchKey.value = key;
      toggleList(false);
      emit('select', key);
    }

    function onClick(evt: Event) {
      console.log('onClick');
      // show suggestion list when clicked
      if (suggestions.value.length) {
        evt.stopPropagation();
        toggleList(true);
      }
    }

    function onEnter() {
      if (listOn.value && suggestions.value.length) {
        let v = suggestions.value[selected.value].value;
        choose(String(v));
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
  }
});
</script>

<style lang="scss">
.j-auto-complete {
  position: relative;
  .j-scroller {
    position: absolute;
    width: 100%;
    max-height: 300px;
    background-color: white;
    .j-listbox-item {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>