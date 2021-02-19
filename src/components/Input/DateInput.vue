<template>
  <div class="j-date-input">
    <j-input v-bind="$attrs" v-model="label" @click.stop="showSelector">
      <template #append>
        <svg-icon name="calendar-outline" />
      </template>
    </j-input>
    <transition name="j-fade">
      <div v-if="selectorOn" class="j-date-input-selector j-shadow-5" @click.stop>
        <j-calendar :dayLabels="dayLabels" :monthLabels="monthLabels" @update:modelValue="onSelect" :modelValue="modelValue" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBackdropAwareSwitch } from '../../utils/hooks';
import { formatDate, toDate } from '../../utils/date';
import SvgIcon from '../SvgIcon.vue';
import JInput from './Input.vue';
import JCalendar from '../Calendar/Calendar.vue';

export default defineComponent({
  props: {
    modelValue: Date,
    dayLabels: Array,
    monthLabels: Array,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    let [ selectorOn, toggleSelector ] = useBackdropAwareSwitch();
    let label = computed({
      get() {
        return formatDate(props.modelValue as unknown as Date);
      },
      set(v: string) {
        let date = toDate(v);
        emit('update:modelValue', date);
      },
    });

    function showSelector() {
      toggleSelector(true);
    }

    function onSelect(v: Date) {
      toggleSelector(false);
      emit('update:modelValue', v);
    }

    return { label, showSelector, selectorOn, onSelect };
  },
  components: {
    JInput, SvgIcon, JCalendar,
  },
});
</script>

<style src="../../assets/styles/DateInput.scss"></style>