import { ref, computed, watch } from 'vue';
import { useSwitch, useChildren } from '../../utils/vue';
import { DropdownItemSymbol } from './DropdownItem.tsx';
import SvgIcon from '../SvgIcon.vue';
import Vnodes from '../Vnodes';

export default {
  props: {
    type: String,
    placeholder: String,
    modelValue: {
      type: [ String, Number, Array ],
      required: true,
    },
    align: {
      type: String,
      default: 'left',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    // add an index to dropdown-item
    let selected = ref(props.modelValue);
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
      if (slots.default) {
        for (let node of slots.default()) {
          if (node.props && node.props.value == selected.value) {
            return (node as any).children.default();
          }
        }
      }
      return [];
    });

    let hasButtonSlot = computed<boolean>(() => {
      return !!slots.button;
    });

    // dropdown-item use this callback to notify which item is clicked
    let children = useChildren(DropdownItemSymbol, {
      setActive(v: string) {
        selected.value = v;
        emit('update:modelValue', v);
      }
    });

    let hasIcon = computed(() => children.some((c: any) => !!c.props.icon));

    return {
      selected, selectedNode, menuOn, toggleMenu, hasButtonSlot, hasIcon,
    }
  },
  components: { SvgIcon, Vnodes },
}
</script>
