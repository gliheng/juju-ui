import { defineComponent, PropType, h, reactive } from 'vue';
import { Library } from './types';
import Tabs from '../Tabs/Tabs.vue';
import TabPane from '../Tabs/TabPane.vue';

export default defineComponent({
  name: 'PaneContent',
  props: {
    library: {
      type: Object as PropType<Library>,
      required: true,
    },
    tabs: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    closable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    let tabs = reactive(props.tabs);

    function removeTab(i: number) {
      tabs.splice(i, 1);
      if (tabs.length == 0) {
        emit('remove');
      }
    }

    return () => {
      let tabPanes = tabs.map(e => {
        let Component = props.library.find(item => item.name == e) as any;
        if (!Component) {
          return <span>`Cannot find component: ${e}`</span>;
        }
        let title = Component.label;
        return (
          <TabPane label={title} closable={props.closable}>
            <Component />
          </TabPane>
        );
      });

      return (
        <Tabs onTabRemove={removeTab}>
          {tabPanes}
        </Tabs>
      );
    };
  }
});