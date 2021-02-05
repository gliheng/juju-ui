<template>
  <div class="j-date-range-input" :data-disabled="disabled" :data-focus="selectorOn">
    <div class="j-date-range-input-inner" @click.stop="!disabled && toggleSelector(true)">
      <input :placeholder="placeholder1 || 'Start date'" @focus="toggleFocus1(true)" @blur="toggleFocus1(false)" v-model="label1" />
      <svg-icon name="arrow-forward-outline" />
      <input :placeholder="placeholder2 || 'End date'" @focus="toggleFocus2(true)" @blur="toggleFocus2(false)" v-model="label2" />
    </div>
    <div class="j-date-range-input-selector" v-if="selectorOn" @click.stop>
      <j-calendar :dayLabels="dayLabels" :monthLabels="monthLabels" :modelValue="startDate" @update:modelValue="onFirstSelect" />
      <j-calendar :dayLabels="dayLabels" :monthLabels="monthLabels" :modelValue="endDate" @update:modelValue="onSecondSelect" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SvgIcon from '../SvgIcon.vue';
import { useBackdropAwareSwitch, useSwitch } from '../../utils/vue';
import { formatDate, toDate } from '../../utils/date';
import JCalendar from '../Calendar.vue';

export default defineComponent({
  props: {
    placeholder1: String,
    placeholder2: String,
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    disabled: Boolean,
    dayLabels: Array,
    monthLabels: Array,
  },
  setup(props, { emit }) {
    let [selectorOn, toggleSelector] = useBackdropAwareSwitch();
    let [focus1, toggleFocus1] = useSwitch();
    let [focus2, toggleFocus2] = useSwitch();
    let focused = computed(() => focus1.value && focus2.value);
    let label1 = computed({
      get() {
        return formatDate(props.startDate as unknown as Date);
      },
      set(s: string) {
        let date = toDate(s);
        if (date) {
          emit('update:startDate', date);
        }
      },
    });

    let label2 = computed({
      get() {
        return formatDate(props.endDate as unknown as Date);
      },
      set(s: string) {
        let date = toDate(s);
        if (date) {
          emit('update:endDate', date);
        }
      },
    });

    function onFirstSelect(v: Date) {
      emit('update:startDate', v);
    }
    
    function onSecondSelect(v: Date) {
      emit('update:endDate', v);
    }

    return {
      focused,
      label1, label2,
      selectorOn, toggleSelector,
      toggleFocus1, toggleFocus2,
      onFirstSelect, onSecondSelect,
    };
  },
  components: {
    JCalendar, SvgIcon,
  },
});
</script>

<style>

</style>