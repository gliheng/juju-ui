import { defineComponent, PropType, h, Fragment } from 'vue';
import { Library } from './types';
import { RenderBox } from './layout';
import Button from '../Button/Button.vue';
import Dropdown from '../Dropdown/Dropdown.vue';
import Menu from '../Menu/Menu.vue';

export default defineComponent({
  name: 'Pane',
  inheritAttrs: false,
  props: {
    id: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
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
    showActionMenu: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
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
      let { x, y, width, height, expanded } = props;
      let content;
      if (slots.default) {
        content = slots.default();
      }
      
      if (content) {
        let actionMenu;
        if (props.showActionMenu) {
          let expandMenu: JSX.Element;
          if (expanded) {
            expandMenu = <Menu label="Contract" icon="contract" onClick={ contract } />;
          } else {
            expandMenu = <Menu label="Expand" icon="expand" onClick={ expand } />;
          }
          actionMenu = (
            <Dropdown align="right">
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

        content = <>
          {content}
          {actionMenu}
        </>;
      } else if (props.context.placeholder) {
        content = props.context.placeholder();
      }

      let style: Record<string, any> = {
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`,
      };

      return (
        <div
          class="j-flex-layout-pane"
          data-expanded={expanded}
          data-id={props.id}
          style={style}
        >
          {content}
        </div>
      );
    };
  },
});