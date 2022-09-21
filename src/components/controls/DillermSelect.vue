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
				class="option-icon"
				v-if="selected_option.icon"
				:src="selected_option.icon"
				:style="selected_option.icon_style">
			<span :class="{ noicon: !selected_option.icon }">
				{{selected_option.label || placeholder}}
			</span>
		</span>
		<div v-if="focused" @mousedown.prevent>
			<div class="select-search-status" v-if="actual_options.length == 0" @mousedown.prevent>
				{{status}}
			</div>
			<div 
				v-for="(option, index) in actual_options"
				:class="{ 'select-search-option': true, hover: (index == hovered_option_index), noicon: !option.icon }"
				@click.stop="selectOption(option)"
				@mousedown.prevent>
				<img
					class="option-icon"
					v-if="option.icon"
					:src="option.icon"
					:style="option.icon_style">
				{{option.label}}
			</div>
		</div>
		<CrossIcon 
			v-if="!focused && selected_option && nullable" 
			@click.stop="selectOption(null)" 
			class="select-search-clear" />
		<DownIcon
			:class="{'select-search-down': true, expanded: focused }"
			@mousedown.prevent.stop="toggleEdit"
			@focus.stop
			@click.stop />
	</div>
</template>

<script>
import CrossIcon from "../../assets/cross.svg?component";
import DownIcon from "../../assets/down.svg?component";
import { escapeRegex, debounce } from '../../utils.js';

export default {
	name: "dillerm-select",
	components: {
		CrossIcon,
		DownIcon
	},
	props: {
		value: {
			required: true,
			validator(value) {
				return value == null || typeof(value) == "object" || typeof(value) == "string";
			}
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
			status: ""
		}
	},
	computed: {
		options_func() {
			if (this.options instanceof Function) {
				return this.options;
			}
			else {
				var newoptions = this.options;
				if (newoptions.length > 0) {
					if (typeof newoptions[0] == "string") {
						newoptions = newoptions.map(opt => { return { label: opt } });
					}
				}
				newoptions.forEach(opt => {
					if (opt.icon_style && !opt.icon) { // give it a transparent icon if we want to style it but we have no icon
						opt.icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAD0lEQVR42mNkwAIYh7IgAAVVAAuInjI5AAAAAElFTkSuQmCC"
					}
				})
				return (input, callback) => {
					if (input) {
						var pattern = new RegExp(escapeRegex(input), "i");
						callback(newoptions.filter(opt => pattern.test(opt.label)))
					}
					else {
						callback(newoptions);
					}
				}
			}
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
		}
	},
	methods: {
		syncValueDown() {
			if (this.value != this.selected_option) {
				if (this.emitvalue) {
					this.selected_option = this.options.find(opt => opt.value == this.value);
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
		this.$el.addEventListener("keydown", this.keyHandler);// test  123
	},
	created() {
		this.debouncedRecreateOptions = debounce(this.recreateOptions, this.debounce_delay);
		this.debouncedRecreateOptions();
		this.syncValueDown();
	}
};
</script>

<style lang="scss">
@import "../../base.scss";

$option-height: calc($input-height - (2 * $input-border-size));

.dillerm-select {
	$button-icon-side-padding: 5px;
	$button-icon-size: 20px;

	position: relative;
	text-align: left;
	color: var(--input-color);
	cursor: pointer;
	

	& > input {
		cursor: pointer;
		width: 100%;
		position: relative;
		border-radius: $input-border-radius;
	}

	& > input.focused {
		width: 100%;
		position: relative;
		border-radius: $input-border-radius $input-border-radius 0 0;
		cursor: text;

		&:not(.searchable) {
			z-index: -100;
			color: transparent;
			cursor: pointer;
		}
	}

	& > div {
		position: absolute;
		background: white;
		top: 100%;
		left: 0;
		right: 0;
		border-right: $input-border;
		border-left: $input-border;
		border-bottom: $input-border;
		border-radius: 0 0 $input-border-radius $input-border-radius;
		overflow-y: auto;
		overflow-x: hidden;
		max-height: 300px;
		z-index: 100;
		background: var(--input-background);
	}

	&:hover,
	&:focus-within {
		& > input {
			background: var(--input-hover-color);
		}
		& > .select-search-down {
			fill: var(--input-highlight-color);
		}
	}
	
	input {
		display: block;
		padding: $input-padding;
		width: 100%;
		min-height: $input-height;

		border: $input-border;
		border-radius: $input-border-radius;
		background: $input-background;
		color: var(--input-color);
		
		&:hover,
		&:focus {
			background: var(--input-hover-color);
		}
	}

	.option-icon {
		height: $option-height;
		width: $option-height;
		vertical-align: middle;
		margin-right: $input-padding-rl;
	}

	.select-search-current {
		& {
			pointer-events: none;
			position: absolute;
			left: $input-border-size;
			top: $input-border-size;
			right: $input-border-size;
			bottom: $input-border-size;
			border-radius: $input-border-radius;
			white-space: nowrap;
			overflow: hidden;
		}

		& span {
			position: absolute;
			left: $input-height;
			top: 0;
			bottom: 0;
			padding: $input-padding;
			line-height: $input-line-height;

			right: calc((#{$button-icon-size} * 2) + #{$button-icon-side-padding});
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
		&.hover {
			background: var(--input-options-hover-color);
		}

		&.noicon {
			line-height: $option-height;
			padding-left: 8px;
		}
	}

	.select-search-status {
		font-size: 14px;
		padding: $input-padding;
		line-height: $input-line-height;
		color: #777777;
	}

	svg {
		width: $button-icon-size;
		height: $button-icon-size;
		position: absolute;
		top: calc((#{$input-height} - #{$button-icon-size}) / 2);
		right: 0;
		cursor: pointer;
		fill: var(--input-color);
		opacity: 0.75;
		transition: 0.25s;

		&.select-search-down {
			right: $button-icon-side-padding;

			&.expanded {
				transform: rotate(180deg);
			}
		}

		&.select-search-clear {
			right: calc(#{$button-icon-size} + #{$button-icon-side-padding});

			&:hover {
				fill: red;
				opacity: 1;
			}
		}
	}
}
</style>