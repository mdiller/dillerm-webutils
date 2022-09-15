<script setup>
import { ref, reactive, watch, toRaw, computed } from "vue"
import { debounce } from "../utils";

import DillermCheckbox from "./controls/DillermCheckbox.vue";
import DillermSelect from "./controls/DillermSelect.vue";
import DillermSlider from "./controls/DillermSlider.vue";

const props = defineProps({
	parameters: Object,
	callback: Function
})

const defaultParams = {};
props.parameters.forEach(param => {
	defaultParams[param.name] = param.default;
});
const param_data = reactive(defaultParams);


const debounced_callback = debounce(() => props.callback(toRaw(param_data)), 250);

watch(param_data, (new_value, old_value) => {
	if (props.callback) {
		debounced_callback();
	}
});

</script>

<template>
	<table class="dillerm parameters-container">
		<tr class="parameters-row" v-for="parameter in parameters" >
			<td class="parameter-label">
				{{ parameter.label }}
			</td>
			<td class="parameter-value" valign="middle">
				<dillerm-checkbox
					v-if="parameter.type == 'checkbox'"
					v-model:value="param_data[parameter.name]"
				/>
				<dillerm-select 
					v-if="parameter.type == 'select'"
					v-model:value="param_data[parameter.name]"
					:options="parameter.options"
					emitvalue
				/>
				<dillerm-slider v-if="parameter.type == 'slider'"
					v-model:value="param_data[parameter.name]"
					:min="parameter.min"
					:max="parameter.max"
					:step="parameter.step"
				/>
				<dillerm-slider v-if="parameter.type == 'percent'"
					v-model:value="param_data[parameter.name]"
					:min="parameter.min || 0"
					:max="parameter.max || 1"
					:step="0.01"
					is_percent
				/>
			</td>
		</tr>
	</table>
	<!-- <img src="assets/lowpoly.png" /> -->
</template>

<style lang="scss">
.parameters-container {
	width: 100%;

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
}
</style>

<script>


</script>
