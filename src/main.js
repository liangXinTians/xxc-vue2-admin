import Vue from "vue";
import Cookies from "js-cookie";
import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import Element from "element-ui";
import "@/assets/styles/element-variables.scss";
import "@/assets/styles/index.scss"; // global css
import App from "./App";
import store from "./store";
import permission from "./directive/permission"; // 按钮权限指令
import "./directive/index"; // 全局自定义指令
import * as filters from "./utils/filters"; // 全局过滤
import "./assets/icons"; // icon
import "./permission"; // 全局路由守卫
import { FloatAdd, FloatSub, FloatMul, FloatDiv, download } from "@/utils"; // 浮点运算加减乘除
import { message } from "@/utils/resetMessage"; // 防止重复点击重复弹出message弹框
import VueClipboard from "vue-clipboard2"; // 复制插件
import router from "./router";
import api from "./api"; // 接口api
import moment from "moment";
import print from "vue-print-nb";

Vue.use(print); //注册打印插件
Vue.use(VueClipboard);
// 全局方法挂载
Vue.prototype.FloatAdd = FloatAdd; //  浮点运算加
Vue.prototype.FloatSub = FloatSub; //  浮点运算减
Vue.prototype.FloatMul = FloatMul; //  浮点运算乘
Vue.prototype.FloatDiv = FloatDiv; //  浮点运算除
Vue.prototype.moment = moment;
Vue.prototype.$messageUpload = message; // 防止重复点击重复弹出message弹框
Vue.prototype.download = download; // 导出
Vue.prototype.$api = api;

Vue.use(permission); // 按钮权限指令

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get("size") || "medium" // set element-ui default size
});
// 注册基础组件
// Vue.use(KBui)

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

// 全局修改el-dialog 默认点击遮照为不关闭
Element.Dialog.props.closeOnClickModal.default = false;

let instance = null;
export function render(props = {}) {
  const { container } = props;

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector("#app") : "#app");
  console.log("开始加载相关内容");
}

render();
