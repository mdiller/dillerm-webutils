import { createApp } from "vue";
import { createApp as createAppClient } from "vue/dist/vue.esm-bundler";

import "./base.scss";

// import components
import DillermConfigPanel from "./components/DillermConfigPanel.vue";
import DillermNavBar from "./components/DillermNavBar.vue";
import NavBarSvgBackground from "./components/NavBarSvgBackground.vue";
import ParametersForm from "./components/ParametersForm.vue";
import SvgTriangleBox from "./components/SvgTriangleBox.vue";
import DillermCheckbox from "./components/controls/DillermCheckbox.vue";
import DillermColor from "./components/controls/DillermColor.vue";
import DillermNumerical from "./components/controls/DillermNumerical.vue";
import DillermSelect from "./components/controls/DillermSelect.vue";
import DillermSlider from "./components/controls/DillermSlider.vue";
const ALL_COMPONENTS = {
	DillermConfigPanel,
	DillermNavBar,
	NavBarSvgBackground,
	ParametersForm,
	SvgTriangleBox,
	DillermCheckbox,
	DillermColor,
	DillermNumerical,
	DillermSelect,
	DillermSlider ,
};

import DemoPage from "./DemoPage.vue";

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
	createVueApp: createAppClient,
	components: ALL_COMPONENTS,
	utils: utils
}
