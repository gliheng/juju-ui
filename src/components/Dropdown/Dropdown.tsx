import { defineComponent, h, computed, watch } from 'vue';
import { useSwitch, useChildren } from '../../utils/hooks';
import { DropdownItemSymbol } from './DropdownItem';
import SvgIcon from '../SvgIcon.vue';
import '../../assets/styles/Dropdown.scss';

export default defineComponent({
  props: {
    type: String,
    placeholder: String,
    modelValue: {
      type: [ String, Number, Boolean ],
    },
    align: {
      type: String,
      default: 'left',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    let [ menuOn, toggleMenu ] = useSwitch(false);

    watch(menuOn, (v) => {
      if (v) {
        document.addEventListener('click', function() {
          menuOn.value = false;
        }, {
          once: true,
        });
      }
    });

    let selectedNode = computed(() => {
      if (props.modelValue !== undefined && slots.default) {
        for (let node of slots.default()) {
          if (node.props && node.props.value == props.modelValue) {
            return (node as any).children.default;
          }
        }
      }
      return null;
    });

    // dropdown-item use this callback to notify which item is clicked
    let children = useChildren(DropdownItemSymbol, {
      setActive(v: string) {
        emit('update:modelValue', v);
      }
    });

    let hasIcon = computed(() => children.some((c: any) => !!c.props.icon));

    return () => {
      let content: any;
      if (slots.button) {
        content = <slots.button />;
      } else {
        let label;
        if (selectedNode.value) {
          label = <selectedNode.value />;
        } else {
          label = (
            <span class="j-placeholder">{ props.placeholder }</span>
          );
        }
        content = (
          <div class="j-dropdown-label" tabindex={0}>
            <div class="j-dropdown-label-inner">{ label }</div>
            <SvgIcon class="j-dropdown-icon" name="chevron-down" />
          </div>
        );
      }
  
      return <div class="j-dropdown" data-align={ props.align } data-has-icon={ hasIcon.value } onClick={ (evt) => {
        evt.stopPropagation();
        toggleMenu();
      } }>
        { content }
        { menuOn.value && <div class="j-dropdown-menu"><slots.default /></div>}
      </div>;
    }
  },
});
