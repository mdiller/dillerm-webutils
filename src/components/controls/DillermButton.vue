<template>
	<div class="dillerm dillerm-control dillerm-button" @click="click">
		<i
			:class="icon"
			:style="{ transform: rotation === undefined ? undefined : `rotate(${rotation}deg)` }" />
	</div>
</template>

<script>
export default {
	name: 'dillerm-button',
	props: {
		onClick: {
			type: Function,
			required: false,
			default: null
		},
		icon: {
			type: String,
			default: "fa-regular fa-circle-dot",
			required: false
		},
		rotation: {
			type: Number,
			default: undefined,
			required: false
		}
	},
	data() {
		return {
			val: null
		}
	},
	watch: {
	},
	methods: {
		click() {
			if (this.onClick) {
				this.onClick(this.val);
			}
		}
	},
	created() {
	}
}
</script>

<style lang="scss">

.dillerm-button {
	width: var(--input-height);
	height: var(--input-height);
	background-color: var(--background-color4);

	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;

	i {
		opacity: 0.75;
		color: var(--input-color);
		transition: transform 0.25s, color 0.5s;
		font-size: 24px;
		transform: rotate(50);
	}

	&:hover,
	&:hover {
		background-color: var(--background-color3);

		i {
			color: var(--highlight-color1)
		}
	}
}


</style>