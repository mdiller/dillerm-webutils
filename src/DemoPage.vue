<script setup>

import { ref } from "vue"
import DillermNavBar from "./components/DillermNavBar.vue"
import example_data from "/assets/example_parameters.json"

import DillermColor from "./components/controls/DillermColor.vue"
import DillermNumerical from "./components/controls/DillermNumerical.vue"
import DillermCheckbox from "./components/controls/DillermCheckbox.vue";
import DillermSelect from "./components/controls/DillermSelect.vue";
import DillermSlider from "./components/controls/DillermSlider.vue";

const config = ref({
	github_url: "https://github.com/mdiller/",
	parameters: example_data,
	// parameters_callback: values => console.dir(values)
});

const example_options = ref([
	'Example 1', 'Example 2', 'Example 3'
])

const example_values = ref({
	number: 1,
	color: "#00ff00",
	boolean: true,
	option_value: null
})

</script>

<template>
	<DillermNavBar :config="config" />
	<div id="content" class="dillerm">
		<h3>Example Parameters!!</h3>
		hello there 123
		<br/>
		<dillerm-color v-model:value="example_values.color" />
		<br/>
		<dillerm-numerical v-model:value="example_values.number" />
		<br/>
		<dillerm-select 
			v-model:value="example_values.option_value"
			:options="['Example 1', 'Example 2', 'Example 3']"
			nullable
		/>
		<br/>
		<dillerm-slider v-model:value="example_values.number" />
		<br/>
		<dillerm-checkbox v-model:value="example_values.boolean" />
	</div>
</template>

<script>




</script>

<style scoped>

#content {
	max-width: 350px;
}

</style>