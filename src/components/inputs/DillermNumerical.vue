<template>
	<div class="numerical-input">
		<input :class="{ invalid: !valid }" type="number" v-model="val">
		<span>
			<div @click="tryChange(1)">
				<svg viewBox="0 0 32 32">
					<path d="M 8,16 L 24,16 M 16,8 L 16,24">
					</path>
				</svg>
			</div>
			<div @click="tryChange(-1)">
				<svg viewBox="0 0 32 32">
					<path d="M 8,16 L 24,16">
					</path>
				</svg>
			</div>
		</span>
	</div>
</template>

<script>
export default {
	name: 'dillerm-numerical',
	props: {
		value: {
			type: Number,
			required: true
		},
		integer: {
			type: Boolean,
			default: true
		},
		min: Number,
		max: Number,
		filter: Function
	},
	data() {
		return {
			val: null,
			valid: false
		}
	},
	watch: {
		val() {
			if (typeof this.val == "string") {
				if (!isNaN(parseFloat(this.val)) && isFinite(this.val)) {
					this.val = parseFloat(this.val);
					return;
				}
				else {
					this.valid = false;
					return;
				}
			}
			if (!this.isValidNumber(this.val)) {
				this.valid = false;
				return;
			}
			this.$emit('update:value', this.val);
			this.valid = true;
		}
	},
	methods: {
		isValidNumber(val) {
			return !((this.integer && !Number.isInteger(val)) || 
				(this.max != undefined && val > this.max) ||
				(this.min != undefined && val < this.min) ||
				(this.filter != undefined && !this.filter(val)));
		},
		tryChange(difference) {
			var newValue = this.value + difference;
			if (this.isValidNumber(newValue)) {
				this.val = newValue;
			}
		}
	},
	created() {
		this.val = this.value;
	}
}
</script>

<style lang="scss" scoped>
@import "../../pretty.scss";

.numerical-input {
	& {
		width: 100%;
		height: $input-height;
		display: flex;
	}

	&:hover input,
	& input:focus {
		background: $input-hover-color;
	}

	input {
		appearance: textfield;
		border-radius: $input-border-radius 0 0 $input-border-radius !important;
	}

	> span {
		& {
			width: calc(#{$input-height} * 0.50);
			height: 100%;
		}

		div {
			& {
				cursor: pointer;
				position: relative;
				background: $input-background;
				height: 50%;
				border-top: $input-border;
				border-right: $input-border;
				border-radius: 0 $input-border-radius 0 0;
			}

			&:last-child {
				border-bottom: $input-border;
				border-radius: 0 0 $input-border-radius 0;
			}

			svg {
				pointer-events: none;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				stroke: $input-color;
				stroke-width: 4px;
				transition: 0.5s; 
			}

			&:hover svg {
				stroke: $input-highlight-color;
			}
		}
	}
}

</style>