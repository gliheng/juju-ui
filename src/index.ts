import { App } from 'vue';
import Button from './components/Button.vue';
import ButtonGroup from './components/ButtonGroup.vue';
import SplitButton from './components/SplitButton.vue';
import ToggleButton from './components/ToggleButton.vue';
import ToggleButtonGroup from './components/ToggleButtonGroup.vue';
import SvgIcon from './components/SvgIcon.vue';
import Tabs from './components/Tabs/Tabs.vue';
import TabPane from './components/Tabs/TabPane.vue';
import Input from './components/Input.vue';
import InputGroup from './components/InputGroup.vue';
import Textarea from './components/Textarea.vue';
import Radio from './components/Radio.vue';
import Checkbox from './components/Checkbox.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import DropdownItem from './components/Dropdown/DropdownItem.vue';
import DropdownSeperator from './components/Dropdown/DropdownSeperator.vue';
import Switch from './components/Switch.vue';
import Slider from './components/Slider.vue';
import Drawer from './components/Drawer.vue';
import Popup from './components/Popup.vue';
import Listbox from './components/Listbox.vue';
import ListboxItem from './components/ListboxItem.vue';
import ColorWheel from './components/ColorWheel.vue';
import Chip from './components/Chip.vue';
import ChipEditor from './components/ChipEditor.vue';
import Menu from './components/Menu.vue';
import MenuBar from './components/MenuBar.vue';
import ContextMenu from './components/ContextMenu.vue';
import ValueInput from './components/ValueInput.vue';
import UploadButton from './components/UploadButton.vue';
import Spinner from './components/Spinner.vue';
import Progress from './components/Progress.vue';
import Calendar from './components/Calendar.vue';
import Tree from './components/Tree.vue';
import Scaffold from './components/Scaffold.vue';

import ripple from './directives/ripple';
import scroller from './directives/scroller';

import * as utils from './utils';
import { Config, set as setConfig } from './utils/config';

export default function(conf: Partial<Config>) {
  if (conf) setConfig(conf);

  return function(vue: App<Element>, prefix = 'j') {
    vue.component(prefix + '-button', Button)
      .component(prefix + '-button-group', ButtonGroup)
      .component(prefix + '-split-button', SplitButton)
      .component(prefix + '-toggle-button', ToggleButton)
      .component(prefix + '-toggle-button-group', ToggleButtonGroup)
      .component(prefix + '-svg-icon', SvgIcon)
      .component(prefix + '-tabs', Tabs)
      .component(prefix + '-tab-pane', TabPane)
      .component(prefix + '-input', Input)
      .component(prefix + '-input-group', InputGroup)
      .component(prefix + '-radio', Radio)
      .component(prefix + '-checkbox', Checkbox)
      .component(prefix + '-textarea', Textarea)
      .component(prefix + '-dropdown', Dropdown)
      .component(prefix + '-dropdown-item', DropdownItem)
      .component(prefix + '-dropdown-seperator', DropdownSeperator)
      .component(prefix + '-switch', Switch)
      .component(prefix + '-slider', Slider)
      .component(prefix + '-drawer', Drawer)
      .component(prefix + '-popup', Popup)
      .component(prefix + '-listbox', Listbox)
      .component(prefix + '-listbox-item', ListboxItem)
      .component(prefix + '-color-wheel', ColorWheel)
      .component(prefix + '-chip', Chip)
      .component(prefix + '-chip-editor', ChipEditor)
      .component(prefix + '-menu', Menu)
      .component(prefix + '-menu-bar', MenuBar)
      .component(prefix + '-context-menu', ContextMenu)
      .component(prefix + '-value-input', ValueInput)
      .component(prefix + '-upload-button', UploadButton)
      .component(prefix + '-spinner', Spinner)
      .component(prefix + '-progress', Progress)
      .component(prefix + '-calendar', Calendar)
      .component(prefix + '-tree', Tree)
      .component(prefix + '-scaffold', Scaffold)
      .directive('ripple', ripple)
      .directive('scroller', scroller);
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
    DropdownItem,
    DropdownSeperator,
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
    UploadButton,
    Spinner,
    Progress,
    Calendar,
    Tree,
    ripple,
    scroller,
    utils,
};