import { createApp } from "vue"
import { createApp as createAppClient } from "vue/dist/vue.esm-bundler"

import "./base.scss"

import DemoPage from "./DemoPage.vue"
import DillermNavBar from "./components/DillermNavBar.vue"

// should put this config definition somewhere useful
// var config_definition = {
// 	github_url: String,
// 	parameters: Object,
// 	parameters_callback: Function
// }

export default {
	init(navbar_id, config) {
		var props = {
			config: config
		};
		const app = createApp(DillermNavBar, props);
		
		app.mount(navbar_id);
		return app;
	},
	initDemo(element_id) {
		const app = createApp(DemoPage);
		app.mount("#vueapp");
	},
	createVueApp: createAppClient
}
