<template>
	<DillermNavBar :config="config" />
	<div id="content" class="dillerm dillerm-content">
		<p>
			The potato is a starchy tuber of the plant Solanum tuberosum and is a root vegetable and a fruit native to the Americas. The plant is a perennial in the nightshade family Solanaceae.
		</p>
		<div class="project-box dillerm-card">
			<a class="project-name" href="https://en.wikipedia.org/wiki/Potato">potato-information</a>
			<p>{{ example_values.text || 'The potato is a starchy tuber of the plant Solanum tuberosum' }}</p>
			<span class="dillerm-card-footer">
				<span>Tasty</span>
				<span>Wow, very nice</span>
			</span>
		</div>
		<div id="demoparamcontainer">
			<dillerm-color v-model:value="example_values.color" />
			<dillerm-numerical v-model:value="example_values.number" />
			<dillerm-select 
				v-model:value="example_values.option_value"
				:options="example_values.options"
				:emitvalue="true"
				:nullable="true"
				:searchable="true"
			/>
			<dillerm-text 
				v-model:value="example_values.text"
				:clearable="true"
				:debounce_delay="500"
				@typing="typingTriggered"
			/>
			<dillerm-slider
				v-model:value="example_values.number"
				:throttle="500"
			/>
			<dillerm-checkbox
				v-model:value="example_values.boolean"
			/>
			<dillerm-checkbox
				v-model:value="config.scale_nav"
			/>
			<dillerm-button
				:onClick="clickTest"
				:icon="'fa-solid fa-bell'"
			/>
			<br/>
			<dillerm-row
				:label="'Example Label'">
				<dillerm-checkbox
					v-model:value="config.scale_nav"
				/>
				<dillerm-slider
					v-model:value="example_values.number"
					:throttle="500"
					:is_percent="config.scale_nav"
				/>
			</dillerm-row>
			<dillerm-row>
				<dillerm-text
					v-model:value="example_values.text"
					:clearable="true"
					:debounce_delay="500"
					@typing="typingTriggered"
				/>
				<dillerm-select
					v-model:value="example_values.option_value"
					:options="example_values.options"
					:emitvalue="true"
					:nullable="true"
					:searchable="true"
				/>
			</dillerm-row>
			<dillerm-row>
				<dillerm-checkbox
					v-model:value="config.enable_thing"
				/>
				<dillerm-color v-model:value="example_values.color" />
				<dillerm-numerical v-model:value="example_values.number" />
			</dillerm-row>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
		</div>
	</div>
</template>

<script>
import DillermNavBar from "./components/DillermNavBar.vue";
import example_data from "/assets/example_parameters.json";

import DillermColor from "./components/controls/DillermColor.vue";
import DillermNumerical from "./components/controls/DillermNumerical.vue";
import DillermCheckbox from "./components/controls/DillermCheckbox.vue";
import DillermSelect from "./components/controls/DillermSelect.vue";
import DillermSlider from "./components/controls/DillermSlider.vue";
import DillermText from "./components/controls/DillermText.vue";
import DillermButton from "./components/controls/DillermButton.vue";
import DillermRow from "./components/controls/DillermRow.vue";

export default {
	components: {
		DillermColor,
		DillermNumerical,
		DillermCheckbox,
		DillermSelect,
		DillermSlider,
		DillermText,
		DillermNavBar,
		DillermButton,
		DillermRow
	},
	data() {
		return {
			config: {
				title: "WebUtils Demo",
				github_url: "https://github.com/mdiller/dillerm-webutils",
				parameters: example_data,
				scale_nav: false,
				enable_thing: true
				// parameters_callback: values => console.dir(values)
			},
			example_values: {
				number: 1,
				color: "#00ff00",
				boolean: true,
				text: "",
				option_value: "Example 1",
				options: [ "Example 1", "Example 2", "Example 3" ]
			}
		}
	},
	methods: {
		typingTriggered(value) {
			console.log("user just typed: ", value);
		},
		loadLanguages() {
			this.example_values.options = Array.from(document.styleSheets)
				.flatMap(sheet => Array.from(sheet.cssRules))
				.filter(rule => rule.selectorText 
					&& rule.selectorText.startsWith(".fa-lang-")
					&& !rule.selectorText.includes("::"))
				.map(rule => {
					var lang = rule.selectorText.replace(".fa-lang-", "");
					return {
						value: lang,
						label: lang,
						icon: `fa-lang-${lang}`
					}
			});
			this.example_values.option_value = this.example_values.options[0].value;
		},
		clickTest() {
			this.example_values.text += "hello ";
			console.log("clicked!");
		}
	},
	created() {
		this.loadLanguages();
	}
}

</script>

<style scoped lang="scss">

.project-box {
	position: relative;
}

.project-name {
	font-size: 20px;
	font-weight: bold;
}

.project-box p {
	margin: 20px 0px;
}

.dillerm-card-footer > :last-child {
	flex-grow: 1;
	text-align: right;
}

#demoparamcontainer {
	max-width: 300px;

	& > * {
		margin-bottom: 10px;
	}
}

</style>