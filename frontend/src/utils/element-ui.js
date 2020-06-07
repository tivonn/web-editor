// todo 按需加载，并区分dev/production
import {
  Button,
  Cascader,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  Input,
  Message,
  Option,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Switch,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Tree
} from 'element-ui'
import '@/assets/css/element-variables.scss'

export default {
  install (Vue) {
    Vue.use(Button)
    Vue.use(Cascader)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Col)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Input)
    Vue.use(Option)
    Vue.use(RadioButton)
    Vue.use(RadioGroup)
    Vue.use(Row)
    Vue.use(Select)
    Vue.use(Switch)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Tree)
    Vue.prototype.$message = Message
  }
}
