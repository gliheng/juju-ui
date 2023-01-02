import { defineComponent, h, PropType } from 'vue';
import Icon from '@/Icon/Icon.vue';
import './Table.scss';

export default defineComponent({
  name: 'Sorter',
  props: {
    modelValue: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function onClick() {
      let { modelValue } = props;
      let newValue;
      if (modelValue) {
        newValue = false;
      } else if (modelValue === false) {
        newValue = undefined;
      } else {
        newValue = true;
      }
      emit('update:modelValue', newValue);
    }
    return () => {
      let { modelValue } = props;
      return (
        <div class="j-table-sorter" onClick={ onClick }>
          <Icon name="chevron-up-outline" data-on={modelValue === true} />
          <Icon name="chevron-down-outline" data-on={modelValue === false} />
        </div>
      );
    };
  },
});