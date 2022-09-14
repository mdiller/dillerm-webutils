<template>
	<div @click="click">
		<input
			ref="input"
			type="checkbox"
			v-model="val"
			@keyup.enter="toggle"
			@keyup.esc="endEdit">
		<span v-if="value">
		</span>
	</div>
</template>

<script>
export default {
	name: 'dillerm-checkbox',
	props: {
		value: {
			type: Boolean,
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
	methods: {
		click() {			
			this.toggle();
			this.endEdit();
		},
		endEdit() {			
			this.$refs.input.blur();
		},
		toggle() {			
			this.val = !this.val;
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
	width: 100%;
	height: 100%;
	margin: $input-border-size;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	cursor: pointer;
}

// change the 1.0 in the thing below to change the checkbox relative size
$box-size: calc((#{$input-height} * 1.0) - (#{$input-border-size} * 2));

div {
	position: relative;
	width: $box-size;
	height: $box-size;
	border: $input-border;
	border-radius: $input-border-radius;
	position: relative;
	background: $input-background;
	transition: 0.5s;
}

div:focus-within,
div:hover {
	background: $input-hover-color;
}

span {
	box-sizing: content-box;
	pointer-events: none;
	position: absolute;
	top: 40%;
	left: 10%;

	border-right: calc(#{$box-size} / 7) solid $input-color;
	border-bottom: calc(#{$box-size} / 7) solid $input-color;
	transform: rotate(45deg);
	transform-origin: bottom left;
	animation: checkbox-check 75ms forwards;
}

@keyframes checkbox-check{
	0% {
		left: 0%;
		
		width: 0%;
		height: 0%;
		transform: translate3d(0,0,0) rotate(45deg);
	}
	33% {
		left: 5%;

		width: 23%;
		height: 0px;
		transform: translate3d(0,0,0) rotate(45deg);
	}
	100% {
		left: 10%;
		
		width: 23%;
		height: calc(#{$box-size} * 0.60);
		transform: translate3d(0, calc(#{$box-size} * -0.60),0) rotate(45deg);
	}
}

</style>