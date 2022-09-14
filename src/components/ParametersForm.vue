<script setup>
import { ref, reactive } from "vue"

import DillermCheckbox from "./inputs/DillermCheckbox.vue";
import DillermSelect from "./inputs/DillermSelect.vue";
import DillermColor from "./inputs/DillermColor.vue";
import DillermSlider from "./inputs/DillermSlider.vue";

const props = defineProps({
	parameters: Object
})

const defaultParams = {};
props.parameters.forEach(param => {
	defaultParams[param.name] = param.default;
});
const param_data = reactive(defaultParams);

</script>

<template>
	<table class="parameters-container">
		<tr class="parameters-row" v-for="parameter in parameters" >
			<td class="parameter-label">
				{{ parameter.label }}
			</td>
			<td class="parameter-value" valign="middle">
				<dillerm-checkbox
					v-if="parameter.type == 'boolean'"
					v-model:value="param_data[parameter.name]"
				/>
				<dillerm-select 
					v-if="parameter.type == 'enum'"
					v-model:value="param_data[parameter.name]"
					:options="parameter.options"
					emitvalue
				/>
				<dillerm-slider v-if="parameter.type == 'integer'"
					v-model:value="param_data[parameter.name]"
					:min="parameter.min"
					:max="parameter.max"
					:step="1"
				/>
				<dillerm-slider v-if="parameter.type == 'float'"
					v-model:value="param_data[parameter.name]"
					:min="parameter.min"
					:max="parameter.max"
					:step="0.001"
				/>
			</td>
		</tr>
	</table>
	<!-- <img src="assets/lowpoly.png" /> -->
</template>

<style>
.q-field__control:not(:hover) {
	border-bottom-left-radius: 4px !important;
	border-bottom-right-radius: 4px !important;
}
.q-field--highlighted .q-field__control {
	border-bottom-left-radius: 0px !important;
	border-bottom-right-radius: 0px !important;
}

.q-slider__track-container--h {
	padding: 16px 6px;
}

</style>

<style scoped>
.parameters-container {
	width: 100%;
}

.parameters-row {
	padding: 5px;
	text-align: left;
}

.parameters-row > * {
	height: 42px;
}

.parameter-label {
	font-weight: bold;
	text-align: right;
	padding: 5px;
}

.parameter-value {
	padding: 0px;
	padding-left: 10px;
	min-width: 250px;
}


</style>

<script>


</script>
