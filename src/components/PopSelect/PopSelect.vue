<template>
  <j-popover
    class="j-pop-select"
    :side="side"
    :trigger="trigger"
    @show="focusInput"
  >
    <div
      class="j-pop-select-inner"
      :data-empty="modelValue === undefined"
    >
      <template v-if="modelValue === undefined">
        <span
          class="j-pop-select-label"
          data-placeholder="true"
        >{{ label }}</span>
        <j-icon name="chevron-down" />
      </template>
      <template v-else>
        <span class="j-pop-select-label">{{ selectedLabel }}</span>
        <j-button
          flat
          round
          icon="close"
          @click="clear"
        />
      </template>
    </div>
    <template #popover="{ toggle }">
      <div class="j-pop-select-menu">
        <j-input
          v-if="showInput"
          ref="inputRef"
          v-model="input"
          clearable
          :placeholder="inputPlaceholder"
        />
        <Scroller v-if="options.length">
          <div class="j-pop-select-menu-inner">
            <select-item
              v-for="opt in options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
              :icon="opt.icon"
              @click="selectOption(opt); toggle()"
            />
          </div>
        </Scroller>
      </div>
    </template>
  </j-popover>  
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  computed,
  nextTick,
  PropType,
} from 'vue';
import JIcon from '@/Icon/Icon.vue';
import JButton from '@/Button/Button.vue';
import JPopover from '@/Popover/Popover.vue';
import SelectItem from '@/Select/SelectItem';
import JInput from '@/Input/Input.vue';
import { Option, OptionValue } from '@/Select/types';
import Scroller from '@/Scroller/Scroller.vue';

export default defineComponent({
  components: {
    JIcon,
    JButton,
    JPopover,
    JInput,
    SelectItem,
    Scroller,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    side: {
      type: String,
      default: 'bottom',
    },
    trigger: {
      type: String,
      default: 'hover',
    },
    modelValue: [Boolean, Number, String] as PropType<OptionValue>,
    options: {
      type: Array as PropType<Option[]>,
      default: [],
    },
    showInput: Boolean,
    inputPlaceholder: String,
  },
  emits: ['update:modelValue', 'search'],
  setup(props, { emit }) {
    let input = ref();

    function selectOption(opt: Option) {
      emit('update:modelValue', opt.value);
    }

    function clear(evt: MouseEvent) {
      evt.stopPropagation();
      emit('update:modelValue', undefined);
    }

    let inputRef = ref();
    function focusInput() {
      nextTick(() => {
        inputRef.value?.focus();
      });
    }

    watch(input, (v) => {
      emit('search', v);
    });

    let valueMap = reactive(new Map);
    watch(
      () => props.options,
      (opts) => {
        opts.forEach(opt => {
          valueMap.set(opt.value, opt.label);
        });
      },
      {
        immediate: true,
      }
    );

    let selectedLabel = computed(() => {
      if (props.modelValue === undefined) return '';
      return valueMap.get(props.modelValue) || '';
    });

    return {
      input,
      inputRef,
      selectedLabel,
      selectOption,
      clear,
      focusInput,
    };
  },
});
</script>

<style src="./PopSelect.scss" lang="scss" />
