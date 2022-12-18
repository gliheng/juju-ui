import { defineComponent, h, computed, PropType, VNode } from 'vue';
import { useBackdropAwareSwitch } from '@utils/hooks';
import Icon from '@/Icon/Icon.vue';
import Button from '@/Button/Button.vue';
import Scroller from '@/Scroller/Scroller.vue';
import SelectItem from './SelectItem';
import './Select.scss';
import { Option, OptionValue } from './types';

type OptionWithType = Option | {
  type: string,
};

export default defineComponent({
  props: {
    placeholder: String,
    modelValue: [ String, Number, Boolean, Array ],
    multiple: Boolean,
    options: {
      type: Array as PropType<OptionWithType[]>,
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
    clearable: Boolean,
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

    let hasIcon = computed(() => props.options.some(opt => 'icon' in opt));

    function getOptionByValue(value: OptionValue): Option | undefined {
      return props.options.find(opt => {
        return 'value' in opt && opt.value == value;
      }) as Option | undefined;
    }

    function select(opt: Option, evt: Event) {
      let { value } = opt;
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

      if (typeof opt.onClick == 'function') {
        opt.onClick();
      }
    }

    function clearInput(evt: MouseEvent) {
      evt.stopPropagation();
      emit('update:modelValue', undefined);
    }

    return () => {
      let content: VNode[];
      let clearable = props.modelValue && props.clearable;
      if (slots.default) {
        content = slots.default();
      } else {
        let label;
        if (selected.value) {
          let text = selected.value;
          if (
            props.multiple
            && Array.isArray(props.modelValue)
            && props.modelValue.length == props.options.length
          ) {
            text = 'All';
          }
          label = <span title={ selected.value }>{ text }</span>;
        } else {
          label = (
            <span class="j-placeholder">{ props.placeholder }</span>
          );
        }

        let clearIcon;
        if (clearable) {
          clearIcon = (
            <Button
              class="j-select-clear-btn"
              flat
              round
              icon="close-outline"
              onClick={clearInput}
            />
          );
        }  
        content = [
          <div class="j-select-label" tabindex={0}>
            <div class="j-select-label-inner">{ label }</div>
            <Icon class="j-select-icon" name="chevron-down" />
            { clearIcon }
          </div>
        ];
      }

      return (
        <div class="j-select"
          data-align={ props.align }
          data-clearable={ clearable }
          data-has-icon={ hasIcon.value }
          onClick={evt => {
            evt.stopPropagation();
            toggleMenu();
          }}>
          { content }
          { menuOn.value && (
            <div class="j-select-menu">
              <Scroller>
                {() => (
                  <div class="j-select-menu-inner">
                    {props.options.map((opt: any, i) => {
                      if (opt.type == 'seperator') {
                        return <hr key={i} class="j-select-seperator" />;
                      }
                      let checked;
                      if (props.multiple && Array.isArray(props.modelValue)) {
                        checked = props.modelValue.indexOf(opt.value) != -1;
                      }
                      return (
                        <SelectItem
                          key={opt.value}
                          checked={checked}
                          value={opt.value}
                          icon={opt.icon}
                          size={props.iconSize}
                          label={opt.label}
                          onClick={select.bind(null, opt)}
                        />
                      );
                    })
                  }
                  </div>
                )}
              </Scroller>
            </div>
          )}
        </div>
      );
    }
  },
});
