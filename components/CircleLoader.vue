<template>
	<div
		style="
			position: relative;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			color: #7e7e7e;
		"
		class="svg_loader"
	>
		<svg
			style="stroke: #7e7e7e; width: 100%; height: 100%"
			class="svg_container"
			:height="width"
			:width="width"
			viewBox="0 0 100 100"
		>
			<circle class="loader_svg animate" cx="50" cy="50" r="45"></circle>
		</svg>
	</div>
</template>

<script>
export default {
	props: ["width"],
};
</script>

<style>
.svg_loader {
	display: flex;
	position: relative;
	align-content: space-around;
	justify-content: center;
}
.loader_svg {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	fill: none;
	stroke-width: 5px;
	stroke-linecap: round;
}
.animate {
	stroke-dasharray: 242.6;
	animation: fill-animation 1s cubic-bezier(1, 1, 1, 1) 0s infinite;
}

@keyframes fill-animation {
	0% {
		stroke-dasharray: 40 242.6;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 141.3;
		stroke-dashoffset: 141.3;
	}
	100% {
		stroke-dasharray: 40 242.6;
		stroke-dashoffset: 282.6;
	}
}
</style>