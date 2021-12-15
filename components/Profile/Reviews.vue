<template>
	<div
		class="tab-pane fade show active"
		id="v-pills-reviews"
		role="tabpanel"
		aria-labelledby="v-pills-reviews-tab"
	>
		<div class="review-table-area">
			<div class="title">
				<h3>My Reviews</h3>
			</div>
			<div class="table-responsive">
				<table class="table table-striped table-borderless review-table">
					<thead>
						<tr class="heading">
							<th scope="col">Product</th>
							<th scope="col">Date</th>
							<th scope="col">Rating</th>
							<th scope="col">Review</th>
						</tr>
					</thead>
					<tbody class="align-items-center">
						<tr v-for="(item, index) in reviews" :key="'review' + index">
							<td v-if="item.product" data-label="Product">
								<div class="product">
									<nuxt-link
										:to="`/products/${item.product.slug}?tab=description`"
									>
										<div class="icon">
											<img
												:src="backOfficeURL + item.product.primary_image"
												alt="product"
											/>
										</div>
									</nuxt-link>
									<nuxt-link
										:to="`/products/${item.product.slug}?tab=description`"
									>
										{{ item.product.title }}
									</nuxt-link>
								</div>
							</td>

							<td data-label="Date">{{ item.created_at | formatFeedDate }}</td>

							<td data-label="Rating">
								<Rate v-model="item.rating" class="rating" disabled />
							</td>

							<td data-label="Review">{{ item.review_text }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<LoaderOverlay v-if="loading" />
	</div>
</template>

<script>
import LoaderOverlay from "~/components/Loader/CircleOverlay";

export default {
	components: { LoaderOverlay },
	data() {
		return {
			reviews: [],
			loading: false,
		};
	},

	async created() {
		this.loading = true;
		const res = await this.callApi("get", "/api/profile/get/reviews");
		if (res.status == 200) {
			this.reviews = res.data;
		} else {
			this.swr();
		}
		this.loading = false;
	},
};
</script>