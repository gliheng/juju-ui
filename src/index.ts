import { App } from 'vue';

import "./assets/styles/index.scss";
import Button from './Button/Button.vue';
import ButtonGroup from './Button/ButtonGroup.vue';
import SplitButton from './Button/SplitButton.vue';
import ToggleButton from './ToggleButton/ToggleButton';
import ToggleButtonGroup from './ToggleButton/ToggleButtonGroup';
import SvgIcon from './SvgIcon/SvgIcon.vue';
import Tabs from './Tabs/Tabs.vue';
import TabPane from './Tabs/TabPane.vue';
import Input from './Input/Input.vue';
import InputGroup from './Input/InputGroup.vue';
import NumberInput from './Input/NumberInput.vue';
import DateInput from './Input/DateInput.vue';
import DateRangeInput from './Input/DateRangeInput.vue';
import Textarea from './Textarea/Textarea.vue';
import Radio from './Radio/Radio.vue';
import Checkbox from './Checkbox/Checkbox.vue';
import Dropdown from './Dropdown/Dropdown.vue';
import Select from './Select/Select';
import Switch from './Switch/Switch.vue';
import Slider from './Slider/Slider.vue';
import Drawer from './Drawer/Drawer.vue';
import Popup from './Popup/Popup.vue';
import Listbox from './Listbox/Listbox.vue';
import ListboxItem from './Listbox/ListboxItem.vue';
import ColorWheel from './ColorWheel/ColorWheel.vue';
import Chip from './Chip/Chip.vue';
import ChipEditor from './Chip/ChipEditor.vue';
import Menu from './Menu/Menu.vue';
import MenuBar from './Menu/MenuBar.vue';
import MenuSeperator from './Menu/MenuSeperator.vue';
import ContextMenu from './ContextMenu/ContextMenu.vue';
import UploadButton from './Button/UploadButton.vue';
import Spinner from './Spinner/Spinner.vue';
import Progress from './Progress/Progress.vue';
import Calendar from './Calendar/Calendar.vue';
import Tree from './Tree/Tree.vue';
import Scaffold from './Scaffold/Scaffold.vue';
import Table from './Table/Table';
import Scroller from './Scroller/Scroller.vue';
import AutoComplete from './AutoComplete/AutoComplete.vue';
import Tooltip from './Tooltip/Tooltip.vue';
import Space from './Space/Space';
import FlexLayout from './FlexLayout/FlexLayout';
import FlexLayoutDragSource from './FlexLayout/DragSource';
import Splitter from './Splitter/Splitter';
import SplitterPanel from './Splitter/SplitterPanel';
import MenuOpener from './AnimatedIcon/MenuOpener.vue';
import MenuToggle from './AnimatedIcon/MenuToggle.vue';
import loading from './directives/loading';
import ripple from './directives/ripple';

export * from './utils';
import { Config, set as setConfig, get as getConfig } from './utils/config';

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
  NumberInput,
  DateInput,
  DateRangeInput,
  Radio,
  Checkbox,
  Textarea,
  Dropdown,
  Select,
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
  MenuSeperator,
  ContextMenu,
  UploadButton,
  Spinner,
  Scroller,
  Progress,
  Calendar,
  Tree,
  Scaffold,
  Table,
  AutoComplete,
  Tooltip,
  Space,
  FlexLayout,
  FlexLayoutDragSource,
  Splitter,
  SplitterPanel,
  MenuOpener,
  MenuToggle,
  loading,
  ripple,
};

export default function(app: App, conf: Partial<Config>) {
  if (conf) setConfig(conf);
  app.component('j-button', Button)
    .component('j-button-group', ButtonGroup)
    .component('j-split-button', SplitButton)
    .component('j-toggle-button', ToggleButton)
    .component('j-toggle-button-group', ToggleButtonGroup)
    .component('j-svg-icon', SvgIcon)
    .component('j-tabs', Tabs)
    .component('j-tab-pane', TabPane)
    .component('j-input', Input)
    .component('j-input-group', InputGroup)
    .component('j-number-input', NumberInput)
    .component('j-date-input', DateInput)
    .component('j-date-range-input', DateRangeInput)
    .component('j-radio', Radio)
    .component('j-checkbox', Checkbox)
    .component('j-textarea', Textarea)
    .component('j-dropdown', Dropdown)
    .component('j-select', Select)
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
    .component('j-menu-seperator', MenuSeperator)
    .component('j-context-menu', ContextMenu)
    .component('j-upload-button', UploadButton)
    .component('j-spinner', Spinner)
    .component('j-scroller', Scroller)
    .component('j-progress', Progress)
    .component('j-calendar', Calendar)
    .component('j-tree', Tree)
    .component('j-scaffold', Scaffold)
    .component('j-table', Table)
    .component('j-auto-complete', AutoComplete)
    .component('j-tooltip', Tooltip)
    .component('j-space', Space)
    .component('j-flex-layout', FlexLayout)
    .component('j-flex-layout-drag-source', FlexLayoutDragSource)
    .component('j-splitter', Splitter)
    .component('j-splitter-panel', SplitterPanel)
    .component('j-animated-icon:menu-opener', MenuOpener)
    .component('j-animated-icon:menu-toggle', MenuToggle)
    .directive('loading', loading)
    .directive('ripple', ripple);

  const { theme } = getConfig();
  document.body.classList.add(`j-theme-${theme}`);
}
