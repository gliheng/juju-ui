import { defineComponent, h } from 'vue';
import { useParent } from '@utils/hooks';

export const SplitterSymbol = Symbol('SplitterSymbol');

export default defineComponent({
  props: {
    flex: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      required: false,
    },
    minSize: {
      type: Number,
      required: false,
    },
    maxSize: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    let parent = useParent(SplitterSymbol);

    return () => {
      return (
        <div class="j-splitter-panel">
          Splitter Panel
        </div>
      );
    }
  }
});
