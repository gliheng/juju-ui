import { defineComponent, h, PropType, withDirectives } from 'vue';
import Icon from '../Icon/Icon.vue';
import Checkbox from '../Checkbox/Checkbox.vue';
import ripple from '@directives/ripple';
import './SelectItem.scss';

export default defineComponent({
  props: {
    value: [ String, Number, Boolean ],
    label: String,
    icon: String,
    size: String,
    onClick: Function as PropType<(evt: MouseEvent) => void>,
    checked: {
      type: Boolean,
      default: undefined,
    },
  },
  directives: { ripple },
  setup(props) {    
    return () => {
      return withDirectives(
        // @ts-ignore
        <div class="j-select-item" data-has-icon={ !!props.icon }
          onClick={props.onClick}>
          { props.checked !== undefined && <Checkbox modelValue={props.checked} />}
          <Icon name={ props.icon } size={ props.size } />
          { props.label }
        </div>, [[ripple]]
      );
    }
  },
});
