<template>
  <calendar-ui :refDate="modelValue" @select="selectDate" :cellThemingFunction="cellThemingFunction" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import CalendarUi from './CalendarUi.vue';
import { isSameDay } from '@utils/date';

function themingFunction(pickedDate: Date, year: number, month: number, date: number) {
  if (isSameDay(year, month, date, pickedDate)) {
    return 'j-calendar-cell-picked';
  }
  return '';
}

export default defineComponent({
  props: {
    modelValue: Date,
  },
  setup(props, { emit }) {
    let pickedDate = computed(() => {
      return props.modelValue as unknown as Date;
    });

    let cellThemingFunction = computed(() => {
      return themingFunction.bind(null, pickedDate.value);
    });
    
    function selectDate(d: Date) {
      emit('update:modelValue', d);
    }
    
    return {
      selectDate,
      cellThemingFunction,
    };
  },
  components: {
    CalendarUi,
  },
});
</script>