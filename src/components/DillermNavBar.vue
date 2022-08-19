<script setup>
import { ref, computed } from 'vue'

import { ColorGradient } from "../utils.js"
import NavBarSvgBackground from "./NavBarSvgBackground.vue";

const nav_gradient = new ColorGradient(["#23272A", "#202225"]);
// const nav_gradient = new ColorGradient(["#23272A", "#102225"]);


const width = ref(2000);

</script>

<template>
	<div id="dillermbar">
		<NavBarSvgBackground
			:width="width"
			:height="70"
			:color_gradient="nav_gradient"
			:triangle_count_y="3"/>
		<div id="imgcontainer">
			<img src="assets/fizzgig.svg" width="64" height="64" />
		</div>
	</div>
</template>

<style scoped>

#dillermbar {
	height: var(--navbar-height);
	/* background-image: url("/assets/lowpoly.svg");
	background-repeat: repeat; */
}

#imgcontainer {
	position: relative;
	width: 64px;
	height: 64px;
	margin: auto;
}

path {
	transition: all 0.5s ease;
}

path:hover {
	transform-origin: center;
	/* transform: scale(120%); */
	opacity: 20%;
}
</style>
