<template>
	<div class="scales-container">
		<div
			v-for="leaf in leaves"
			class="leaf"
			:style="{
				background: leaf.color,
				left: leaf.left,
				bottom: leaf.bottom,
				'--rand-val': leaf.rand,
				'--leaf-color': leaf.color
			}">

		</div>
	</div>
</template>

<script>
import { ColorGradient } from '../utils';
import create_random_generator from "random-seed";

const leaf_size = 50;
const leaf_width = leaf_size * 1;
const leaf_height = leaf_size * 1;

const leaf_density_x = 1;
const leaf_density_y = 4;
// const leaf_gradient = new ColorGradient(["#315f06", "#85af4d"]);
const leaf_gradient = new ColorGradient(["#1b1f27", "#15181e"]);

export default {
	name: 'dillerm-navbar-scales',
	data() {
		return {
			leaves: []
		};
	},
	methods: {
		createLeaves() {
			var random_generator = create_random_generator(123);
			var leaves = [];
			var i_max = (leaf_density_x * (window.innerWidth / leaf_width)).toFixed();
			var j_max = (leaf_density_y * (70 / leaf_height));
			for (var j = -1; j < j_max + 1; j++) {
				var color_window = 0.3
				var base_gradient = new ColorGradient([
					leaf_gradient.getColor((j / j_max) - color_window),
					leaf_gradient.getColor((j / j_max) + color_window)
				]);
				for (var i = -1; i < i_max; i++) {
					var rand = random_generator.random();
					var color_rand = rand;
					var leaf = {
						left: i / i_max,
						bottom: j / j_max,
						color: base_gradient.getColor(color_rand),
						rand: rand.toFixed(2)
					}
					if (j % 2) {
						leaf.left = (i + 0.5) / i_max;
					}
					var gradient = new ColorGradient([leaf.color, leaf_gradient.colors[0]]);
					if (j == 0) {
						leaf.color = `linear-gradient(to bottom right, ${leaf.color} 0%, ${leaf.color} 50%, ${gradient.getColor(0.5)} 100%)`;
					}
					if (j == -1) {
						leaf.bottom = (j + 1) / j_max;
						leaf.color = `linear-gradient(to bottom right, ${leaf.color} 0%, ${leaf.color} 50%, ${gradient.getColor(0.75)} 100%)`;
					}
					// leaf.bottom += 0.05 * (rand - 0.5);

					leaf.left = (100 * leaf.left).toFixed(2) + "%";
					leaf.bottom = (100 * leaf.bottom).toFixed(2) + "%";
					leaves.push(leaf);
				}
			}
			this.leaves = leaves;
		}
	},
	created() {
		this.createLeaves();
	},
	mounted() {		
		var root = document.querySelector(":root");
		root.style.setProperty("--leaf-width", leaf_width + "px");
		root.style.setProperty("--leaf-height", leaf_height + "px");
	}
}
</script>

<style lang="scss">

// @keyframes leaf-sway {
// 	0% { transform: rotate(15deg); }
// 	50% { transform: rotate(-15deg); }
// 	100% { transform: rotate(15deg); }
// }

.leaf {
	width: var(--leaf-width);
	height: var(--leaf-height);
	position: absolute;
	// border-radius: 5px 5px 0px 5px;
	transform: scale(100%, 100%) rotate(calc(45deg + 0deg * (var(--rand-val) - 0.5)));
	box-shadow: 0 0 5px #0f1115; // #13161b rgba(0, 0, 0, 0.30)
	// transform: rotate(calc(15deg * (var(--rand-val) - 0.5)));
	transition: transform 0.5s;
	pointer-events: auto;
	// animation-name: leaf-sway;
	// animation-duration: calc(1s + (1s * var(--rand-val)));
	// animation-iteration-count: infinite;
}

// .leaf:hover,
// .leaf.retracted {
// 	// transform: rotate(calc(90deg * (var(--rand-val) - 0.5)));
// 	transform: translateY(-10px) scale(100%) rotate(calc(45deg + 5deg * (var(--rand-val) - 0.5)));
// }

.scales-container {
	box-shadow: 0 0 10px 10px var(--background-color3);
	height: var(--navbar-height);
}

</style>