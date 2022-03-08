import { defineComponent, PropType, h, Fragment } from 'vue';
import Tabs from '@/Tabs/Tabs.vue';
import TabPane from '@/Tabs/TabPane.vue';
import Button from '@/Button/Button.vue';
import Dropdown from '@/Dropdown/Dropdown.vue';
import SvgIcon from '@/SvgIcon/SvgIcon.vue';
import Menu from '@/Menu/Menu.vue';
import { Library } from './types';
import DragSource from './DragSource';
import type { RenderBox } from './layout';

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
          <TabPane
            label={title}
            closable={props.closable}
            // Pass name to TabPane as attrs
            // so that we can get it from DragSource rendering
            name={e}
          >
            <Component />
          </TabPane>
        );
      });

      return (
        <Tabs onTabRemove={removeTab}>
          {{
            default: () => tabPanes,
            tab({i, tab, emit}: {i: number; tab: any, emit: any}) {
              return (
                <DragSource name={tab.attrs.name} onDragend={(evt: DragEvent) => {
                  if (evt.dataTransfer?.dropEffect == 'move') {
                    emit('tab-remove', i);
                  }
                }}>
                {
                  () => {
                    let closeBtn;
                    if (tab.closable) {
                      closeBtn = (
                        <a
                          class="j-tabs-close"
                          onMousedown={(ev) => ev.stopPropagation()}
                          onClick={() => emit('tab-remove', i)}
                        >
                          <SvgIcon name="close-outline" />
                        </a>
                      );
                    }
                    
                    return (
                      <>
                        <button>{ tab.label }</button>
                        { closeBtn }
                      </>
                    );
                  }
                }
                </DragSource>
              );
            },
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