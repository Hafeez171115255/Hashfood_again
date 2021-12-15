<template>
	<div>
		<div class="flash-sale-details-time">
			<Timer time="2021-12-25 00:00:00" />
		</div>
		<div class="container">
			<div class="flash-details-area ">
				<div class="row">
					<div
						v-for="(item, index) in productData"
						:key="'flash' + index"
						class="col-lg-3"
					>
						<div class="single-product">
							<FlashSaleCard :product="item.productDetails" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Timer from "~/components/Home/FlashSale/Timer";
// import FlashSaleCard from "~/components/Home/FlashSale/Product";
import FlashSaleCard from "~/components/Card/Product/FlashSale";

export default {
	components: {
		Timer,
		FlashSaleCard,
	},

	props: ["productData"],
};
</script>