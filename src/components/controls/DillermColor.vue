<template>
	<div class="dillerm dillerm-control dillerm-color" :style="{ background: value }">
		<div v-if="!value">
			{{ placeholder }}
		</div>
		<input type="color" :value="val || '#00ff00'" @input="event => val = event.target.value" />
		<span v-if="value">
			{{value}}
		</span>
		<CrossIcon  
			class="dillerm-input-clear"
			v-if="val" 
			@click="val = null" />
	</div>
</template>

<script>
import CrossIcon from "../../assets/cross.svg?component";

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
	components: {
		CrossIcon
	},
	data() {
		return {
			val: null
		}
	},
	watch: {
		val() {
			this.$emit('update:value', this.val);
			this.$emit('hue', this.val ? DillermWebUtils.utils.hexToHsv(this.val).h : null);
		}
	},
	created() {
		this.val = this.value;
	}
}
</script>

<style lang="scss">


$button-icon-side-padding: 5px;
$button-icon-size: 20px;
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
	
	svg.dillerm-input-clear {
		width: $button-icon-size;
		height: $button-icon-size;
		position: absolute;
		top: calc((#{var(--input-height)} - #{$button-icon-size}) / 2);
		right: 0;
		cursor: pointer;
		fill: var(--input-color);
		opacity: 0.75;
		transition: 0.25s;
		filter: drop-shadow(0px 0px 3px black);

		right: 80px;

		&:hover {
			fill: red;
			opacity: 1;
		}
	}
}


</style>