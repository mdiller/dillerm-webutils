<script setup>
import { ref } from 'vue'

defineProps({
	msg: String
})

function bumpVal() {
	count.value += 1
}

const bumpValRef = ref(bumpVal)
const count = ref(0);
</script>

<template>
	<h1>{{ msg }}</h1>
	<p @click="bumpValRef">Heres some example text: {{ count }}</p>
</template>

<style scoped>

</style>
