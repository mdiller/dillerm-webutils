<template>
	<div class="dillerm dillerm-control dillerm-numerical">
		<input :class="{ invalid: !valid }" type="number" v-model="val">
		<span>
			<div @click="tryChange(1)">
				<i class="fa-solid fa-plus"></i>
			</div>
			<div @click="tryChange(-1)">
				<i class="fa-solid fa-minus"></i>
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
		},
		value() {
			this.val = this.value;
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

<style lang="scss">

.dillerm-numerical {
	width: 100%;
	height: var(--input-height);
	display: flex;

	&:hover input,
	& input:focus {
		background: var(--input-hover-color);
	}

	input {
		display: block;
		padding: var(--input-padding);
		width: 100%;
		min-height: var(--input-height);
		appearance: textfield;

		font-family: var(--input-numerical-font-family);
		font-size: var(--input-numerical-font-size);

		border: var(--input-border);
		border-radius: var(--input-border-radius) 0 0 var(--input-border-radius);
		background: var(--input-background);
		color: var(--input-color);

		&:hover,
		&:focus {
			background: var(--input-hover-color);
		}
	}

	> span {
		width: calc(var(--input-height) * 0.50);
		height: 100%;

		div {
			cursor: pointer;
			position: relative;
			background: var(--input-background);
			height: 50%;
			border-top: var(--input-border);
			border-right: var(--input-border);
			border-radius: 0 var(--input-border-radius) 0 0;
			display: flex;
			justify-content: center;
			align-items: center;

			&:last-child {
				border-bottom: var(--input-border);
				border-radius: 0 0 var(--input-border-radius) 0;
			}

			i {
				color: var(--input-color);
				transition: var(--input-transition-time); 
			}

			&:hover i {
				color: var(--input-highlight-color);
			}
		}
	}
}

</style>