<template>
	<div class="dillerm dillerm-control dillerm-color" :style="{ background: value }">
		<input type="color" v-model="val" />
		<span>
			{{value}}
		</span>
	</div>
</template>

<script>
export default {
	name: 'dillerm-color',
	props: {
		value: {
			type: String,
			required: true
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
		}
	},
	created() {
		this.val = this.value;
	}
}
</script>

<style lang="scss">
@import "../../base.scss";

.dillerm-color {
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

	& {
		position: relative;
		width: 100%;
		height: $input-height;
		border: $input-border;
		border-radius: $input-border-radius;
		position: relative;
		background: $input-background;
	}

	$spacing: 4px;

	span {
		position: absolute;
		right: $spacing;
		top: $spacing;
		bottom: $spacing;
		line-height: calc(#{$input-line-height} - (#{$spacing} * 2));
		padding: $input-padding;
		background: $input-background;
		border-radius: $input-border-radius;
		opacity: 0.75;
		pointer-events: none;
		color: $input-color;
		transition: opacity $input-transition-time;
		
		font-family: $input-numerical-font-family;
		font-size: $input-numerical-font-size;
	}

	&:hover > span,
	&:focus-within > span {
		opacity: 0.95;
	}
}


</style>