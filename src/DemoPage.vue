<script setup>

import { ref } from "vue"
import DillermNavBar from "./components/DillermNavBar.vue"
import example_data from "/assets/example_parameters.json"

import DillermColor from "./components/controls/DillermColor.vue"
import DillermNumerical from "./components/controls/DillermNumerical.vue"
import DillermCheckbox from "./components/controls/DillermCheckbox.vue";
import DillermSelect from "./components/controls/DillermSelect.vue";
import DillermSlider from "./components/controls/DillermSlider.vue";
import DillermText from "./components/controls/DillermText.vue";

const config = ref({
	github_url: "https://github.com/mdiller/",
	parameters: example_data,
	// parameters_callback: values => console.dir(values)
});

const example_values = ref({
	number: 1,
	color: "#00ff00",
	boolean: true,
	text: "",
	option_value: "Example 1",
	options: [ "Example 1", "Example 2", "Example 3" ]
})

function typingTriggered(value) {
	console.log("user just typed: ", value);
}

</script>

<template>
	<DillermNavBar :config="config" />
	<div id="content" class="dillerm dillerm-content">
		<h1>WebUtils Demo Page</h1>
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
			<br/>
			<dillerm-numerical v-model:value="example_values.number" />
			<br/>
			<dillerm-select 
				v-model:value="example_values.option_value"
				:options="example_values.options"
				:emitvalue="true"
				:nullable="true"
				:searchable="true"
			/>
			<br/>
			<dillerm-text 
				v-model:value="example_values.text"
				:clearable="true"
				:debounce_delay="500"
				@typing="typingTriggered"
			/>
			<br/>
			<dillerm-checkbox
				v-model:value="example_values.boolean"
			/>
		</div>
	</div>
</template>

<script>




</script>

<style scoped>

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
}

</style>