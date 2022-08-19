<script setup>
import { ref, computed } from 'vue'

import { ColorGradient } from "../utils.js"
import NavBarSvgBackground from "./NavBarSvgBackground.vue";

const nav_gradient = new ColorGradient(["#23272A", "#202225"]);
// const nav_gradient = new ColorGradient(["#23272A", "#102225"]);

</script>

<template>
	<div id="dillermbar">
		<div id="imgcontainer">
			<img src="assets/fizzgig.svg" width="64" height="64" />
		</div>
		<NavBarSvgBackground
			:width="900"
			:height="70"
			:color_gradient="nav_gradient"
			:triangle_count_y="3"
			:drift_amount="0.3"/>
	</div>
</template>

<style scoped>

#dillermbar {
	height: 70px;
	/* background-image: url("/assets/lowpoly.svg");
	background-repeat: repeat; */
}

#imgcontainer {
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
