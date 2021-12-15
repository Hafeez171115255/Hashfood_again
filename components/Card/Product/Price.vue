<template>
	<div class="price">
		<template v-if="obj.offer_price > 0 && obj.main_price > obj.offer_price">
			<p>$ {{ obj.offer_price }}</p>
			<del>$ {{ obj.main_price }}</del>
		</template>
		<template v-else>
			<p>$ {{ obj.main_price }}</p>
		</template>
	</div>
</template>

<script>
export default {
	props: ["obj"],
};
</script>