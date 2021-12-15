<template>
	<div>
		<FlashSaleDetails :productData="newProducts"/>
	</div>
</template>

<script>
import FlashSaleDetails from "~/components/Home/FlashSale/FlashSaleDetails";
export default {
	components: {
		FlashSaleDetails,
	},

	async asyncData({ app, query }) {
		const bannerSlidesUrl = `/api/home/banners/slides/get`;
		const popurlarProductsUrl = `/api/home/get/product/most-popular`;
		const newProductsUrl = `/api/home/get/product/new`;

		try {
			const [bannerSlides, popularProducts, newProducts] = await Promise.all([
				app.$axios.get(bannerSlidesUrl),
				app.$axios.get(popurlarProductsUrl),
				app.$axios.get(newProductsUrl),
			]);

			return {
				bannerSlides: bannerSlides.data,
				popularProducts: popularProducts.data,
				newProducts: newProducts.data,
			};
		} catch (error) {
			
			return {
				error: true,
			};
		}
	},
};
</script>