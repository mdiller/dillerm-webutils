import { createApp } from "vue";
import { createApp as createAppClient } from "vue/dist/vue.esm-bundler";

import "./base.scss";

import components from "./components";

import DemoPage from "./DemoPage.vue";
import DillermNavBar from "./components/DillermNavBar.vue";

import * as utils from "./utils.js";

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
	install(Vue) {
		for (const prop in components) {
			if (components.hasOwnProperty(prop)) {
				const component = components[prop];
				// console.log(component.name, component);
				if (component.name) {
					Vue.component(component.name, component);
				}
			}
		}
	},
	createVueApp: createAppClient,
	components: components,
	utils: utils
}
