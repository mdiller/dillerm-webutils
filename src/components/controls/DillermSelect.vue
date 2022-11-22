<template>
	<div 
		@click="startEdit"
		@focus="startEdit"
		class="dillerm dillerm-control dillerm-select">
		<input
			ref="input"
			type="text"
			:placeholder="(focused || !selected_option) ? placeholder : ''"
			v-model="input"
			@focus.prevent="startEdit"
			@blur="endEdit"
			@keyup.esc="endEdit"
			:class="{ focused: focused, searchable: searchable }"
			:inputmode="searchable ? 'text' : 'none'">
		<span
			class="select-search-current"
			v-if="selected_option && (!searchable || !focused)">
			<img
				v-if="selected_option.icon_type == ICON_TYPES.img || selected_option.icon_type == ICON_TYPES.styled"
				class="option-icon"
				:src="selected_option.icon || TRANSPARENT_IMAGE"
				:style="selected_option.icon_style">
			<div
				v-if="selected_option.icon_type == ICON_TYPES.fa"
				class="option-icon">
				<i :class="selected_option.icon">
				</i>
			</div>
			<span :class="{ noicon: selected_option.icon_type == ICON_TYPES.none }">
				{{selected_option.label || placeholder}}
			</span>
		</span>
		<div class="select-options" v-if="focused" @mousedown.prevent>
			<div>
				<div class="select-search-status" v-if="actual_options.length == 0" @mousedown.prevent>
					{{status}}
				</div>
				<div 
					v-for="(option, index) in actual_options"
					:class="{ 'select-search-option': true, hover: (index == hovered_option_index), noicon: option.icon_type == ICON_TYPES.none, 'is-selected': option == selected_option }"
					@click.stop="selectOption(option)"
					@mousedown.prevent>
					<img
						v-if="option.icon_type == ICON_TYPES.img || option.icon_type == ICON_TYPES.styled"
						class="option-icon"
						:src="option.icon || TRANSPARENT_IMAGE"
						:style="option.icon_style">
					<div
						v-if="option.icon_type == ICON_TYPES.fa"
						class="option-icon">
						<i :class="option.icon">
						</i>
					</div>
					{{option.label}}
				</div>
			</div>
		</div>
		<i	
			v-if="!focused && selected_option && nullable" 
			class="dillerm-input-clear"
			@click.stop="selectOption(null)"></i>
		<i
			class="dillerm-input-expand"
			:class="{ expanded: focused }"
			@mousedown.prevent.stop="toggleEdit"
			@focus.stop
			@click.stop></i>
	</div>
</template>

<script>
import { escapeRegex, debounce } from '../../utils.js';

const ICON_TYPES = {
	none: "None",
	img: "Image",
	styled: "JustStyle",
	fa: "FontAwesome"
}

export default {
	name: "dillerm-select",
	props: {
		value: {
			required: true
		},
		options: {
			// type: Function, // callback(newoptions, optional newstatus), or just a list of options
			required: true
		},
		placeholder: {
			type: String,
			default: ""
		},
		nullable: {
			type: Boolean,
			default: false
		},
		emitvalue: {
			type: Boolean,
			default: false
		},
		searchable: {
			type: Boolean,
			default: true
		},
		debounce_delay: {
			type: Number,
			default: 250
		}
	},
	data() {
		return {
			selected_option: null,
			input: "",
			focused: false,
			hovered_option_index: -1,
			actual_options: [],
			status: "",
			TRANSPARENT_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAD0lEQVR42mNkwAIYh7IgAAVVAAuInjI5AAAAAElFTkSuQmCC"
		}
	},
	watch: {
		input() {
			this.status = "Searching...";
			this.debouncedRecreateOptions();
		},
		value() {
			this.syncValueDown();
		},
		selected_option() {			
			if (this.emitvalue && this.selected_option) {
				this.$emit('update:value', this.selected_option.value);
			}
			else {
				this.$emit('update:value', this.selected_option);
			}
		},
		options: {
			handler() {
				this.compute_options_func();
			}, immediate: true
		}
	},
	methods: {
		getIconType(option) {
			if (!option.icon) {
				return option.icon_style ? ICON_TYPES.styled : ICON_TYPES.none;
			}
			else {
				if (!option.icon.includes("http") && option.icon.includes("fa-")) {
					return ICON_TYPES.fa;
				}
				else {
					return ICON_TYPES.img
				}
			}
		},
		compute_options_func() {	
			if (this.options instanceof Function) {
				this.options_func = this.options;
			}
			else {
				var newoptions = this.options;
				if (newoptions.length > 0) {
					if (typeof newoptions[0] == "string") {
						newoptions = newoptions.map(opt => { return { label: opt, value: opt } });
					}
				}
				this.options_func = (input, callback) => {
					if (input) {
						var pattern = new RegExp(DillermWebUtils.utils.escapeRegex(input), "i");
						callback(newoptions.filter(opt => pattern.test(opt.label)))
					}
					else {
						callback(newoptions);
					}
				};
			}
			this.recreateOptions();
		},
		syncValueDown() {			
			if (this.value != this.selected_option) {
				if (this.emitvalue) {					
					this.selected_option = this.actual_options.find(opt => opt.value == this.value);					
				}
				else {
					this.selected_option = this.value;
				}
			}
		},
		toggleEdit() {
			if (this.focused) {
				this.endEdit();
			}
			else {
				this.startEdit();
			}
		},
		startEdit() {
			this.focused = true;
			this.$refs.input.focus();
		},
		endEdit() {
			this.focused = false;
			this.input = "";
			this.$refs.input.blur();
			this.hovered_option_index = -1;
		},
		recreateOptions() {			
			var self = this;
			this.hovered_option_index = -1;
			this.options_func(this.input, (newoptions, newstatus) => {
				if (newstatus != undefined) {
					self.status = newstatus;
				}
				else if (newoptions.length == 0) {
					self.status = "None Found";
				}
				newoptions.forEach(option => {
					option.icon_type = this.getIconType(option);
				})
				self.actual_options = newoptions;
			});
		},
		selectOption(option) {
			if (option !== undefined) {
				this.selected_option = option;
				this.endEdit();
			}
		},
		keyHandler(event) {
			var index_before = this.hovered_option_index;
			if (event.key == "ArrowDown") {
				if (this.hovered_option_index < this.actual_options.length - 1) {
					this.hovered_option_index++;
				}
			}
			else if (event.key == "ArrowUp") {
				if (this.hovered_option_index > 0) {
					this.hovered_option_index--;
				}
			}
			else if (event.key == "Enter") {
				if (this.hovered_option_index != -1 && this.actual_options.length > 0) {
					this.selectOption(this.actual_options[this.hovered_option_index]);
				}
				else {
					this.selectOption(this.actual_options[0]);
				}
			}
			if (index_before != this.hovered_option_index && index_before != -1 && this.focused) {
				this.$el.querySelectorAll(":scope .select-search-option")[this.hovered_option_index].scrollIntoView({block: "nearest", inline: "nearest"});
			}
		}
	},
	mounted() {
		this.$el.addEventListener("keydown", this.keyHandler);
	},
	created() {		
		this.debouncedRecreateOptions = debounce(this.recreateOptions, this.debounce_delay);
		this.syncValueDown();
		this.ICON_TYPES = ICON_TYPES;
	}
};
</script>

<style lang="scss">
$option-height: calc(var(--input-height) - (2 * var(--input-border-size)));

@keyframes options-anim {
	0% { transform: translateY(-100%); }
	100% { transform: translateY(0%); }
}

.dillerm-select {
	position: relative;
	text-align: left;
	color: var(--input-color);
	cursor: pointer;

	& > input {
		cursor: pointer;
		width: 100%;
		position: relative;
		border-radius: var(--input-border-radius);
		line-height: var(--input-line-height);
	}

	& > input.focused {
		width: 100%;
		position: relative;
		border-radius: var(--input-border-radius) var(--input-border-radius) 0 0;
		cursor: text;

		&:not(.searchable) {
			color: transparent;
			cursor: pointer;
			pointer-events: none;
		}
	}

	& > .select-options {
		overflow-y: hidden;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 100;

		& > div {
			animation-name: options-anim;
			animation-duration: calc(var(--input-transition-time) / 2);
			background: var(--input-background);
			border-right: var(--input-border);
			border-left: var(--input-border);
			border-bottom: var(--input-border);
			border-radius: 0 0 var(--input-border-radius) var(--input-border-radius);
			overflow-y: auto;
			overflow-x: hidden;
			max-height: 300px;
		}
	}

	&:hover,
	&:focus-within {
		& > input {
			background: var(--input-hover-color);
		}
		& > .dillerm-input-expand {
			color: var(--input-highlight-color);
		}
	}
	
	input {
		display: block;
		padding: var(--input-padding);
		width: 100%;
		min-height: var(--input-height);

		border: var(--input-border);
		border-radius: var(--input-border-radius);
		background: var(--input-background);
		color: var(--input-color);

		font-family: var(--input-font-family);
		font-size: var(--input-font-size);
		
		&:hover,
		&:focus {
			background: var(--input-hover-color);
		}
	}

	&:has(.option-icon i) {
		.option-icon {
			margin-right: 0px;
		}
		.select-search-current span {
			padding-left: 0px;
		}
	}

	.option-icon {
		height: $option-height;
		width: $option-height;
		vertical-align: middle;
		margin-right: var(--input-padding-rl);
	}

	div.option-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 22px;
	}

	.select-search-current {
		pointer-events: none;
		position: absolute;
		left: var(--input-border-size);
		top: var(--input-border-size);
		right: var(--input-border-size);
		bottom: var(--input-border-size);
		border-radius: var(--input-border-radius);
		white-space: nowrap;
		overflow: hidden;

		& span {
			position: absolute;
			left: var(--input-height);
			top: 0;
			bottom: 0;
			padding: var(--input-padding);
			line-height: var(--input-line-height);

			right: calc((var(--input-icon-button-size) * 2) + var(--input-icon-button-side-padding));
			padding-right: 0px;
			overflow: hidden;
			text-overflow: ellipsis;

			&.noicon {
				left: 0;
			}
		}
	}
	.select-search-option {
		float: left;
		white-space: nowrap;
		width: 100%;
		height: $option-height;
		cursor: pointer;
		background: var(--input-options-color);
		transition: 0.25s;

		&:hover,
		&.hover,
		&.is-selected {
			background: var(--input-options-hover-color);
		}

		&.noicon {
			line-height: $option-height;
			padding-left: 8px;
		}
	}

	.select-search-status {
		font-size: 14px;
		padding: var(--input-padding);
		line-height: var(--input-line-height);
		color: #777777;
	}

	.dillerm-input-clear {
		right: calc(var(--input-icon-button-size) + var(--input-icon-button-side-padding));
	}
}
</style>