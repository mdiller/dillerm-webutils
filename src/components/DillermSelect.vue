<script setup>
import { ref } from 'vue'

const props = defineProps({
	msg: String
})

function bumpVal() {
	count.value += 1
}

const bumpValRef = ref(bumpVal)
const count = ref(0);
</script>

<template>
	<q-select
		filled outlined
		dense
		options-dense
		display-value-html
		options-html
		use-input
		clearable
		v-bind="$attrs"
	></q-select>
</template>

<style scoped>

</style>
