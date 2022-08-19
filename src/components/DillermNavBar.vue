<script setup>
import { ref, computed } from 'vue'

import { ColorGradient } from "../utils.js"
import NavBarSvgBackground from "./NavBarSvgBackground.vue";

const props = defineProps({
	github_url: String
})


const nav_gradient = new ColorGradient(["#23272A", "#202225"]);
// const nav_gradient = new ColorGradient(["#23272A", "#102225"]);

const width = ref(2500);

</script>

<template>
	<div id="dillermbar">
		<NavBarSvgBackground
			:width="width"
			:height="70"
			:color_gradient="nav_gradient"
			:triangle_count_y="3"/>
		<div id="logocontainer">
			<img src="assets/fizzgig.png" />
		</div>
		<div class="icon icon-right">
			<img src="assets/gear.svg" />
		</div>
		<a v-if="github_url" :href="github_url" class="icon icon-left">
			<img src="assets/github.svg" />
			<q-tooltip 
				class="bg-grey-10 text-subtitle1 text-weight-bold"
				:offset="[10, 10]"
				anchor="center right" self="center left"
				transition-show="jump-right"
				transition-hide="jump-left">
				View Source
			</q-tooltip>
		</a>
	</div>
</template>

<style scoped>

#dillermbar {
	position: relative;
	overflow: hidden;
	height: var(--navbar-height);
	width: 100%;
	/* background-image: url("/assets/lowpoly.svg");
	background-repeat: repeat; */
	background-color: #202225;
	box-shadow: 0 0 10px 3px #202225;
}

#logocontainer {
	position: relative;
	padding-top: 3px;
	width: 64px;
	height: 64px;
	margin: auto;
	cursor: pointer;
	transition: all 0.5s ease-in-out;
}

#logocontainer > img {
	width: 100%;
}

#logocontainer:hover {
	transform: scale(115%);
	filter: drop-shadow(0px 0px 4px #C67F41);
}

.icon {
	position: absolute;
	top: 0px;
	padding: calc(0.25 * var(--navbar-height));
	width: var(--navbar-height);
	height: var(--navbar-height);
}

.icon-right {
	right: 0px;
}
.icon-left {
	left: 0px;
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
