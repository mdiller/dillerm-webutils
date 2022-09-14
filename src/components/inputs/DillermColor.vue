<template>
	<div :style="{ background: value }">
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

<style lang="scss" scoped>
@import "../../pretty.scss";

input {
	opacity: 0;
	position: absolute;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	cursor: pointer;
}

div {
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
	font-family: Consolas,monaco,monospace; 
	position: absolute;
	right: $spacing;
	top: $spacing;
	bottom: $spacing;
	line-height: calc(#{$input-line-height} - (#{$spacing} * 2));
	padding: $input-padding;
	background: $input-background;
	border-radius: $input-border-radius;
	font-size: 75%;
	opacity: 0.75;
	pointer-events: none;
	color: $input-color;
	transition: opacity 0.5s;
}

div:hover > span,
div:focus-within > span {
	opacity: 0.95;
}


</style>