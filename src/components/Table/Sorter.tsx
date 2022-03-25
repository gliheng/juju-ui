import { defineComponent, h, PropType } from 'vue';
import SvgIcon from '@/SvgIcon/SvgIcon.vue';
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
          <SvgIcon name="chevron-up-outline" data-on={modelValue === true} />
          <SvgIcon name="chevron-down-outline" data-on={modelValue === false} />
        </div>
      );
    };
  },
});