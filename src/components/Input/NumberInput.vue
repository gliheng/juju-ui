<template>
  <div class="j-number-input" :class="{'j-focus': focus}" :data-type="type">
    <template v-if="type == 'slider'">
      <div class="j-number-input-inner">
        <input v-model.lazy="value" @focus="onFocus" @blur="onBlur" />
        <j-button @click.stop="toggleSlider" icon="chevron-down" flat type="button" @mousedown.prevent />
      </div>
      <div class="j-slider-outer j-shadow-3" v-if="sliderOn" @click.stop>
        <j-slider v-model="value" :min="min" :max="max" :step="step" />
      </div>
    </template>
    <template v-else-if="type == 'horizontal'">
      <div class="j-number-input-inner">
        <j-button @click.stop="dec" icon="remove" flat type="button" @mousedown.prevent :disabled="!canDec" />
        <input v-model.lazy="value" @focus="onFocus" @blur="onBlur" />
        <j-button @click.stop="inc" icon="add" flat @mousedown.prevent :disabled="!canInc" />
      </div>
    </template>
    <template v-else-if="type == 'vertical'">
      <div class="j-number-input-inner">
        <input v-model.lazy="value" @focus="onFocus" @blur="onBlur" />
        <div class="j-number-input-btns">
          <j-button @click.stop="inc" icon="chevron-up" flat type="button" @mousedown.prevent :disabled="!canInc" />
          <j-button @click.stop="dec" icon="chevron-down" flat type="button" @mousedown.prevent :disabled="!canDec" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import JIcon from '../Icon/Icon.vue';
import JSlider from '../Slider/Slider.vue';
import JButton from '../Button/Button.vue';
import JInput from './Input.vue';

export default defineComponent({
  components: { JIcon, JInput, JSlider, JButton },
  props: {
    type: {
      type: String,
      default: 'vertical',
      // validator(v: string) {
      //   return v == 'button' || v == 'slider';
      // },
    },
    modelValue: {
      type: Number,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    let focus = ref(false);

    function inc() {
      let v = props.modelValue === undefined ? 0 : props.modelValue;
      v += props.step;
      if (props.max !== undefined) {
        v = Math.min(v, props.max);
      }
      emit('update:modelValue', v);
    }
    function dec() {
      let v = props.modelValue === undefined ? 0 : props.modelValue;
      v -= props.step;
      if (props.min !== undefined) {
        v = Math.max(v, props.min);
      }
      emit('update:modelValue', v);
    }
    let canDec = computed<boolean>(
      () => props.modelValue == undefined || props.min === undefined || props.modelValue > props.min
    );
    let canInc = computed<boolean>(
      () => props.modelValue === undefined || props.max === undefined || props.modelValue < props.max
    );
    let value = computed<number | undefined>({
      get() {
        return props.modelValue;
      },
      set(v) {
        if (!v) return undefined;
        let v2;
        if (typeof v == 'string') {
          v2 = parseInt(v);
        } else {
          v2 = v;
        }
        v2 = round(v2, props.min || 0, props.step);
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
});

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

<style src="./NumberInput.scss"></style>