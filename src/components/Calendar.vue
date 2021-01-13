<template>
  <div class="j-calendar j-shadow-1">
    <header class="j-calendar-header">
      <j-button flat rounded icon="chevron-back" @click="toPrevMonth" />
      <div class="date">
        <span class="month">{{ currentMonthLabel }}</span>
        <span class="year">{{ currentYear }}</span>
      </div>
      <j-button flat rounded icon="chevron-forward" @click="toNextMonth" />
    </header>
    <div class="j-calendar-grid">
      <header>
        <span v-for="(d, i) in days" :key="i" class="j-calendar-cell">{{ d }}</span>
      </header>
      <main @click="pickDay">
        <span v-for="(d, i) in prevMonth.remain" :key="i" class="j-calendar-cell" data-prev
          :data-picked="pickedDate && pickedDate.date == prevMonth.total - prevMonth.remain + i + 1 && pickedDate.month == prevMonth.month && pickedDate.year == prevMonth.year"
          :data-today="todayDate == prevMonth.total - prevMonth.remain + i + 1 && todayMonth == prevMonth.month && todayYear == prevMonth.year">
          {{ prevMonth.total - prevMonth.remain + i + 1 }}
        </span>
        <span v-for="(d, i) in thisMonthDays" :key="i" class="j-calendar-cell"
          :data-picked="pickedDate && i + 1 == pickedDate.date && pickedDate.month == currentMonth && pickedDate.year == currentYear"
          :data-today="todayDate == i + 1 && todayMonth == currentMonth && todayYear == currentYear">
          {{ i + 1 }}
        </span>
        <span v-for="(d, i) in nextMonth.remain" :key="i" class="j-calendar-cell" data-next
          :data-picked="pickedDate && pickedDate.date == i + 1 && pickedDate.month == nextMonth.month && pickedDate.year == nextMonth.year"
          :data-today="todayDate == i + 1 && todayMonth == nextMonth.month && todayyear && nextYear.year">{{ i + 1 }}</span>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext } from 'vue';
import JButton from './Button.vue';

let monthes = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default {
  emit: ['select'],
  setup(_, { emit }: SetupContext) {
    let today = new Date();
    let todayDate = today.getDate();
    let todayMonth = today.getMonth();
    let todayYear = today.getFullYear();
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let pickedDay = ref<Date>();
    let pickedDate = computed(() => {
      if (!pickedDay.value) return null;
      return {
        date: pickedDay.value.getDate(),
        month: pickedDay.value.getMonth(),
        year: pickedDay.value.getFullYear(),
      };
    });
    let currentYear = ref(today.getFullYear());
    let currentMonth = ref(today.getMonth());
    let currentMonthLabel = computed(() => {
      return monthes[currentMonth.value];
    });

    let prevMonth = computed(() => {
      let total = new Date(currentYear.value, currentMonth.value, 0).getDate();
      let remain = new Date(currentYear.value, currentMonth.value, 1).getDay();
      let year = currentYear.value;
      if (currentMonth.value == 0) {
        year -= 1;
      }
      let month = (12 + currentMonth.value - 1) % 12;
      return {
        total, remain, year, month,
      };
    });

    let thisMonthDays = computed(() => {
      return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
    });

    let nextMonth = computed(() => {
      let year = currentYear.value;
      if (currentMonth.value == 11) {
        year += 1;
      }
      let month = (currentMonth.value + 1) % 12;
      return {
        remain: 6 * 7 - prevMonth.value.remain - thisMonthDays.value,
        month, year,
      };
    });

    function toPrevMonth() {
      if (currentMonth.value == 0) {
        currentYear.value -= 1;
      }
      currentMonth.value = ( 12 + currentMonth.value - 1 ) % 12;
    }

    function toNextMonth() {
      if (currentMonth.value == 11) {
        currentYear.value += 1;
      }
      currentMonth.value = ( currentMonth.value + 1) % 12;
    }

    function pickDay(evt: MouseEvent) {
      let cell = (evt.target! as HTMLElement).closest('.j-calendar-cell') as HTMLElement;
      if (!cell) return;

      let date = parseInt(cell.innerText);
      let month = currentMonth.value;
      let year = currentYear.value;

      if ('prev' in cell.dataset) {
        if (month == 0) {
          month = 11;
          year -= 1;
        } else {
          month -= 1;
        }
      } else if ('next' in cell.dataset) {
        if (month == 11) {
          month = 0;
          year += 1;
        } else {
          month += 1;
        }
      }
      pickedDay.value = new Date(year, month, date);
      emit('select', pickedDay);
    }
    return {
      days, currentYear, currentMonth, currentMonthLabel,
      prevMonth, thisMonthDays, nextMonth,
      toPrevMonth, toNextMonth, pickDay,
      todayDate, todayMonth, todayYear,
      pickedDate,
    };
  },
  components: { JButton },
}
</script>
