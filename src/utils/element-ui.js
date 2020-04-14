// todo 按需加载区分dev/production
import {
  Button,
  Input,
  Option,
  Select,
  Switch,
  Tabs,
  TabPane
} from 'element-ui'
import '@/assets/css/element-variables.scss'

export default {
  install (Vue) {
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Option)
    Vue.use(Select)
    Vue.use(Switch)
    Vue.use(Tabs)
    Vue.use(TabPane)
  }
}
