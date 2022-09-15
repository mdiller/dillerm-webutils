<script setup>
import { ref, computed } from "vue"

import fizzgig_svg_url from "../assets/fizzgig.svg?url";
import github_svg_url from "../assets/github.svg?url";
import gear_svg_url from "../assets/gear.svg?url";
import { ColorGradient } from "../utils.js";
import NavBarSvgBackground from "./NavBarSvgBackground.vue";
import DillermConfigPanel from "./DillermConfigPanel.vue";

const props = defineProps({
	config: Object
});


const nav_gradient = new ColorGradient(["#23272A", "#202225"]);

const show_config = ref(true);

</script>

<template>
	<DillermConfigPanel
		v-if="config"
		:show="show_config"
		:config="config" />
	<div class="dillerm dillerm-nav-bar">
		<NavBarSvgBackground
			:width="2500"
			:height="70"
			:color_gradient="nav_gradient"
			:triangle_count_y="3"/>
		<div class="logo-container">
			<img :src="fizzgig_svg_url" />
		</div>
		<div class="logo-text logo-text-left">
			DILLERM
		</div>
		<div class="logo-text logo-text-right">
			TOOLS
		</div>
		<a v-if="config.github_url" :href="config.github_url" class="dillerm-icon dillerm-icon-left">
			<img :src="github_svg_url" />
			<span class="dillerm-tooltip right">
				VIEW SOURCE
			</span>
			<!-- <q-tooltip
				class="dillerm-tooltip"
				anchor="center right" self="center left"
				transition-show="jump-right"
				transition-hide="jump-left">
				VIEW SOURCE
			</q-tooltip> -->
		</a>
		<div @click="show_config = !show_config" class="dillerm-icon dillerm-icon-right config-gear">
			<img :src="gear_svg_url" :class="{ 'spun-gear': show_config }" />
			<span class="dillerm-tooltip left">
				CONFIGURATION
			</span>
		</div>
	</div>
</template>

<style lang="scss">

.dillerm-nav-bar {
	position: relative;
	z-index: 1001;
	overflow: hidden;
	height: var(--navbar-height);
	width: 100%;
	/* background-image: url("/assets/lowpoly.svg");
	background-repeat: repeat; */
	background-color: #202225;
	box-shadow: 0 0 10px 3px #202225;

	.dillerm-app-name {
		box-shadow: 0 0 10px 3px #202225;
	}

	.logo-container {
		transform: scale(100.1%); /* to prevent weirdness when we do a real scale */
		z-index: 2000;
		position: relative;
		padding-top: 3px;
		width: 64px;
		height: 64px;
		margin: auto;
		cursor: grab;
		transition: all 0.5s ease-in-out;
	}

	.logo-container > img {
		width: 100%;
	}

	.logo-container:hover {
		transform: scale(115%);
		filter: drop-shadow(0px 0px 4px var(--orange-color));
	}

	.dillerm-icon {
		position: absolute;
		top: 0px;
		padding: calc(0.25 * var(--navbar-height));
		width: var(--navbar-height);
		height: var(--navbar-height);
	}

	.dillerm-icon-right {
		right: 0px;
	}
	.dillerm-icon-left {
		left: 0px;
	}

	.logo-text {
		transition: all 0.5s ease;
		opacity: 0%;
		position: absolute;
		top: 0px;
		left: 50%;
		height: var(--navbar-height);
		line-height: var(--navbar-height);
		color: var(--orange-color);
		font-weight: bold;
		font-size: 16px;
		font-family: 'Consolas', 'Courier New', Courier, monospace;
	}
	.logo-text-left {
		transform: translateX(-100%);
		padding-right: 45px;
	}
	.logo-text-right {
		padding-left: 45px;
	}

	.logo-container:hover ~ .logo-text {
		opacity: 75%;
	}

	.config-gear {
		cursor: pointer;
	}

	.config-gear > img {
		transition: transform 0.5s ease-in-out;
	}
	.config-gear > img.spun-gear {
		transform: rotate(180deg);
	}

	path {
		transition: all 0.5s ease;
	}

	path:hover {
		transform-origin: center;
		/* transform: scale(120%); */
		opacity: 20%;
	}
}
</style>
