<template>
	<DillermConfigPanel
		v-if="config.parameters"
		:show="show_config"
		:config="config" />
	<div class="dillerm dillerm-nav-bar">
		<NavBarSvgBackground
			v-if="!config.scale_nav"
			:width="2500"
			:height="70"
			:color_gradient="nav_gradient"
			:triangle_count_y="3"/>
		<NavBarScalesBackground v-if="config.scale_nav"/>
		<div v-if="config.title" class="title-container">
			<div class="title">
				{{config.title}}
			</div>
		</div>
		<a v-if="config.github_url" :href="config.github_url" class="dillerm-icon dillerm-icon-left">
			<i class="fa-brands fa-github"></i>
			<span class="dillerm-tooltip right">
				VIEW SOURCE
			</span>
		</a>
		<div v-if="config.parameters" @click="show_config = !show_config" class="dillerm-icon dillerm-icon-right config-gear">
			<i class="fa-solid fa-gear" :class="{ 'spun-gear': show_config }"></i>
			<span class="dillerm-tooltip left">
				CONFIGURATION
			</span>
		</div>
	</div>
</template>

<script>
import fizzgig_svg_url from "../assets/fizzgig.svg?url";
import { ColorGradient } from "../utils.js";
import NavBarSvgBackground from "./NavBarSvgBackground.vue";
import NavBarScalesBackground from "./NavBarScalesBackground.vue";
import DillermConfigPanel from "./DillermConfigPanel.vue";

// window.addEventListener("load", () => {
// 	console.log("boops");
// 	var color1 = getComputedStyle(document.documentElement).getPropertyValue("--background-color3");
// 	var color2 = getComputedStyle(document.documentElement).getPropertyValue("--background-color4");
// 	console.log(color1, color2);
// 	nav_gradient.colors = [color1, color2];
// });

export default {
	name: 'dillerm-navbar',
	components: {
		DillermConfigPanel,
		NavBarSvgBackground,
		NavBarScalesBackground
	},
	props: {
		config: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			nav_gradient: new ColorGradient(["#1b1f27", "#15181e"]),
			show_config: false
		};
	},
	mounted() {
		// Loading overlay
		var body = document.querySelector("body");
		var overlay = document.createElement("div");
		overlay.classList.add("dillerm-loading-overlay");
		body.appendChild(overlay);
		setTimeout(() => body.classList.add("dillerm-loaded"), 200);
		setTimeout(() => body.removeChild(overlay), 2000);

		// Title
		var head = document.querySelector("head");
		if (this.config.title && !head.querySelector("title")) {
			var title = document.createElement("title");
			title.innerText = this.config.title;
			head.appendChild(title);
		}
	}
}

</script>

<style lang="scss">

body:not(.dillerm-loaded) .title {
	transform: translateX(-50%) translateY(-200%);
}

body:not(.dillerm-loaded) .dillerm-nav-bar .dillerm-icon-right {
	transform: translateX(150%);
}

body:not(.dillerm-loaded) .dillerm-nav-bar .dillerm-icon-left {
	transform: translateX(-150%);
}

body:not(.dillerm-loaded) .dillerm-loading-overlay {
	opacity: 1.0;
	z-index: 999;
}

.dillerm-loaded .title {
	transition: transform 0.2s ease-out;
}

.dillerm-loaded .dillerm-nav-bar .dillerm-icon {
	transition: transform 0.5s ease-out, opacity 0.5s;
}

.dillerm-loading-overlay {
	// z-index: -100;
	transition: 1s opacity ease-out, 0s 1s z-index;
	opacity: 0.0;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: var(--background-color1);
	pointer-events: none;
}

.dillerm-nav-bar {
	position: relative;
	z-index: 1001;
	overflow-y: visible;
	overflow-x: clip;
	height: var(--navbar-height);
	width: 100%;
	/* background-image: url("/assets/lowpoly.svg");
	background-repeat: repeat; */
	background-color: var(--background-color3);
	box-shadow: 0 0 10px 3px var(--background-color3);

	.dillerm-icon {
		position: absolute;
		top: 0px;
		width: var(--navbar-height);
		height: var(--navbar-height);
		font-size: 32px;
		color: var(--input-color) !important;
		text-decoration: none !important;
		display: flex;
		justify-content: center;
		align-items: center;

		&:not(:hover) {
			opacity: 90%;
		}
	}

	.dillerm-icon-right {
		right: 0px;
	}
	.dillerm-icon-left {
		left: 0px;
		font-size: 36px;
	}

	.title-container {
		position: absolute;
		top: 0px;
		left: 50%;
		height: var(--navbar-height);
	}

	.title {
		margin-top: calc(var(--navbar-height) / 2);
		background: var(--background-color4);
		padding: 4px 8px;
		box-shadow: 0px 0px 20px 10px var(--background-color4);
		font-weight: bold;
		transform: translateX(-50%) translateY(-50%);
		white-space: nowrap;

		font-size: 26px;
		opacity: 90%;
	}

	.config-gear {
		cursor: pointer;
	}

	.config-gear > i {
		transition: transform 0.5s ease-in-out;
	}
	.config-gear > i.spun-gear {
		transform: rotate(180deg);
	}

	path {
		transition: all 0.5s ease;
	}

	path:hover {
		transform-origin: center;
		// transform: scale(120%);
		opacity: 20%;
	}
}
</style>
