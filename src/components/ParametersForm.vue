<script setup>
import { ref, reactive } from "vue"
import DillermSelect from "./DillermSelect.vue"

const props = defineProps({
	parameters: Object
})

const defaultParams = {};
props.parameters.forEach(param => {
	defaultParams[param.name] = param.default;
	// if (param.type == "enum") {
	// 	defaultParams[param.name] = param.options.find(opt => opt.value == param.default);
	// }
});
const param_data = reactive(defaultParams);

</script>

<template>
	<table class="parameters-container">
		<tr class="parameters-row" v-for="parameter in parameters" >
			<td class="parameter-label">
				{{ parameter.label }}
			</td>
			<td :class="[ 'parameter-value', `parameter-value-${parameter.type}`]" valign="middle">
				<q-checkbox v-if="parameter.type == 'boolean'"
					v-model="param_data[parameter.name]"
				/>
				<q-select v-if="parameter.type == 'enum'"
					v-model="param_data[parameter.name]"
					:options="parameter.options"

					emit-value map-options
					filled
					dense
					options-dense
				/>
				<q-slider v-if="parameter.type == 'integer'"
					v-model="param_data[parameter.name]"
					:min="parameter.min"
					:max="parameter.max"
					track-size="10px"
					thumb-size="30px"
					:step="1"
					markers
				/>
				<q-slider v-if="parameter.type == 'float'"
					v-model="param_data[parameter.name]"
					:min="parameter.min"
					:max="parameter.max"
					track-size="10px"
					thumb-size="30px"
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

.parameter-value-boolean {
	padding-left: 5px;
}

.parameter-value-integer,
.parameter-value-float {
	display: flex;
}

</style>

<script>


</script>
