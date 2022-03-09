<template>
  <div>
    <h1>Calendar</h1>
    <code-block :code="calendarPartCode">
      <calendar-part />
    </code-block>
  </div>
</template>

<script setup>
import CalendarPart from './parts/CalendarPart.vue';
import calendarPartCode from './parts/CalendarPart.vue?raw';
</script>