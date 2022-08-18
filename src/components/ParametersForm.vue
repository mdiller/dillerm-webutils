<script setup>
import { ref, reactive } from "vue"
import DillermSelect from "./DillermSelect.vue"

const props = defineProps({
	parameters: Object
})

const defaultParams = {};
props.parameters.forEach(param => {
	defaultParams[param.name] = param.default;
	if (param.type == "enum") {
		defaultParams[param.name] = param.options.find(opt => opt.value == param.default);
	}
});
const param_data = reactive(defaultParams);

</script>

<template>
	<div class="parameters-container">
		<div class="parameters-row" v-for="parameter in parameters" >
			<q-checkbox v-if="parameter.type == 'boolean'"
				v-model="param_data[parameter.name]"
				:label="parameter.label"
			/>
			<div v-if="parameter.type != 'boolean'">
				<span class="parameter-label">
					{{ parameter.label }}
				</span>
				<q-select v-if="parameter.type == 'enum'"
					v-model="param_data[parameter.name]"
					:options="parameter.options"

					filled outlined
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
			</div>
		</div>
		{{ param_data.material }}
	</div>
</template>

<style scoped>

.parameters-container {
	max-width: 400px;
}

.parameters-row {
	padding: 5px;
	text-align: left;
}

.parameter-label {
	font-weight: bold;
}

</style>

<script>


</script>
