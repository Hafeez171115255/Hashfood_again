<template>
	<section class="flash-sale-area mobile-view">
		<div class="container">
			<div class="section-title">
				<div class="row">
					<div class="col-11">
						<h2>Most Popular</h2>
					</div>
					<div class="col-1">
						<a href="#" class="see-more">See More</a>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<div id="popularCarousel" data-bs-ride="carousel">
						<div class="row">
							<hooper :settings="hooperSettings">
								<slide
									v-for="(item, index) in flashSaleProducts"
									:key="'flash' + index"
								>
									<div class="single-popular">
										<FlashSaleCard :product="item.productDetails" />
									</div>
								</slide>
							</hooper>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import FlashSaleCard from "~/components/Card/Product/FlashSale";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
	components: { Hooper, Slide, HooperNavigation, FlashSaleCard },

	props: ["flashSaleProducts", "hooperSettings"],
};
</script>