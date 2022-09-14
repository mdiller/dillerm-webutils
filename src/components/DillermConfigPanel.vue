<script setup>
import { ref } from 'vue'
import ParametersForm from './ParametersForm.vue';

const props = defineProps({
	show: Boolean,
	parameters: Array,
})

</script>

<template>
	<div :class="{ 'config-panel': true, 'config-panel-hidden': !show }">
		<div>
			<h4>Configuration</h4>
			<ParametersForm
				:parameters="parameters" />
		</div>
	</div>
</template>

<style scoped>

h4 {
	margin-top: 0px;
	font-weight: bold;
	text-align: center;
}

.config-panel {
	max-width: 600px;
	height: 100%;
	background-color: #202225;
	/* background-color: #36393f; */
	color: #FFFFFF;
	opacity: 0.9;

	position: fixed;
	right: 0;
	top: 0;
	bottom: 0;

	overflow-y: auto;

	padding-top: var(--navbar-height);

	transition: all 0.5s ease-in-out;
}

.config-panel-hidden {
	transform: translateX(100%);
}

.config-panel > div {
	padding: 50px;
}

@media only screen and (max-width: 800px) {
	.config-panel {
		width: 100%;
	}
}

</style>
