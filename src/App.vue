<script setup>

import { ref } from "vue"
import ParametersForm from "./components/ParametersForm.vue"
import example_data from "/assets/example_parameters.json"

</script>

<template>
	<div id="demoapp">
		<!-- <a href="https://vuejs.org/" target="_blank">
			<img src="./assets/fizzgig.svg" alt="Self thing" />
		</a> -->
		<h2>Example Parameters</h2>
		<ParametersForm :parameters="example_data" />
	</div>
</template>

<script>




</script>

<style scoped>

#demoapp {
	padding: 50px;
}

</style>