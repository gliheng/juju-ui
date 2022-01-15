import { defineComponent, PropType, h } from 'vue';
import { Library } from './types';
import Tabs from '../Tabs/Tabs.vue';
import TabPane from '../Tabs/TabPane.vue';

export default defineComponent({
  name: 'TabsPane',
  props: {
    library: {
      type: Object as PropType<Library>,
      required: true,
    },
    tabs: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup(props) {
    return () => {
      let tabs = props.tabs.map(e => {
        let Component = props.library.find(item => item.name == e) as any;
        if (!Component) {
          return <span>`Cannot find component: ${e}`</span>;
        }
        let title = Component.label;
        return (
          <TabPane label={title}>
            <Component />
          </TabPane>
        );
      });
      return (
        <Tabs>
          {tabs}
        </Tabs>
      );
    };
  }
});