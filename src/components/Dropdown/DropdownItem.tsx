import { defineComponent, h } from 'vue';
import SvgIcon from '../SvgIcon.vue';
import { useParent } from '../../utils/vue';

export const DropdownItemSymbol = Symbol('DropdownItemSymbol');

export default defineComponent({
  props: {
    name: String,
    icon: String,
    size: String,
    value: [ String, Number ],
  },
  setup(props, { slots }) {    
    let setActive = useParent<{ setActive: Function }>(DropdownItemSymbol)?.data?.setActive;

    function onClick(evt: MouseEvent) {
      if (typeof setActive == 'function') {
        setActive(props.value);
      }
    }

    const { size, icon } = props;

    return () => {
      return (
        <div class="j-dropdown-item" data-size={size} data-has-icon={!!icon} onClick={onClick} v-ripple>
          <SvgIcon size={ size } name={ icon } />
          <slots.default />
        </div>
      );
    }
  },
});
