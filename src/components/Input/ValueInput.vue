<template>
  <div class="j-value-input" :class="{'j-focus': focus}">
    <template v-if="type == 'slider'">
      <div class="j-value-inner">
        <input v-model.lazy="value" @focus="onFocus" @blur="onBlur" />
        <j-button @click.stop="toggleSlider" icon="chevron-down" flat @mousedown.prevent />
      </div>
      <div class="j-slider-outer j-shadow-3" v-if="sliderOn" @click.stop>
        <j-slider v-model="value" :min="min" :max="max" :step="step" />
      </div>
    </template>
    <template v-else-if="type == 'button'">
      <div class="j-value-inner">
        <j-button @click.stop="dec" icon="remove" flat @mousedown.prevent :disabled="!canDec" />
        <input v-model.lazy="value" @focus="onFocus" @blur="onBlur" />
        <j-button @click.stop="inc" icon="add" flat @mousedown.prevent :disabled="!canInc" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext } from 'vue';
import SvgIcon from '../SvgIcon.vue';
import JSlider from '../Slider.vue';
import JButton from '../Button.vue';
import JInput from './Input.vue';

export default {
  props: {
    type: {
      type: String,
      default: 'button',
      // validator(v: string) {
      //   return v == 'button' || v == 'slider';
      // },
    },
    modelValue: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }: SetupContext) {
    let focus = ref(false);

    function inc() {
      emit('update:modelValue', Math.min(props.modelValue + props.step, props.max));
    }
    function dec() {
      emit('update:modelValue', Math.max(props.modelValue - props.step, props.min));
    }
    let canDec = computed<boolean>(() => props.modelValue > props.min);
    let canInc = computed<boolean>(() => props.modelValue < props.max);
    let value = computed<string>({
      get() {
        return props.modelValue + '';
      },
      set(v) {
        let v2 = parseInt(v);
        v2 = round(v2, props.min, props.step);
        if (typeof props.min === 'number') {
          v2 = Math.max(props.min, v2);
        }
        if (typeof props.max === 'number') {
          v2 = Math.min(props.max, v2);
        }
        emit('update:modelValue', v2);
      },
    });

    let sliderOn = ref(false);

    function toggleSlider() {
      sliderOn.value = !sliderOn.value;
      if (sliderOn.value) {
        document.addEventListener('click', hideSlider, { once: true });
      }
    }

    function hideSlider(evt: MouseEvent) {
      sliderOn.value = false;
    }

    function selectAll(evt: FocusEvent) {
      (evt.target as HTMLInputElement).select();
    }

    function onFocus() {
      focus.value = true;
    }

    function onBlur() {
      focus.value = false;
    }

    return {
      value, sliderOn, toggleSlider, onFocus, onBlur, focus,
      inc, dec, canDec, canInc,
    };
  },
  components: { SvgIcon, JInput, JSlider, JButton },
};

function round(value: number, min: number, step: number): number {
  let r = Math.floor((value - min) / step);
  let m = min + r * step;
  let n = m + step;
  if (value - m <= n - value) {
    return m;
  }
  return n;
}

</script>
