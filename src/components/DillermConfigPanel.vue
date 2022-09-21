<script setup>
import { ref } from 'vue'
import ParametersForm from './ParametersForm.vue';

const props = defineProps({
	show: Boolean,
	config: Object,
})

</script>

<template>
	<div :class="{ 'dillerm': true, 'dillerm-config-panel': true, 'config-panel-hidden': !show }">
		<div>
			<h4>Configuration</h4>
			<ParametersForm
				:parameters="config.parameters"
				:callback="config.parameters_callback" />
		</div>
	</div>
</template>

<style lang="scss">

.dillerm-config-panel {
	max-width: 600px;
	height: 100%;
	background-color: var(--config-panel-background);
	z-index: 1000;

	position: fixed;
	right: 0;
	top: 0;
	bottom: 0;

	overflow-y: auto;

	padding-top: var(--navbar-height);

	transition: all 0.5s ease-in-out;

	
	h4 {
		margin-top: 0px;
		margin-bottom: 24px;
		font-weight: bold;
		text-align: center;
		font-size: 28px;
	}

	> div {
		padding: 50px;
	}

	&.config-panel-hidden {
		transform: translateX(100%);
	}
}

@media only screen and (max-width: 800px) {
	.dillerm-config-panel {
		width: 100%;
		max-width: none;

		> div {
			padding: 10px;
		}

		h4 {
			margin-bottom: 20px;
		}
	}
}

</style>
