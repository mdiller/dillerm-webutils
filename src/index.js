import { createApp } from "vue"

import "./base.scss"

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
	}
}
