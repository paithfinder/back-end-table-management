import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'

import {
  Form,
  Input,
  Button,
  FormItem,
  Message,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Switch,
  Popover,
  Select,
  Option,
  Dialog,
  InputNumber,
  Upload,MessageBox,Pagination
} from 'element-ui'

Vue.use(Form)
Vue.use(Input)
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(InputNumber)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Popover)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Pagination)



// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')