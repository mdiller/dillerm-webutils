<script setup>
import { ColorGradient } from "../utils.js"
import { computed, ref, watch } from "vue"
import SvgTriangleBox from "./SvgTriangleBox.vue"

const props = defineProps({
	width: Number,
	height: Number,
	triangle_count_y: Number,
	color_gradient: ColorGradient
});

const ANIMATE = true;
const FRAME_COUNT = 5;
const KEEP_BASE_STRAIGHT = true;
const TRIANGLE_RATIO = 2 / Math.sqrt(3);
const DRIFT_AMOUNT = 0.4;

const triangle_size = computed(() => props.height / props.triangle_count_y);

const max_x = computed(() => Math.ceil(props.width / triangle_size.value / TRIANGLE_RATIO) + 2);
const max_y = computed(() => Math.round(props.height / triangle_size.value) + 1);

function coordToVertIndex(x, y) {
	return (y * max_x.value) + x;
}

const vertex_anim_frames = ref([]);
const vertices = ref([]);
const triangles = ref([]);
const triangle_colors = ref([]);

function generateVertices() {
	var _vertices = [];
	var _anim_frames = [];
	for (let y = 0; y < max_y.value; y++) { 
		for (let x = 0; x < max_x.value; x++) {
			var x_pos = x;
			var y_pos = y;
			if (y % 2 != 0) {
				x_pos -= 0.5;
			}
			x_pos *= TRIANGLE_RATIO;
			var frames = [];
	
			var drift_func_y = () => 0;
			var drift_func_x = () => 0;
			// add drift
			if (DRIFT_AMOUNT != 0 && y != 0) {
				if (x != 0) {
					drift_func_x = () => ((DRIFT_AMOUNT * 2) * Math.random()) - DRIFT_AMOUNT;
				}
				if (y != 0 && !(KEEP_BASE_STRAIGHT && y == max_y.value - 1)) {
					drift_func_y = () => ((DRIFT_AMOUNT * 2) * Math.random()) - DRIFT_AMOUNT;
				}
			}
			if (ANIMATE) {
				for (let i = 0; i < FRAME_COUNT; i++) { 
					frames.push({
						x: (x_pos + drift_func_x()) * triangle_size.value,
						y: (y_pos + drift_func_y()) * triangle_size.value
					});
				}
				frames.push(frames[0]);
			}
			else {
				x_pos += drift_func_x();
				y_pos += drift_func_y();
			}
			
			_anim_frames.push(frames)
			_vertices.push({
				x: x_pos * triangle_size.value,
				y: y_pos * triangle_size.value
			});
		}
	}
	vertex_anim_frames.value = _anim_frames;
	vertices.value = _vertices;
}

function generateTriangles() {
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

watch([props.color_gradient, max_x, max_y, triangle_size, () => DRIFT_AMOUNT], () => {
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
		:vertex_anim_frames="vertex_anim_frames"
	/>
</template>

<style scoped>
svg {
	position: absolute;
	overflow: hidden;
	height: var(--navbar-height);
	left: 0px;
	right: 0px;
	top: 0px;
}
</style>
