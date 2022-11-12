<template>
	<div class="dillerm dillerm-control dillerm-color" :style="{ background: value }">
		<div v-if="!value">
			{{ placeholder }}
		</div>
		<input type="color" :value="val || '#00ff00'" @input="event => val = event.target.value" />
		<span v-if="value">
			{{value}}
		</span>
		<i
			class="dillerm-input-clear"
			v-if="val" 
			@click="val = null"></i>
	</div>
</template>

<script>
import { hexToHsv } from "../../utils.js";

export default {
	name: 'dillerm-color',
	props: {
		value: {
			type: String
		},
		hue: {
			type: Number
		},
		placeholder: {
			type: String,
			default: "Select a color..."
		}
	},
	data() {
		return {
			val: null
		}
	},
	watch: {
		val() {
			this.$emit('update:value', this.val);
			this.$emit('hue', this.val ? hexToHsv(this.val).h : null);
		}
	},
	created() {
		this.val = this.value;
	}
}
</script>

<style lang="scss">

.dillerm-color {
	position: relative;
	width: 100%;
	height: var(--input-height);
	border: var(--input-border);
	border-radius: var(--input-border-radius);
	position: relative;
	background: var(--input-background);

	> div {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		line-height: var(--input-height);
		pointer-events: none;
		padding-left: var(--input-padding-rl);
		color: grey;
	}

	input {
		opacity: 0;
		position: absolute;
		right: 0;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

	$spacing: 4px;

	span {
		position: absolute;
		right: $spacing;
		top: $spacing;
		bottom: $spacing;
		line-height: calc(#{var(--input-line-height)} - (#{$spacing} * 2));
		padding: var(--input-padding);
		background: var(--input-background);
		border-radius: var(--input-border-radius);
		opacity: 0.75;
		pointer-events: none;
		color: var(--input-color);
		transition: opacity var(--input-transition-time);
		
		font-family: var(--input-numerical-font-family);
		font-size: var(--input-numerical-font-size);
	}

	&:hover > span,
	&:focus-within > span {
		opacity: 0.95;
	}

	.dillerm-input-clear {
		right: 80px;
		background: rgba(0, 0, 0, 0.5);
		border-radius: var(--input-border-radius);
	}
}


</style>