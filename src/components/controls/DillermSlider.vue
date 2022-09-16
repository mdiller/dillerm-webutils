<template>
	<div class="dillerm dillerm-control dillerm-slider">
		<span class="slider-number">
			{{ pretty_value }}
			<!-- <input
				:class="{ invalid: !valid }"
				type="number"
				v-model="val"
				:min="min"
				:max="max"> -->
		</span>
		<span
			:class="{ 'slider-bar': true, 'dragging': dragging }"
			@mousedown="startDrag"
			@touchstart="startDrag">
			<span class="slider-bar-prefix"></span>
			<span class="slider-bar-back">
				<span
					class="slider-bar-left"
					:style="{ width: pretty_drag_percent }"
				></span>
				<span
					class="slider-bar-grabber"
					:style="{ left: pretty_drag_percent }"
				></span>
			</span>
			<span class="slider-bar-postfix"></span>
		</span>
		<input
			:class="{ invalid: !valid }"
			type="range"
			v-model="val"
			:min="min"
			:max="max"
			:step="step">
	</div>
</template>

<script>
import { debounce } from "../../utils";
// https://stackoverflow.com/questions/14627566/
function stepRound(number, increment, offset) {
	return Math.round((number - offset) / increment ) * increment + offset;
}

export default {
	name: 'dillerm-slider',
	props: {
		value: {
			type: Number,
			required: true
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		step: {
			type: Number,
			default: 1
		},
		debounce: {
			type: Number,
			default: 0
		},
		is_percent: {
			type: Boolean,
			default: false
		},
		filter: Function
	},
	data() {
		return {
			val: null,
			valid: false,
			dragging: false,
			drag_percent: 0
		}
	},
	computed: {
		pretty_value() {
			var value = this.val;
			if (this.is_percent) {
				value = (((value - this.min) / (this.max - this.min)) * 100);
				return `${Math.round(value)}%`
			}
			value = this.is_integer ? value.toFixed(0) : value.toFixed(2);
			return value;
		},
		is_integer() {
			return Number.isInteger(this.step) && Number.isInteger(this.min)
		},
		pretty_drag_percent() {
			var percent = this.dragging ? this.drag_percent : (this.val - this.min) / (this.max - this.min);
			return `${(percent * 100).toFixed(2)}%`
		}
	},
	watch: {
		val() {
			this.debounced_emit();
			this.valid = true;
		},
		value() {
			this.val = this.value;
		}
	},
	methods: {
		setPercent(percent) {
			percent = percent < 0 ? 0 : percent;
			percent = percent > 1 ? 1 : percent;
			this.drag_percent = percent;
			var value = this.min + ((this.max - this.min) * this.drag_percent);
			this.val = stepRound(value, this.step, 0);
		},
		getMouseEvents() {
			return {
				"mouseup": this.endDrag,
				"mousemove": this.moveDrag,
				"touchend": this.endDrag,
				"touchmove": this.moveDrag,
				"blur": this.endDrag
			}
		},
		startDrag(event) {
			var mouse_events = Object.entries(this.getMouseEvents());
			mouse_events.forEach(([k,v]) => document.removeEventListener(k, v));
			mouse_events.forEach(([k,v]) => document.addEventListener(k, v));
			this.dragging = true;
			this.moveDrag(event);
		},
		moveDrag(event) {
			if (this.dragging) {
				var clientX = event.clientX;
				if (!clientX && event.touches) {
					clientX = event.touches[0].clientX;
				}
				// This code could be optimized by moving almost all of this to the beginning of the drag
				var bar_element = this.$el.querySelector(":scope .slider-bar-back");
				var rect = bar_element.getBoundingClientRect();
				var percent = (clientX - rect.left) / (rect.right - rect.left);

				this.setPercent(percent);
			}
		},
		endDrag(event) {
			var mouse_events = Object.entries(this.getMouseEvents());
			mouse_events.forEach(([k,v]) => document.removeEventListener(k, v));
			this.dragging = false;
		}
	},
	created() {
		this.val = this.value;
		this.debounced_emit = debounce(() => this.$emit('update:value', Number(this.val)), this.debounce);
	}
}
</script>

<style lang="scss">
@import "../../base.scss";

.dillerm-slider {
	position: relative;
	& {
		border: $input-border;
		border-radius: $input-border-radius;
		width: 100%;
		height: $input-height;
		display: flex;
		background: $input-background;
		transition: background $input-transition-time;
	}

	&:hover,
	&:focus-within {
		background: $input-hover-color;

		.slider-bar-grabber {
			background: $input-highlight-color !important;
		}
	}

	span.slider-number {
		line-height: calc($input-height - (2 * $input-border-size));
		color: $input-color;
		border-right: $input-border;
		min-width: 46px;
		padding: 0px 8px;
		text-align: center;
		
		font-family: $input-numerical-font-family;
		font-size: $input-numerical-font-size;
	}
	// input[type="number"] {
	// 	min-width: 10px;
	// 	// background: red;
	// 	appearance: textfield;
	// 	border-style: none;
	// 	min-height: calc($input-height - (2 * $input-border-size)) !important;
	// }
	$grabber-width: 15px;

	.slider-bar {
		width: 100%;
		display: table;
		cursor: grab;
		border-spacing: 0px;

		&.dragging {
			cursor: grabbing;

			.slider-bar-grabber {
				transform: translateX(-50%) scale(110%);
			}
		}

		* {
			user-select: none;
			height: calc($input-height - (2 * $input-border-size));
		}

		span {
			display: table-cell;
		}

		.slider-bar-prefix,
		.slider-bar-postfix {
			width: calc($grabber-width / 2) - 2px;
		}

		.slider-bar-prefix {
			border-radius: $input-border-radius 0px 0px $input-border-radius;
			background: $input-color;
			opacity: 50%;
		}
		.slider-bar-postfix {
			border-radius: 0px $input-border-radius $input-border-radius 0px;
		}

		.slider-bar-back {
			position: relative;
		}

		.slider-bar-left {
			position: absolute;
			left: 0px;
			width: 25%;
			display: inline-block;
			background: $input-color;
			opacity: 50%;
		}
		.slider-bar-grabber {
			position: absolute;
			left: 25%;
			width: $grabber-width;
			border-radius: $input-border-radius;
			transform: translateX(-50%);
			display: inline-block;
			background: $input-color;
			transition: background $input-transition-time, transform 0.25s;
		}
		
	}

	input[type="range"] {
		position: absolute;
		left: 0px;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 10px;
		z-index: -1000;
	}
}




</style>