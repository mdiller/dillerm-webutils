<script setup>

import { ref } from 'vue'
import DillermSelect from './DillermSelect.vue'

function bumpVal() {
	count.value += 1
}

const selected_item = ref(0)
const options = ref([
	{ "label": "<span class=\"text-primary text-bold text-underline\">hello Goo</span>gle", "value": "Google" },
	{ "label": "<span class=\"text-primary text-bold text-underline\">hello Not The</span> Google", "value": "otherthing" }
]);

</script>

<template>
	<div id="demolist">
		<DillermSelect
          label="This is a label"
          v-model="selected_item"
          :options="options"
          :loading="thing1"
          hint="this is a hint"
          input-debounce="500"
        ></DillermSelect>
	</div>
</template>

<script>


</script>

<style scoped>
#demolist {
	margin: 50px;
}
</style>