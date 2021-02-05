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
        <!-- prev month cells -->
        <span v-for="(d, i) in prevMonth.days" :key="i" class="j-calendar-cell" data-prev
          :data-picked="d.picked"
          :data-today="d.today">
          {{ d.date }}
        </span>
        <!-- this month cells -->
        <span v-for="(d, i) in thisMonth.days" :key="i" class="j-calendar-cell"
          :data-picked="d.picked"
          :data-today="d.today">
          {{ d.date }}
        </span>
        <!-- next month cells -->
        <span v-for="(d, i) in nextMonth.days" :key="i" class="j-calendar-cell" data-next
          :data-picked="d.picked"
          :data-today="d.today">{{ d.date }}</span>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import JButton from './Button.vue';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(year: number, month: number, date: number, d?: Date): boolean {
  if (!d) return false;
  return year == d.getFullYear() && month == d.getMonth() && date == d.getDate();
}

export default defineComponent({
  props: {
    modelValue: Date,
    dayLabels: Array,
    monthLabels: Array,
  },
  emit: ['update:modelValue'],
  setup(props, { emit }) {
    let now = new Date();
    // drop time value
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let days = props.dayLabels || DAYS;
    let pickedDate = computed(() => {
      return props.modelValue as unknown as Date;
    });

    let currentYear = ref((props.modelValue as unknown as Date || today).getFullYear());
    let currentMonth = ref((props.modelValue  as unknown as Date|| today).getMonth());
    let currentMonthLabel = computed(() => {
      return (props.monthLabels || MONTHES)[currentMonth.value];
    });

    let prevMonth = computed(() => {
      let total = new Date(currentYear.value, currentMonth.value, 0).getDate();
      let remain = new Date(currentYear.value, currentMonth.value, 1).getDay();
      let year = currentYear.value;
      if (currentMonth.value == 0) {
        year -= 1;
      }
      let month = (12 + currentMonth.value - 1) % 12;
      let days = [];
      for (let i = 1; i < remain + 1; i++) {
        let date = total - remain + i;
        days.push({
          picked: isSameDay(year, month, date, pickedDate.value),
          today: isSameDay(year, month, date, today),
          date,
        });
      }
      return {
        total, remain, year, month, days,
      };
    });

    let thisMonth = computed(() => {
      // how many days in this month
      let total = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
      let days = [];
      for (let i = 1; i <= total; i++) {
        days.push({
          picked: isSameDay(currentYear.value, currentMonth.value, i, pickedDate.value),
          today: isSameDay(currentYear.value, currentMonth.value, i, today),
          date: i,
        });
      }
      return {
        total,
        days,
      };
    });

    let nextMonth = computed(() => {
      let year = currentYear.value;
      // if this month is December, next month belong to new year
      if (currentMonth.value == 11) {
        year += 1;
      }
      let month = (currentMonth.value + 1) % 12;
      // We have 6 * 7 cells to display
      // We need to generate this many days
      let remain = 6 * 7 - prevMonth.value.remain - thisMonth.value.total;
      let days = [];
      for (let i = 1; i <= remain; i++) {
        days.push({
          date: i,
          picked: isSameDay(year, month, i, pickedDate.value),
          today: isSameDay(year, month, i, today),
        });
      }
      return {
        month, year, days, remain,
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

      let day = parseInt(cell.innerText);
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
      let date = new Date(year, month, day);
      emit('update:modelValue', date);
    }

    return {
      days, currentYear, currentMonth, currentMonthLabel,
      prevMonth, thisMonth, nextMonth,
      toPrevMonth, toNextMonth, pickDay,
      today,
      pickedDate, isSameDay,
    };
  },
  components: { JButton },
});
</script>
