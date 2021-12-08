import { defineComponent, h, computed } from 'vue';
import { useChildren } from '@utils/hooks';
import { SplitterSymbol } from './SplitterPanel';


export default defineComponent({
  setup(props, { slots }) {
    let children = useChildren(SplitterSymbol);

    let childrenBoxes = computed<Array<any>>(() => {
      return children.map(e => {
        return {...e.props};
      });
    });

    return () => {
      let content;
      if (slots.default) {
        content = slots.default();
      }
      return (
        <div class="j-splitter">
          Splitter
          { content }
        </div>
      );
    }
  }
});
