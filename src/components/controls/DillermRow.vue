<template>
	<div class="dillerm dillerm-control dillerm-row">
		<span class="dillerm-row-label" v-if="label != null">{{label}}</span>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'dillerm-row',
	props: {
		label: {
			type: String,
			required: false,
			default: null
		}
	}
}
</script>

<style lang="scss">
.dillerm-row {
	background: red;
	display: flex;
	position: relative;

	border-radius: var(--input-border-radius);
	background-color: var(--input-border-color);

	& > * {
		display: inline-block;
		white-space: nowrap;
		flex: 1;

		&.dillerm-slider,
		&.dillerm-numerical {
			display: flex;
		}
		
		&.dillerm-button,
		&.dillerm-checkbox {
			flex: 0;
			min-width: var(--input-height);

			background-color: var(--background-color4);
			&:hover {
				background-color: var(--background-color3);
			}
		}
	}
	> div:not(:first-of-type) {
		border-left-width: 0.5px;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
		& > input {
			border-left-width: 0.5px;
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
		}
	}
	> div:not(:last-of-type) {
		border-right-width: 0.5px;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		& > input {
			border-right-width: 0.5px;
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}
	}

	.dillerm-row-label + div {
		border-top-left-radius: 0px;
		& > input {
			border-top-left-radius: 0px;
		}
	}

	.dillerm-row-label {
		position: absolute;
		top: 0;
		left: 0;
		background: var(--input-border-color);
		padding: 2px 6px;
		transform: translateY(-100%);
		border-top-right-radius: var(--input-border-radius);
		border-top-left-radius: var(--input-border-radius);

	}
}
</style>
