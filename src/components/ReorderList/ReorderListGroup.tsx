import {
  h, defineComponent,
  ref, provide, toRef
} from 'vue';
import { GroupInjectKey, useShelf } from './ReorderList';
import './ReorderList.scss';


export default defineComponent({
  setup(props, { slots }) {
    let dragStop: any;
    provide(GroupInjectKey, {
      ...useShelf(),
      onDragStop(cbk: (canceled?: boolean) => any) {
        dragStop = cbk;
      },
      stopDrag(canceled: boolean) {
        return dragStop?.(canceled);
      },
    });

    return () => {
      let content;
      if (slots.default) {
        content = slots.default();
      }

      return (
        <div class="j-reorder-list-group">
          {content}
        </div>
      );
    };
  }
});
