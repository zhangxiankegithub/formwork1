import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import ElementUI from 'element-ui';
import {
    Input,
    Tabs,
    Radio,
    Switch,
    Select,
    Upload,
    Option,
    Checkbox,
    Slider,
    Button,
    ColorPicker,
    TabPane,
    Message,
    MessageBox,
    Table,
    TableColumn
  } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'xes-edit-https'
import qs from 'qs';

Vue.prototype.$http = axios;
Vue.prototype.qs = qs;
//
// Vue.use(ElementUI);
Vue.use(Input);//
Vue.use(Tabs);//
Vue.use(Radio);//
Vue.use(Switch);//
Vue.use(Select);//
Vue.use(Upload);//
Vue.use(Option);//
Vue.use(Checkbox);//
Vue.use(Slider);//
Vue.use(Button);//
Vue.use(TabPane);
Vue.use(ColorPicker);//
Vue.use(Table);
Vue.use(TableColumn);
Vue.prototype.$message = Message;//
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
