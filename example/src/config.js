import { flatten } from 'lodash-es';

const config = {
  Display: [
    {
      name: "Button",
    },
    {
      name: "Listbox",
    },
    {
      name: "SvgIcon",
    },
    {
      name: "Chip",
    },
    {
      name: "Spinner",
    },
    {
      name: "Scroller",
    },
    {
      name: "Progress",
    },
    {
      name: "Calendar",
    },
    {
      name: "Tree",
    },
    {
      name: "AnimatedIcon",
    },
    {
      name: "Tooltip",
    },
    {
      name: "Layout",
    },
  ],
  Form: [
    {
      name: "AutoComplete",
    },
    {
      name: "NumberInput",
    },
    {
      name: "DateInput",
    },
    {
      name: "ColorWheel",
    },
    {
      name: "ChipEditor",
    },
    {
      name: "Input",
    },
    {
      name: "Textarea",
    },
    {
      name: "Radio",
    },
    {
      name: "Checkbox",
    },
    {
      name: "Select",
    },
    {
      name: "Switch",
    },
    {
      name: "Slider",
    },
    {
      name: "Form",
    },
  ],
  Action: [
    {
      name: "Dropdown",
    },
    {
      name: "Popover",
    },
    {
      name: "Menu",
    },
    {
      name: "MenuBar",
    },
    {
      name: "ContextMenu",
    }, 
    {
      name: "Snackbar",
    },
    {
      name: "Popup",
    },
    {
      name: "Drawer",
    },
  ],
  Data: [
    {
      name: "Table",
    },
    {
      name: "DataGrid",
    },
    {
      name: "ReorderList",
    },
  ],
  Layout: [
    {
      name: "Scaffold",
      "fullPage": true,
    },
    {
      name: "FlexLayout",
    },
    {
      name: "Splitter",
    },
    {
      name: "Tabs"
    },
  ],
  Directive: [
    {
      name: "ripple",
    },
    {
      name: "loading",
    },
  ]
};

export default config;

const allComponents = flatten(Object.values(config));

export { allComponents };