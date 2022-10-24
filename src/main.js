import Vue from "vue";
import App from "./App.vue";

import "./css/font.css";
import "./css/index.css";
import Toast from './components/Toast'

// 定义插件对象
const ToastObj = {
  install: function (Vue) {
    const ToastConstructor = Vue.extend(Toast)
    const instance = new ToastConstructor()
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    Vue.prototype.$toast = (msg, duration = 1500) => {
      instance.message = msg
      instance.visible = true
      setTimeout(() => {
        instance.visible = false
      }, duration)
    }
  }
}
Vue.use(ToastObj)
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
