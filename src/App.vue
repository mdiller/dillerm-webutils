<script setup>

import { ref } from "vue"
import ParametersForm from "./components/ParametersForm.vue"
import DillermNavBar from "./components/DillermNavBar.vue"
import example_data from "/assets/example_parameters.json"

const config = ref({
	parameters: example_data
})

</script>

<template>
	<DillermNavBar
		github_url="https://github.com/mdiller/"
		:config="config" />
	<div id="content">
		<h3>Example Parameters!!</h3>
		hello there 123
	</div>
</template>

<script>




</script>

<style scoped>

#content {
	max-width: 600px;
	padding: 50px;
	margin: auto;
}

</style>