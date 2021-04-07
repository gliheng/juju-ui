import { App } from 'vue';

import Button from './components/Button.vue';
import ButtonGroup from './components/ButtonGroup.vue';
import SplitButton from './components/SplitButton.vue';
import ToggleButton from './components/ToggleButton/ToggleButton.vue';
import ToggleButtonGroup from './components/ToggleButton/ToggleButtonGroup.vue';
import SvgIcon from './components/SvgIcon.vue';
import Tabs from './components/Tabs/Tabs.vue';
import TabPane from './components/Tabs/TabPane.vue';
import Input from './components/Input/Input.vue';
import InputGroup from './components/Input/InputGroup.vue';
import ValueInput from './components/Input/ValueInput.vue';
import DateInput from './components/Input/DateInput.vue';
import DateRangeInput from './components/Input/DateRangeInput.vue';
import Textarea from './components/Textarea.vue';
import Radio from './components/Radio.vue';
import Checkbox from './components/Checkbox.vue';
import Dropdown from './components/Dropdown/Dropdown';
import Switch from './components/Switch.vue';
import Slider from './components/Slider.vue';
import Drawer from './components/Drawer.vue';
import Popup from './components/Popup.vue';
import Listbox from './components/Listbox/Listbox.vue';
import ListboxItem from './components/Listbox/ListboxItem.vue';
import ColorWheel from './components/ColorWheel.vue';
import Chip from './components/Chip.vue';
import ChipEditor from './components/ChipEditor.vue';
import Menu from './components/Menu.vue';
import MenuBar from './components/MenuBar.vue';
import ContextMenu from './components/ContextMenu.vue';
import UploadButton from './components/UploadButton.vue';
import Spinner from './components/Spinner.vue';
import Progress from './components/Progress.vue';
import Calendar from './components/Calendar/Calendar.vue';
import Tree from './components/Tree/Tree.vue';
import Scaffold from './components/Scaffold.vue';
import Table from './components/Table/Table';
import DataTable from './components/Table/DataTable';
import Scroller from './components/Scroller.vue';
import AutoComplete from './components/AutoComplete.vue';
import MenuOpener from './components/AnimatedIcon/MenuOpener.vue';
import MenuToggle from './components/AnimatedIcon/MenuToggle.vue';
import Vnodes from './components/Vnodes';

import ripple from './directives/ripple';
import "./assets/styles/index.scss";

export * from './utils';
import { Config, set as setConfig } from './utils/config';

export default function(conf: Partial<Config>) {
  if (conf) setConfig(conf);

  return function(vue: App<Element>) {
    vue.component('j-button', Button)
      .component('j-button-group', ButtonGroup)
      .component('j-split-button', SplitButton)
      .component('j-toggle-button', ToggleButton)
      .component('j-toggle-button-group', ToggleButtonGroup)
      .component('j-svg-icon', SvgIcon)
      .component('j-tabs', Tabs)
      .component('j-tab-pane', TabPane)
      .component('j-input', Input)
      .component('j-input-group', InputGroup)
      .component('j-value-input', ValueInput)
      .component('j-date-input', DateInput)
      .component('j-date-range-input', DateRangeInput)
      .component('j-radio', Radio)
      .component('j-checkbox', Checkbox)
      .component('j-textarea', Textarea)
      .component('j-dropdown', Dropdown)
      .component('j-switch', Switch)
      .component('j-slider', Slider)
      .component('j-drawer', Drawer)
      .component('j-popup', Popup)
      .component('j-listbox', Listbox)
      .component('j-listbox-item', ListboxItem)
      .component('j-color-wheel', ColorWheel)
      .component('j-chip', Chip)
      .component('j-chip-editor', ChipEditor)
      .component('j-menu', Menu)
      .component('j-menu-bar', MenuBar)
      .component('j-context-menu', ContextMenu)
      .component('j-upload-button', UploadButton)
      .component('j-spinner', Spinner)
      .component('j-scroller', Scroller)
      .component('j-progress', Progress)
      .component('j-calendar', Calendar)
      .component('j-tree', Tree)
      .component('j-scaffold', Scaffold)
      .component('j-table', Table)
      .component('j-data-table', DataTable)
      .component('j-vnodes', Vnodes)
      .component('j-auto-complete', AutoComplete)
      .component('j-animated-icon:menu-opener', MenuOpener)
      .component('j-animated-icon:menu-toggle', MenuToggle)
      .directive('ripple', ripple);
  };
}

export {
    Button,
    ButtonGroup,
    SplitButton,
    ToggleButton,
    ToggleButtonGroup,
    SvgIcon,
    Tabs,
    TabPane,
    Input,
    InputGroup,
    Radio,
    Checkbox,
    Dropdown,
    Switch,
    Slider,
    Drawer,
    Popup,
    Listbox,
    ListboxItem,
    ColorWheel,
    Chip,
    ChipEditor,
    Menu,
    MenuBar,
    ContextMenu,
    ValueInput,
    DateInput,
    DateRangeInput,
    UploadButton,
    Spinner,
    Scroller,
    Progress,
    Calendar,
    Tree,
    Table,
    DataTable,
    Vnodes,
    ripple,
};