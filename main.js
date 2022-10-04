// #ifndef VUE3
import Vue from "vue";
import App from "./App";

// 导入路由
import router from "./router/index.js"

// 导入uview
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.config.productionTip = false;

App.mpType = "app";
App.router = router;

const app = new Vue({
	...App,
});

app.$mount();
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from "vue";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
// #endif
