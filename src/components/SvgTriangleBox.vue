<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	width: Number,
	height: Number,
	vertices: Array,
	triangles: Array,
	triangle_colors: Array,
	vertex_anim_frames: Array
});

function vertToString(vert) {
	var x = Math.round(vert.x * 100) / 100;
	var y = Math.round(vert.y * 100) / 100;
	return `${x}, ${y}`;
};

const svgTriangles = computed(() => {
	return props.triangles.map((tri, i) => {
		var vertex_frames = Array.from(tri.map(vi => props.vertex_anim_frames[vi]));
		var frames = [];
		for (var j = 0; j < vertex_frames[0].length; j++) {
			frames.push(vertex_frames.map(frms => frms[j]).map(vertToString).join(" "));
		}
		frames = frames.join(";");
		return {
			points: tri.map(vi => props.vertices[vi]).map(vertToString).join(" "),
			color: props.triangle_colors[i],
			frames: frames
		}
	});
})

</script>

<template>
	<svg :viewBox="`0 0 ${width} ${height}`">
		<polygon
			v-for="triangle in svgTriangles"
			:points="triangle.points"
			:style="{ fill: triangle.color, stroke: triangle.color }"
		>
			<animate attributeName="points" :values="triangle.frames" dur="7s" repeatCount="indefinite" />
		</polygon>
	</svg>
</template>

<style scoped>
path {
	stroke-width: 1px;
}
</style>
