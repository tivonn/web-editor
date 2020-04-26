// todo 按需加载，并区分dev/production
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  Input,
  Message,
  Option,
  Row,
  Select,
  Switch,
  Tabs,
  TabPane
} from 'element-ui'
import '@/assets/css/element-variables.scss'

export default {
  install (Vue) {
    Vue.use(Button)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Col)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Input)
    Vue.use(Option)
    Vue.use(Row)
    Vue.use(Select)
    Vue.use(Switch)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.prototype.$message = Message
  }
}
