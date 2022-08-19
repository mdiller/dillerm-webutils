<script setup>
import { ColorGradient } from "../utils.js"
import { computed, ref, watch } from "vue"
import SvgTriangleBox from "./SvgTriangleBox.vue"

const props = defineProps({
	width: Number,
	height: Number,
	triangle_count_y: Number,
	drift_amount: Number,
	color_gradient: ColorGradient
});

const KEEP_BASE_STRAIGHT = true;
const TRIANGLE_RATIO = 2 / Math.sqrt(3);

const triangle_size = computed(() => props.height / props.triangle_count_y);

const max_x = computed(() => Math.ceil(props.width / triangle_size.value / TRIANGLE_RATIO) + 2);
const max_y = computed(() => Math.round(props.height / triangle_size.value) + 1);

function coordToVertIndex(x, y) {
	return (y * max_x.value) + x;
}

const vertices = ref([]);
const triangles = ref([]);
const triangle_colors = ref([]);

function generateVertices() {
	var _vertices = [];
	for (let y = 0; y < max_y.value; y++) { 
		for (let x = 0; x < max_x.value; x++) {
			var x_pos = x;
			var y_pos = y;
			if (y % 2 != 0) {
				x_pos -= 0.5;
			}
			x_pos *= TRIANGLE_RATIO;
			// add drift
			if (props.drift_amount != 0 && y != 0) {
				if (x != 0) {
					x_pos += ((props.drift_amount * 2) * Math.random()) - props.drift_amount;
				}
				if (y != 0 && !(KEEP_BASE_STRAIGHT && y == max_y.value - 1)) {
					y_pos += ((props.drift_amount * 2) * Math.random()) - props.drift_amount;
				}
			}

			_vertices.push({
				x: x_pos * triangle_size.value,
				y: y_pos * triangle_size.value
			});
		}
	}
	vertices.value = _vertices;
}

function generateTriangles() {
	console.log(max_y.value, max_x.value);
	var _triangles = [];
	var _colors = [];
	for (var y = 0; y < max_y.value - 1; y++) {
		for (var x = 0; x < max_x.value - 1; x++) {
			_colors.push(props.color_gradient.getColor(Math.random()));
			_colors.push(props.color_gradient.getColor(Math.random()));
			if (y % 2 == 0) {
				_triangles.push([
					coordToVertIndex(x, y),
					coordToVertIndex(x, y + 1),
					coordToVertIndex(x + 1, y + 1)
				])
				_triangles.push([
					coordToVertIndex(x, y),
					coordToVertIndex(x + 1, y + 1),
					coordToVertIndex(x + 1, y)
				])
			}
			else {
				_triangles.push([
					coordToVertIndex(x, y),
					coordToVertIndex(x, y + 1),
					coordToVertIndex(x + 1, y)
				])
				_triangles.push([
					coordToVertIndex(x + 1, y),
					coordToVertIndex(x, y + 1),
					coordToVertIndex(x + 1, y + 1)
				])
			}
		}
	}
	triangles.value = _triangles;
	triangle_colors.value = _colors;
}

watch([max_x, max_y, triangle_size, () => props.drift_amount], () => {
	generateVertices();
	generateTriangles();
}, {
	immediate: true
});

</script>

<template>
	<SvgTriangleBox
		:width="width"
		:height="height"
		:vertices="vertices"
		:triangles="triangles"
		:triangle_colors="triangle_colors"
	/>
</template>

<style scoped>
svg {
	position: absolute;
	left: 0px;
}
</style>
