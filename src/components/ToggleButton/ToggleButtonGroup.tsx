import { defineComponent, computed, h } from 'vue';
import ToggleButton from './ToggleButton';
import "../../assets/styles/ToggleButton.scss";

export default defineComponent({
  props: {
    modelValue: Number,
    // When this option is on, this group can not be toggled off by clicked an on button
    force: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots, emit }) {
    let nodes = computed(() => {
      if (slots.default) {
        let nodes = slots.default();

        nodes.forEach((n, idx) => {
          if (n.type == ToggleButton) {
            n.props = Object.assign({}, n.props, {
              'modelValue': props.modelValue === idx,
              'onUpdate:modelValue': (v: boolean) => {
                if (v) {
                  emit('update:modelValue', idx);
                } else if (!props.force) {
                  emit('undate:modelValue', undefined);
                }
              }
            });
          }
        });
        return nodes;
      }
      return [];
    });

    return () => {
      return (
        <div class="j-toggle-button-group">
          { nodes.value }
        </div>
      );
    }
  },
});
