import { defineComponent, h } from 'vue';
import SvgIcon from '../SvgIcon.vue';
import Checkbox from '../Checkbox.vue';
import ripple from '../../directives/ripple';

export default defineComponent({
  props: {
    value: [ String, Number, Boolean ],
    label: String,
    icon: String,
    size: String,
    onClick: Function,
    checked: Boolean,
  },
  directives: { ripple },
  setup(props) {    
    return () => {
      return (
        <div class="j-dropdown-item" data-has-icon={ !!props.icon }
          onClick={props.onClick as any} v-ripple>
          { props.checked !== undefined && <Checkbox modelValue={props.checked} />}
          <SvgIcon name={ props.icon } size={ props.size } />
          { props.label }
        </div>
      );
    }
  },
});
