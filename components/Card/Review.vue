<template>
	<div v-if="review" class="single-review">
		<div class="row">
			<div class="col-lg-6">
				<div class="user">
					<div class="icon">
						<img src="/images/person.png" alt="user" />
					</div>

					<div class="content">
						<p v-if="review.user">{{ review.user | fullName }}</p>
						<Rate
							v-if="review"
							v-model="review.rating"
							class="rating"
							disabled
						/>
						<Rate v-else disabled />
					</div>
				</div>
			</div>
			<div class="col-lg-6">
				<p>{{ review.created_at | formatFeedDate }}</p>
			</div>
		</div>
		<div class="review">
			<p>
				{{ review.review_text }}
			</p>
		</div>
	</div>
</template>

<script>
export default {
	props: ["review"],
};
</script>