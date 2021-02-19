<template>
  <div class="j-date-range-input"
    :data-disabled="disabled"
    :data-focus="selectorOn"
    :data-has-input="!!(startDate || endDate)"
    :data-which="which">
    <div class="j-date-range-input-inner" @click.stop="!disabled && openSelector($event)">
      <input :placeholder="placeholder1 || 'Start date'" data-start="true" @focus="toggleFocus1(true)" @blur="toggleFocus1(false)" v-model="label1" />
      <svg-icon name="arrow-forward-outline" />
      <input :placeholder="placeholder2 || 'End date'" data-end="true" @focus="toggleFocus2(true)" @blur="toggleFocus2(false)" v-model="label2" />
      <svg-icon v-if="clearable" class="j-date-range-input-clear" name="close" @click.stop="clearIpt" />
    </div>
    <transition name="j-fade">
      <div class="j-date-range-input-selector j-shadow-5" v-if="selectorOn" @click.stop>
        <calendar-ui :panelCount="2" :dayLabels="dayLabels" :monthLabels="monthLabels"
          :cellThemingFunction="cellThemingFunction" :refDate="refDate"
          @select="pickDate" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import SvgIcon from '../SvgIcon.vue';
import { useBackdropAwareSwitch, useSwitch } from '../../utils/hooks';
import { formatDate, toDate, isSameDay, isBetween } from '../../utils/date';
import CalendarUi from '../Calendar/CalendarUi.vue';


function themingFunction(startDate: Date, endDate: Date, year: number, month: number, date: number): string {
  let isStart = isSameDay(year, month, date, startDate);
  let isEnd = isSameDay(year, month, date, endDate);
  if (isStart && isEnd) {
    return 'j-calendar-cell-start j-calendar-cell-end';
  } else if (isStart) {
    return 'j-calendar-cell-start';
  } else if (isEnd) {
    return 'j-calendar-cell-end';
  } else if (isBetween(year, month, date, startDate, endDate)) {
    return 'j-calendar-cell-in-range';
  }
  return '';
}

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
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    let [selectorOn, toggleSelector] = useBackdropAwareSwitch();
    let which = ref(0); // which value is editing
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

    watch(selectorOn, v => {
      if (!v) {
        which.value = 0;
      }
    });

    let refDate = ref(new Date());

    let cellThemingFunction = computed(() => {
      return themingFunction.bind(
        null,
        props.startDate as unknown as Date,
        props.endDate as unknown as Date,
      );
    });

    function pickDate(d: Date) {
      if (which.value == 1) {
        // ensure start < end
        if (props.endDate && d > (props.endDate as unknown as Date)) {
          return;
        }
        emit('update:startDate', d);
        which.value = 2;
      } else if (which.value == 2) {
        // ensure start < end
        if (props.startDate && d < (props.startDate as unknown as Date)) {
          return;
        }
        emit('update:endDate', d);
        // delay 1sec, let the user see the selected range
        // setTimeout(() => {
        //   toggleSelector(false);
        // }, 1000);
      }
    }

    function openSelector(evt: Event) {
      let ds = (evt.target as HTMLElement).dataset;
      if (ds.end == 'true') {
        which.value = 2;
      } else {
        which.value = 1;
      }
      toggleSelector(true);
    }

    function clearIpt() {
      emit('update:startDate', null);
      emit('update:endDate', null);
      which.value = 0;
    }

    return {
      focused, which,
      label1, label2,
      selectorOn, toggleSelector,
      toggleFocus1, toggleFocus2,
      refDate, cellThemingFunction,
      pickDate, openSelector,
      clearIpt,
    };
  },
  components: {
    CalendarUi, SvgIcon,
  },
});
</script>

<style>

</style>

<style src="../../assets/styles/DateRangeInput.scss"></style>