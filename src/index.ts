import { App } from 'vue';

import _Button from './components/Button/Button.vue';
import _ButtonGroup from './components/Button/ButtonGroup.vue';
import _SplitButton from './components/Button/SplitButton.vue';
import _ToggleButton from './components/ToggleButton/ToggleButton';
import _ToggleButtonGroup from './components/ToggleButton/ToggleButtonGroup';
import _SvgIcon from './components/SvgIcon/SvgIcon.vue';
import _Tabs from './components/Tabs/Tabs.vue';
import _TabPane from './components/Tabs/TabPane.vue';
import _Input from './components/Input/Input.vue';
import _InputGroup from './components/Input/InputGroup.vue';
import _ValueInput from './components/Input/ValueInput.vue';
import _DateInput from './components/Input/DateInput.vue';
import _DateRangeInput from './components/Input/DateRangeInput.vue';
import _Textarea from './components/Textarea/Textarea.vue';
import _Radio from './components/Radio/Radio.vue';
import _Checkbox from './components/Checkbox/Checkbox.vue';
import _Dropdown from './components/Dropdown/Dropdown.vue';
import _Select from './components/Select/Select';
import _Switch from './components/Switch/Switch.vue';
import _Slider from './components/Slider/Slider.vue';
import _Drawer from './components/Drawer/Drawer.vue';
import _Popup from './components/Popup/Popup.vue';
import _Listbox from './components/Listbox/Listbox.vue';
import _ListboxItem from './components/Listbox/ListboxItem.vue';
import _ColorWheel from './components/ColorWheel/ColorWheel.vue';
import _Chip from './components/Chip/Chip.vue';
import _ChipEditor from './components/Chip/ChipEditor.vue';
import _Menu from './components/Menu/Menu.vue';
import _MenuBar from './components/Menu/MenuBar.vue';
import _MenuSeperator from './components/Menu/MenuSeperator.vue';
import _ContextMenu from './components/ContextMenu/ContextMenu.vue';
import _UploadButton from './components/Button/UploadButton.vue';
import _Spinner from './components/Spinner/Spinner.vue';
import _Progress from './components/Progress/Progress.vue';
import _Calendar from './components/Calendar/Calendar.vue';
import _Tree from './components/Tree/Tree.vue';
import _Scaffold from './components/Scaffold/Scaffold.vue';
import _Table from './components/Table/Table';
import _DataTable from './components/Table/DataTable';
import _Scroller from './components/Scroller/Scroller.vue';
import _AutoComplete from './components/AutoComplete/AutoComplete.vue';
import _Tooltip from './components/Tooltip/Tooltip.vue';
import _FlexLayout from './components/FlexLayout/FlexLayout';
import _MenuOpener from './components/AnimatedIcon/MenuOpener.vue';
import _MenuToggle from './components/AnimatedIcon/MenuToggle.vue';
import _ripple from './directives/ripple';
import "./assets/styles/index.scss";

export * from './utils';
import { Config, set as setConfig } from './utils/config';

export function Button(app: App) {
  app.component('j-button', _Button);
};
export function ButtonGroup(app: App) {
  app.component('j-button-group', _ButtonGroup);
};
export function SplitButton(app: App) {
  app.component('j-split-button', _SplitButton);
};
export function ToggleButton(app: App) {
  app.component('j-toggle-button', _ToggleButton);
};
export function ToggleButtonGroup(app: App) {
  app.component('j-toggle-button-group', _ToggleButtonGroup);
};
export function SvgIcon(app: App) {
  app.component('j-svg-icon', _SvgIcon);
};
export function Tabs(app: App) {
  app.component('j-tabs', _Tabs);
};
export function TabPane(app: App) {
  app.component('j-tab-pane', _TabPane);
};
export function Input(app: App) {
  app.component('j-input', _Input);
};
export function InputGroup(app: App) {
  app.component('j-input-group', _InputGroup);
};
export function ValueInput(app: App) {
  app.component('j-value-input', _ValueInput);
};
export function DateInput(app: App) {
  app.component('j-date-input', _DateInput);
};
export function DateRangeInput(app: App) {
  app.component('j-date-range-input', _DateRangeInput);
};
export function Radio(app: App) {
  app.component('j-radio', _Radio);
};
export function Checkbox(app: App) {
  app.component('j-checkbox', _Checkbox);
};
export function Textarea(app: App) {
  app.component('j-textarea', _Textarea);
};
export function Dropdown(app: App) {
  app.component('j-dropdown', _Dropdown);
};
export function Select(app: App) {
  app.component('j-select', _Select);
};
export function Switch(app: App) {
  app.component('j-switch', _Switch);
};
export function Slider(app: App) {
  app.component('j-slider', _Slider);
};
export function Drawer(app: App) {
  app.component('j-drawer', _Drawer);
};
export function Popup(app: App) {
  app.component('j-popup', _Popup);
};
export function Listbox(app: App) {
  app.component('j-listbox', _Listbox);
};
export function ListboxItem(app: App) {
  app.component('j-listbox-item', _ListboxItem);
};
export function ColorWheel(app: App) {
  app.component('j-color-wheel', _ColorWheel);
};
export function Chip(app: App) {
  app.component('j-chip', _Chip);
};
export function ChipEditor(app: App) {
  app.component('j-chip-editor', _ChipEditor);
};
export function Menu(app: App) {
  app.component('j-menu', _Menu);
};
export function MenuBar(app: App) {
  app.component('j-menu-bar', _MenuBar);
};
export function MenuSeperator(app: App) {
  app.component('j-menu-seperator', _MenuSeperator);
};
export function ContextMenu(app: App) {
  app.component('j-context-menu', _ContextMenu);
};
export function UploadButton(app: App) {
  app.component('j-upload-button', _UploadButton);
};
export function Spinner(app: App) {
  app.component('j-spinner', _Spinner);
};
export function Scroller(app: App) {
  app.component('j-scroller', _Scroller);
};
export function Progress(app: App) {
  app.component('j-progress', _Progress);
};
export function Calendar(app: App) {
  app.component('j-calendar', _Calendar);
};
export function Tree(app: App) {
  app.component('j-tree', _Tree);
};
export function Scaffold(app: App) {
  app.component('j-scaffold', _Scaffold);
};
export function Table(app: App) {
  app.component('j-table', _Table);
};
export function DataTable(app: App) {
  app.component('j-data-table', _DataTable);
};
export function AutoComplete(app: App) {
  app.component('j-auto-complete', _AutoComplete);
};
export function Tooltip(app: App) {
  app.component('j-auto-complete', _Tooltip);
};
export function FlexLayout(app: App) {
  app.component('j-flex-layout', _FlexLayout);
};
export function MenuOpener(app: App) {
  app.component('j-animated-icon:menu-opener', _MenuOpener);
};
export function MenuToggle(app: App) {
  app.component('j-animated-icon:menu-toggle', _MenuToggle);
};
export function ripple(app: App) {
  app.directive('ripple', _ripple);
}

export default function(conf: Partial<Config>) {
  if (conf) setConfig(conf);

  return function(vue: App<Element>) {
    vue.component('j-button', _Button)
      .component('j-button-group', _ButtonGroup)
      .component('j-split-button', _SplitButton)
      .component('j-toggle-button', _ToggleButton)
      .component('j-toggle-button-group', _ToggleButtonGroup)
      .component('j-svg-icon', _SvgIcon)
      .component('j-tabs', _Tabs)
      .component('j-tab-pane', _TabPane)
      .component('j-input', _Input)
      .component('j-input-group', _InputGroup)
      .component('j-value-input', _ValueInput)
      .component('j-date-input', _DateInput)
      .component('j-date-range-input', _DateRangeInput)
      .component('j-radio', _Radio)
      .component('j-checkbox', _Checkbox)
      .component('j-textarea', _Textarea)
      .component('j-dropdown', _Dropdown)
      .component('j-select', _Select)
      .component('j-switch', _Switch)
      .component('j-slider', _Slider)
      .component('j-drawer', _Drawer)
      .component('j-popup', _Popup)
      .component('j-listbox', _Listbox)
      .component('j-listbox-item', _ListboxItem)
      .component('j-color-wheel', _ColorWheel)
      .component('j-chip', _Chip)
      .component('j-chip-editor', _ChipEditor)
      .component('j-menu', _Menu)
      .component('j-menu-bar', _MenuBar)
      .component('j-menu-seperator', _MenuSeperator)
      .component('j-context-menu', _ContextMenu)
      .component('j-upload-button', _UploadButton)
      .component('j-spinner', _Spinner)
      .component('j-scroller', _Scroller)
      .component('j-progress', _Progress)
      .component('j-calendar', _Calendar)
      .component('j-tree', _Tree)
      .component('j-scaffold', _Scaffold)
      .component('j-table', _Table)
      .component('j-data-table', _DataTable)
      .component('j-auto-complete', _AutoComplete)
      .component('j-tooltip', _Tooltip)
      .component('j-flex-layout', _FlexLayout)
      .component('j-animated-icon:menu-opener', _MenuOpener)
      .component('j-animated-icon:menu-toggle', _MenuToggle)
      .directive('ripple', _ripple);
  };
}