import Vue from "vue";
import App from "./App.vue";
import dataV from "@jiaminghi/data-view";
import echarts from "echarts";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSocketIO from "vue-socket.io";

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.config.silent = true;
Vue.prototype.serverUrl = "http://localhost:3000";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:8082"
  })
);

Vue.use(VueAxios, axios);
Vue.use(dataV);
new Vue({
  render: h => h(App)
}).$mount("#app");
