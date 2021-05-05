<template>
  <div class="j-calendar">
    <div class="j-calendar-panel" v-for="(panel, i) in panels" :key="i">
      <header class="j-calendar-header">
        <j-button v-if="i === 0" flat rounded icon="chevron-back" @click="toPrevMonth" />
        <div class="date">
          <span class="month">{{ panel.monthLabel }}</span>
          <span class="year">{{ panel.year }}</span>
        </div>
        <j-button v-if="i === panels.length - 1" flat rounded icon="chevron-forward" @click="toNextMonth" />
      </header>
      <div class="j-calendar-grid">
        <header>
          <span v-for="(d, i) in dayLabels" :key="i" class="j-calendar-cell">{{ d }}</span>
        </header>
        <main @click="pickDay($event, panel.year, panel.month)" @mouseleave="$emit('hover-cancel')">
          <!-- prev month cells -->
          <div v-for="(d, i) in panel.prev.days" :key="i" class="j-calendar-cell" data-prev>
            {{ d.date }}
          </div>
          <!-- this month cells -->
          <div v-for="(d, i) in panel.current.days" :key="i" :class="['j-calendar-cell', d.className]"
            :data-active="true"
            :data-date="d.date"
            :data-picked="d.picked"
            :data-today="d.today"
            @mouseenter="$emit('hover', panel.year, panel.month, d.date)">
            <div class="j-calendar-cell-inner">{{ d.date }}</div>
          </div>
          <!-- next month cells -->
          <div v-for="(d, i) in panel.next.days" :key="i" class="j-calendar-cell" data-next>
            {{ d.date }}
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import JButton from '../Button/Button.vue';
import { isSameDay } from '../../utils/date';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function generatePanelData(
  currentYear: number,
  currentMonth: number,
  today: Date,
  cellThemingFunction?: Function,
) {
  let prev;
  {
    let total = new Date(currentYear, currentMonth, 0).getDate();
    let remain = new Date(currentYear, currentMonth, 1).getDay();
    let year = currentYear;
    if (currentMonth == 0) {
      year -= 1;
    }
    let month = (12 + currentMonth - 1) % 12;
    let days = [];
    for (let i = 1; i < remain + 1; i++) {
      let date = total - remain + i;
      days.push({
        date,
        // today: isSameDay(year, month, date, today),
      });
    }
    prev = {
      total, remain, year, month, days,
    };
  }
  let current;
  {
    // how many days in this month
    let total = new Date(currentYear, currentMonth + 1, 0).getDate();
    let days = [];
    for (let i = 1; i <= total; i++) {
      let className = '';
      let date = i;
      if (cellThemingFunction) {
        className = cellThemingFunction(currentYear, currentMonth, date);
      }

      days.push({
        today: isSameDay(currentYear, currentMonth, i, today),
        className, date,
      });
    }
    current = {
      total,
      days,
    };
  }
  let next;
  {
    let year = currentYear;
    // if this month is December, next month belong to new year
    if (currentMonth == 11) {
      year += 1;
    }
    let month = (currentMonth + 1) % 12;
    // We have 6 * 7 cells to display
    // We need to generate this many days
    let remain = 6 * 7 - prev.remain - current.total;
    let days = [];
    for (let i = 1; i <= remain; i++) {
      let date = i;
      days.push({
        date,
        // today: isSameDay(year, month, date, today),
      });
    }
    next = {
      month, year, days, remain,
    };
  }
  return {
    prev, current, next,
  };
}

export default defineComponent({
  props: {
    dayLabels: Array,
    monthLabels: Array,
    panelCount: {
      type: Number,
      default: 1,
    },
    cellThemingFunction: Function,
    refDate: Date,
  },
  emit: [
    'select',
    'hover',
    'hover-cancel',
  ],
  setup(props, { emit }) {
    let now = new Date();
    // drop time value
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let dayLabels = props.dayLabels || DAYS;

    let currentYear = ref((props.refDate as unknown as Date || today).getFullYear());
    let currentMonth = ref((props.refDate  as unknown as Date|| today).getMonth());

    let panels = computed(() => {
      let panels = [];
      let year = currentYear.value;
      let month = currentMonth.value;
      for (let i = 0; i < props.panelCount; i++) {
        let data = {
          monthLabel: (props.monthLabels || MONTHES)[month],
          year,
          month,
          ...generatePanelData(year, month, today, props.cellThemingFunction),
        };
        panels.push(data);
        month++;
        if (month == 12) {
          month = 0;
          year += 1;
        }
      }
      return panels;
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

    function pickDay(evt: MouseEvent, year: number, month: number) {
      let cell = (evt.target! as HTMLElement).closest('.j-calendar-cell') as HTMLElement;
      if (!cell) return;

      let { date } = cell.dataset;
      if (!date) return;

      let day = parseInt(date);
      // // selecting gray cells in each month need some calculation
      // if ('prev' in cell.dataset) {
      //   if (month == 0) {
      //     month = 11;
      //     year -= 1;
      //   } else {
      //     month -= 1;
      //   }
      // } else if ('next' in cell.dataset) {
      //   if (month == 11) {
      //     month = 0;
      //     year += 1;
      //   } else {
      //     month += 1;
      //   }
      // }
      emit('select', new Date(year, month, day));
    }

    return {
      dayLabels, currentYear, currentMonth,
      panels,
      toPrevMonth, toNextMonth, pickDay,
      today,
      isSameDay,
    };
  },
  components: { JButton },
});
</script>

<style lang="scss" src="./Calendar.scss"></style>
