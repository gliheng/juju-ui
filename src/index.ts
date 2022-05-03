import { App } from 'vue';

import "./assets/styles/index.scss";
import Button from './components/Button/Button.vue';
import ButtonGroup from './components/Button/ButtonGroup.vue';
import SplitButton from './components/Button/SplitButton.vue';
import ToggleButton from './components/ToggleButton/ToggleButton';
import ToggleButtonGroup from './components/ToggleButton/ToggleButtonGroup';
import SvgIcon from './components/SvgIcon/SvgIcon.vue';
import Tabs from './components/Tabs/Tabs.vue';
import TabPane from './components/Tabs/TabPane.vue';
import Input from './components/Input/Input.vue';
import InputGroup from './components/Input/InputGroup.vue';
import NumberInput from './components/Input/NumberInput.vue';
import DateInput from './components/Input/DateInput.vue';
import DateRangeInput from './components/Input/DateRangeInput.vue';
import Textarea from './components/Textarea/Textarea.vue';
import Radio from './components/Radio/Radio.vue';
import RadioGroup from './components/Radio/RadioGroup.vue';
import Checkbox from './components/Checkbox/Checkbox.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import Select from './components/Select/Select';
import Switch from './components/Switch/Switch.vue';
import Slider from './components/Slider/Slider.vue';
import Drawer from './components/Drawer/Drawer.vue';
import Popup from './components/Popup/Popup.vue';
import Popover from './components/Popover/Popover.vue';
import Listbox from './components/Listbox/Listbox.vue';
import ListboxItem from './components/Listbox/ListboxItem.vue';
import ColorWheel from './components/ColorWheel/ColorWheel.vue';
import Chip from './components/Chip/Chip.vue';
import ChipEditor from './components/Chip/ChipEditor.vue';
import Menu from './components/Menu/Menu.vue';
import MenuBar from './components/Menu/MenuBar.vue';
import MenuSeperator from './components/Menu/MenuSeperator.vue';
import ContextMenu from './components/ContextMenu/ContextMenu.vue';
import UploadButton from './components/Button/UploadButton.vue';
import Spinner from './components/Spinner/Spinner.vue';
import Progress from './components/Progress/Progress.vue';
import Calendar from './components/Calendar/Calendar.vue';
import Tree from './components/Tree/Tree.vue';
import Scaffold from './components/Scaffold/Scaffold.vue';
import Table from './components/Table/Table';
import DataGrid from './components/DataGrid/DataGrid';
import Scroller from './components/Scroller/Scroller.vue';
import AutoComplete from './components/AutoComplete/AutoComplete.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import Space from './components/Space/Space';
import FlexLayout from './components/FlexLayout/FlexLayout';
import FlexLayoutDragSource from './components/FlexLayout/DragSource';
import Splitter from './components/Splitter/Splitter';
import SplitterPanel from './components/Splitter/SplitterPanel';
import MenuOpener from './components/AnimatedIcon/MenuOpener.vue';
import MenuToggle from './components/AnimatedIcon/MenuToggle.vue';
import Form from './components/Form/Form.vue';
import FormItem from './components/Form/FormItem.vue';
import ReorderList from './components/ReorderList/ReorderList';
import Descriptions from './components/Descriptions/Descriptions.vue';
import DescriptionsItem from './components/Descriptions/DescriptionsItem.vue';
import Carousel from './components/Carousel/Carousel.vue';
import CarouselItem from './components/Carousel/CarouselItem.vue';
import PopSelect from './components/PopSelect/PopSelect.vue';
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
  RadioGroup,
  Checkbox,
  Textarea,
  Dropdown,
  Select,
  Switch,
  Slider,
  Drawer,
  Popup,
  Popover,
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
  DataGrid,
  AutoComplete,
  Tooltip,
  Space,
  FlexLayout,
  FlexLayoutDragSource,
  Splitter,
  SplitterPanel,
  MenuOpener,
  MenuToggle,
  Form,
  FormItem,
  ReorderList,
  Descriptions,
  DescriptionsItem,
  Carousel,
  CarouselItem,
  PopSelect,
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
    .component('j-radio-group', RadioGroup)
    .component('j-checkbox', Checkbox)
    .component('j-textarea', Textarea)
    .component('j-dropdown', Dropdown)
    .component('j-select', Select)
    .component('j-switch', Switch)
    .component('j-slider', Slider)
    .component('j-drawer', Drawer)
    .component('j-popup', Popup)
    .component('j-popover', Popover)
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
    .component('j-data-grid', DataGrid)
    .component('j-auto-complete', AutoComplete)
    .component('j-tooltip', Tooltip)
    .component('j-space', Space)
    .component('j-flex-layout', FlexLayout)
    .component('j-flex-layout-drag-source', FlexLayoutDragSource)
    .component('j-splitter', Splitter)
    .component('j-splitter-panel', SplitterPanel)
    .component('j-animated-icon:menu-opener', MenuOpener)
    .component('j-animated-icon:menu-toggle', MenuToggle)
    .component('j-form', Form)
    .component('j-form-item', FormItem)
    .component('j-reorder-list', ReorderList)
    .component('j-descriptions', Descriptions)
    .component('j-descriptions-item', DescriptionsItem)
    .component('j-carousel', Carousel)
    .component('j-carousel-item', CarouselItem)
    .component('j-pop-select', PopSelect)
    .directive('loading', loading)
    .directive('ripple', ripple);

  const { theme } = getConfig();
  document.body.classList.add(`j-theme-${theme}`);
}
