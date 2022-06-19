import { defineComponent, ref, h, PropType } from 'vue';
import { Library, Preset } from './types';
import './style.scss';

export default defineComponent({
  props: {
    library: {
      type: Object as PropType<Library>,
      required: true,
    },
    preset: {
      type: Object as PropType<Preset>,
      required: false,
    },
    storageKey: {
      type: String,
      required: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      let { preset } = props;
      let content;
      if (!preset && slots.placeholder) {
        content = slots.placeholder();
      }
      return (
        <div class="j-tile-layout">
          { content }
        </div>
      );
    }
  }
});
