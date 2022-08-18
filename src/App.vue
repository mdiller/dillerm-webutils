<script setup>

import ExampleComponent from './components/ExampleComponent.vue'
import data from './assets/test.json'

</script>

<template>
	<div>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/fizzgig.svg" alt="Self thing" />
		</a>
	</div>
	<ExampleComponent msg="Webapp Template" />
</template>

<script>

console.log(data.examplestuff);

</script>