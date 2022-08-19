<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	width: Number,
	height: Number,
	vertices: Array,
	triangles: Array,
	triangle_colors: Array
});

const svgTriangles = computed(() => {
	return props.triangles.map((tri, i) => {
		return {
			points: tri.map(vi => `${props.vertices[vi].x},${props.vertices[vi].y}`).join(" "),
			fill: props.triangle_colors[i]
		}
	});
})

</script>

<template>
	<svg :viewBox="`0 0 ${width} ${height}`" :width="width" :height="height">
		<polygon
			v-for="triangle in svgTriangles"
			:points="triangle.points"
			:style="{ fill: triangle.fill }"
		/>
	</svg>
</template>

<style scoped>

</style>
