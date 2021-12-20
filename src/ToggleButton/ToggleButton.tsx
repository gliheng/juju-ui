import { defineComponent, computed, h, VNode } from 'vue';
import Button from '../Button/Button.vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    onIcon: String,
    offIcon: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    let hasAlt = computed(() => {
      return slots.on && slots.off;
    });
    let on = computed(() => {
      return props.modelValue;
    });
    function toggle() {
      emit('update:modelValue', !props.modelValue)
    }
    return () => {
      let { onIcon, offIcon } = props;
      let content: VNode[];
      if (slots.on && hasAlt.value && on.value) {
        content = slots.on();
      } else if (slots.off && hasAlt.value) {
        content = slots.off();
      } else if (slots.default) {
        content = slots.default();
      } else {
        throw 'no content';
      }
      return (
        <Button
          onClick={ toggle }
          icon={ on.value ? onIcon : offIcon }
          outlined={ !on.value }
        >
          { content }
        </Button>
      );
    };
  }
});
