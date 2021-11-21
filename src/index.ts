import { App } from 'vue';

import _Button from './Button/Button.vue';
import _ButtonGroup from './Button/ButtonGroup.vue';
import _SplitButton from './Button/SplitButton.vue';
import _ToggleButton from './ToggleButton/ToggleButton';
import _ToggleButtonGroup from './ToggleButton/ToggleButtonGroup';
import _SvgIcon from './SvgIcon/SvgIcon.vue';
import _Tabs from './Tabs/Tabs.vue';
import _TabPane from './Tabs/TabPane.vue';
import _Input from './Input/Input.vue';
import _InputGroup from './Input/InputGroup.vue';
import _ValueInput from './Input/ValueInput.vue';
import _DateInput from './Input/DateInput.vue';
import _DateRangeInput from './Input/DateRangeInput.vue';
import _Textarea from './Textarea/Textarea.vue';
import _Radio from './Radio/Radio.vue';
import _Checkbox from './Checkbox/Checkbox.vue';
import _Dropdown from './Dropdown/Dropdown.vue';
import _Select from './Select/Select';
import _Switch from './Switch/Switch.vue';
import _Slider from './Slider/Slider.vue';
import _Drawer from './Drawer/Drawer.vue';
import _Popup from './Popup/Popup.vue';
import _Listbox from './Listbox/Listbox.vue';
import _ListboxItem from './Listbox/ListboxItem.vue';
import _ColorWheel from './ColorWheel/ColorWheel.vue';
import _Chip from './Chip/Chip.vue';
import _ChipEditor from './Chip/ChipEditor.vue';
import _Menu from './Menu/Menu.vue';
import _MenuBar from './Menu/MenuBar.vue';
import _MenuSeperator from './Menu/MenuSeperator.vue';
import _ContextMenu from './ContextMenu/ContextMenu.vue';
import _UploadButton from './Button/UploadButton.vue';
import _Spinner from './Spinner/Spinner.vue';
import _Progress from './Progress/Progress.vue';
import _Calendar from './Calendar/Calendar.vue';
import _Tree from './Tree/Tree.vue';
import _Scaffold from './Scaffold/Scaffold.vue';
import _Table from './Table/Table';
import _DataTable from './Table/DataTable';
import _Scroller from './Scroller/Scroller.vue';
import _AutoComplete from './AutoComplete/AutoComplete.vue';
import _Tooltip from './Tooltip/Tooltip.vue';
import _Space from './Space/Space';
import _FlexLayout from './FlexLayout/FlexLayout';
import _MenuOpener from './AnimatedIcon/MenuOpener.vue';
import _MenuToggle from './AnimatedIcon/MenuToggle.vue';
import _Vnodes from './Vnodes';
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
export function Space(app: App) {
  app.component('j-space', _Space);
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
export function VNodes(app: App) {
  app.component('j-vnodes', _Vnodes);
};
export function ripple(app: App) {
  app.directive('ripple', _ripple);
}

export default function(app: App, conf: Partial<Config>) {
  if (conf) setConfig(conf);
  app.component('j-button', _Button)
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
    .component('j-space', _Space)
    .component('j-flex-layout', _FlexLayout)
    .component('j-vnodes', _Vnodes)
    .component('j-animated-icon:menu-opener', _MenuOpener)
    .component('j-animated-icon:menu-toggle', _MenuToggle)
    .directive('ripple', _ripple);
}
