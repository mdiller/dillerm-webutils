<script setup>

import { ref } from "vue"
import ParametersForm from "./components/ParametersForm.vue"
import DillermNavBar from "./components/DillermNavBar.vue"
import example_data from "/assets/example_parameters.json"



</script>

<template>
	<DillermNavBar
		github_url="https://github.com/mdiller/" />
	<div id="demoapp">
		<h3>Example Parameters</h3>
		<ParametersForm :parameters="example_data" />
		
	</div>
</template>

<script>




</script>

<style scoped>

#demoapp {
	max-width: 600px;
	padding: 50px;
	margin: auto;
}

</style>