import { defineComponent, PropType, h, Fragment } from 'vue';
import { Library } from './types';
import type { RenderBox } from './layout';
import Tabs from '../Tabs/Tabs.vue';
import TabPane from '../Tabs/TabPane.vue';
import Button from '../Button/Button.vue';
import Dropdown from '../Dropdown/Dropdown.vue';
import Menu from '../Menu/Menu.vue';

export default defineComponent({
  name: 'PaneContent',
  props: {
    box: {
      type: Object as PropType<RenderBox>,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    context: {
      type: Object as PropType<{
        library: Library;
        onAction: (action: string, box: RenderBox, args?: any) => void;
        placeholder: any;
        showActionMenu: boolean;
        closable: boolean;
      }>,
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
    function removeTab(i: number) {
      emit('remove', i);
    }

    function expand() {
      props.context.onAction('expand', props.box);
    }

    function contract() {
      props.context.onAction('contract', props.box);
    }

    function remove() {
      props.context.onAction('remove', props.box);
    }

    function replace(target: string) {
      props.context.onAction('replace', props.box, target);
    }
    
    return () => {
      let tabPanes = props.tabs.map(e => {
        let Component = props.context.library.find(item => item.name == e) as any;
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
          {{
            default: () => tabPanes,
            addon() {
              if (props.context.showActionMenu) {
                let expandMenu: JSX.Element;
                if (props.expanded) {
                  expandMenu = <Menu label="Contract" icon="contract" onClick={ contract } />;
                } else {
                  expandMenu = <Menu label="Expand" icon="expand" onClick={ expand } />;
                }
                return (
                  <Dropdown align="right" class="j-flex-layout-pane-action-menu">
                  {{
                    default: () => <Button rounded flat size="sm" icon="ellipsis-horizontal" />,
                    menu: () => <Menu list>
                      {() => (<>
                        { expandMenu }
                        <Menu label="Remove" icon="trash" onClick={ remove } />
                        <Menu label="Replace" icon="repeat" side="left">
                          {() => props.context.library.map(lib => (
                            <Menu
                              label={lib.name}
                              onClick={ replace.bind(null, lib.name) }
                            />
                          ))}
                        </Menu>
                      </>)}
                    </Menu>
                  }}
                  </Dropdown>
                );
              }
            },
          }}
        </Tabs>
      );
    };
  }
});