<template>
	<div class="dillerm dillerm-control dillerm-text">
		<input
			v-model="val"
			type="text"
			:placeholder="placeholder">
		<i 
			class="dillerm-input-clear"
			:class="{ hidden: !clearable || val == '' }"
			@click="val = ''"></i>
	</div>
</template>

<script>
import { debounce } from '../../utils.js';

export default {
	name: 'dillerm-text',
	props: {
		value: {
			type: String,
			required: true
		},
		placeholder: {
			type: String,
			default: ""
		},
		clearable: {
			type: Boolean,
			default: false
		},
		debounce_delay: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			val: null
		}
	},
	computed: {
		debouncedEmit() {
			var emitFunc = () => this.$emit('update:value', this.val);
			emitFunc = this.debounce_delay == 0 ? emitFunc : debounce(emitFunc, this.debounce_delay);
			return () => {
				this.$emit('typing', this.val);
				emitFunc();
			};
		}
	},
	watch: {
		val() {
			this.debouncedEmit();
		},
		value: {
			handler() {
				this.val = this.value;
			}, immediate: true
		}
	}
}
</script>

<style lang="scss">

$button-icon-side-padding: 10px;
$button-icon-size: 20px;

.dillerm-text {
	position: relative;
	width: 100%;
	height: var(--input-height);

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

		font-family: var(--input-font-family);
		font-size: var(--input-font-size);

		border: var(--input-border);
		border-radius: var(--input-border-radius);
		background: var(--input-background);
		color: var(--input-color);

		&:hover,
		&:focus {
			background: var(--input-hover-color);
		}
	}

	.dillerm-input-clear {
		right: 10px;

		&.hidden {
			transition: opacity 0s;
			pointer-events: none;
			opacity: 0;
		}
	}
}

</style>