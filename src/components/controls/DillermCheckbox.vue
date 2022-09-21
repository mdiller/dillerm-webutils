<template>
	<div class="dillerm dillerm-control dillerm-checkbox" @click="click">
		<input
			ref="input"
			type="checkbox"
			v-model="val"
			@keyup.enter="toggle"
			@keyup.esc="endEdit">
		<span v-if="value">
		</span>
		<CrossIcon 
			v-if="!value"
			class="anti-check" />
	</div>
</template>

<script>
import CrossIcon from "../../assets/cross.svg?component";
export default {
	name: 'dillerm-checkbox',
	components: {
		CrossIcon
	},
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

<style lang="scss">
@import "../../base.scss";

.dillerm-checkbox {
	// change the 1.0 in the thing below to change the checkbox relative size
	$box-size: calc((#{$input-height} * 1.0));
	
	position: relative;
	width: $box-size;
	height: $box-size;
	border: $input-border;
	border-radius: $input-border-radius;
	position: relative;
	background: $input-background;
	transition: var(--input-transition-time);
	cursor: pointer;

	&:focus-within,
	&:hover {
		background: var(--input-hover-color);
	}

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


	span {
		box-sizing: content-box;
		pointer-events: none;
		position: absolute;
		top: 55%;

		border-right: calc(#{$box-size} / 7) solid var(--input-color);
		border-bottom: calc(#{$box-size} / 7) solid var(--input-color);
		transform: rotate(45deg);
		transform-origin: bottom left;
		animation: checkbox-check 75ms forwards;
	}

	.anti-check {
		fill: var(--input-color);
		opacity: 15%;
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

			width: 19%;
			height: 0px;
			transform: translate3d(0,0,0) rotate(45deg);
		}
		100% {
			left: 15%;
			
			width: 19%;
			height: calc(#{$box-size} * 0.50);
			transform: translate3d(0, calc(#{$box-size} * -0.60),0) rotate(45deg);
		}
	}
}


</style>