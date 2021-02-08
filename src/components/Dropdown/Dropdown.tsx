import { defineComponent, h, computed } from 'vue';
import { useBackdropAwareSwitch } from '../../utils/hooks';
import DropdownItem from './_DropdownItem';
import SvgIcon from '../SvgIcon.vue';
import '../../assets/styles/Dropdown.scss';

type OptionValue = string | number | boolean;

interface SimpleOption {
  label: string,
  value: OptionValue,
  icon?: string,
  onClick?: () => void,
};

type Option = SimpleOption | {
  type: string,
};

export default defineComponent({
  props: {
    placeholder: String,
    modelValue: [ String, Number, Boolean, Array ],
    multiple: Boolean,
    options: {
      type: Array,
      default: [],
    },
    align: {
      type: String,
      default: 'left',
    },
    iconSize: {
      type: String,
      default: 'md',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    let [ menuOn, toggleMenu ] = useBackdropAwareSwitch(false);

    let selected = computed(() => {
      if (props.multiple) {
        return (props.modelValue as OptionValue[]).map(v => {
          return getOptionByValue(v)?.label;
        }).filter(v => Boolean(v)).join(', ');
      }
      let opt = getOptionByValue(props.modelValue as OptionValue);
      return opt?.label || '';
    });

    let hasIcon = computed(() => (props.options as Option[]).some(opt => 'icon' in opt));

    function getOptionByValue(value: OptionValue): SimpleOption | undefined {
      return (props.options as Option[]).find(opt => {
        return 'value' in opt && opt.value == value;
      }) as SimpleOption | undefined;
    }

    function select(value: OptionValue, evt: Event) {
      if (props.multiple) {
        let modelValue = props.modelValue as OptionValue[];
        let idx = modelValue.indexOf(value);
        if (idx != -1) {
          modelValue.splice(idx, 1);
        } else {
          modelValue.push(value);
        }
        evt.stopPropagation();
      } else {
        emit('update:modelValue', value);
      }
      
      // trigger onClick on option defination
      let opt = getOptionByValue(value);
      if (opt && typeof opt.onClick == 'function') {
        opt.onClick();
      }
    }

    return () => {
      let content: any;
      if (slots.button) {
        content = <slots.button />;
      } else {
        let label;
        if (selected.value) {
          let text = selected.value;
          if (props.multiple && props.modelValue.length == props.options.length) {
            text = 'All';
          }
          label = <span title={ selected.value }>{ text }</span>;
        } else {
          label = (
            <span class="j-placeholder">{ props.placeholder }</span>
          );
        }
        content = (
          // tabindex 0 make the item tab focusable
          <div class="j-dropdown-label" tabindex={0}>
            <div class="j-dropdown-label-inner">{ label }</div>
            <SvgIcon class="j-dropdown-icon" name="chevron-down" />
          </div>
        );
      }
  
      return (
        <div class="j-dropdown"
          data-align={ props.align }
          data-has-icon={ hasIcon.value }
          onClick={evt => {
            evt.stopPropagation();
            toggleMenu();
          }}>
          { content }
          { menuOn.value && (
            <div class="j-dropdown-menu">
              {
                props.options.map((opt: any, i) => {
                  if (opt.type == 'seperator') {
                    return <hr key={i} class="j-dropdown-seperator" />;
                  }
                  let checked;
                  if (props.multiple) {
                    checked = (props.modelValue as OptionValue[]).indexOf(opt.value) != -1;
                  }
                  return (
                    <DropdownItem key={opt.value}
                      checked={checked}
                      value={opt.value}
                      icon={opt.icon}
                      size={props.iconSize} label={opt.label}
                      onClick={select.bind(null, opt.value)} />
                  );
                })
              }
            </div>
          )}
        </div>
      );
    }
  },
});
