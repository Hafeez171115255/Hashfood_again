<template>
	<div
		class="tab-pane fade show active"
		id="v-pills-wishlist"
		role="tabpanel"
		aria-labelledby="v-pills-wishlist-tab"
	>
		<div class="wishlist-area">
			<div class="title mb-5">
				<h3>My Wishlist</h3>
			</div>
			<div class="row wishlist">
				<div
					v-for="(item, index) in wishlists.data"
					:key="index"
					class="col-lg-6 col-md-6"
				>
					<ProductSmallCard :product="item.product" />
				</div>
			</div>
		</div>

		<LoaderOverlay v-if="loading" />
	</div>
</template>

<script>
import ProductSmallCard from "~/components/Card/ProductSmall";
import LoaderOverlay from "~/components/Loader/CircleOverlay";

export default {
	components: { ProductSmallCard, LoaderOverlay },

	data() {
		return {
			loading: false,
			wishlists: [],
		};
	},

	async created() {
		this.loading = true;
		const res = await this.callApi("get", "/api/wishlist/get/all");
		if (res.status == 200) {
			this.wishlists = res.data;
		} else {
			this.swr();
		}
		this.loading = false;
	},
};
</script>