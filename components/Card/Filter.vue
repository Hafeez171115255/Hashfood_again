<template>
	<div>
		<Collapse simple v-model="collapse">
			<Panel name="1" v-if="$route.name != 'categories-single-id' && $route.name != 'categories-sub-categories-id'">
				Categories
				<div class="accordion-body" slot="content">
					<form action="#" class="categories-filter">
						<div v-for="(item, index) in categories" :key="'cat' + index">
							<input
								class="form-check-input"
								v-model="category_ids"
								type="checkbox"
								:value="item.id"
							/>
							<label class="form-check-label" for="flexCheckDefault">
								{{ item.name }}
							</label>
						</div>
					</form>
				</div>
			</Panel>
			<Panel name="2">
				Brands
				<div class="accordion-body" slot="content">
					<div
						v-for="(item, index) in brands"
						:key="'br' + index"
						class="form-check"
					>
						<input
							class="form-check-input"
							type="checkbox"
							v-model="brand_ids"
							:value="item.id"
						/>
						<label class="form-check-label" for="flexCheckDefault">
							{{ item.name }}
						</label>
					</div>
				</div>
			</Panel>
			<Panel name="3">
				Price
				<div slot="content" class="accordion-body price-search">
					<form action="#" class="d-flex align-items-center">
						<input
							class="form-control"
							type="number"
							placeholder="5"
							name="quantity"
							min="1"
							v-model="priceFrom"
						/>
						<span>TO</span>
						<input
							class="form-control"
							type="number"
							placeholder="5"
							name="quantity"
							min="1"
							v-model="priceTo"
						/>
					</form>
				</div>
			</Panel>
		</Collapse>

		<button @click="filter" type="submit" class="box-btn mt-4">
			Filter Result
		</button>
	</div>
</template>

<script>
export default {
	props: ["filterUrl"],

	data() {
		return {
			brand_ids: [],
			category_ids: [],
			priceFrom: '',
			priceTo: '',
			sort: 'best_match',
            collapse: '1'
		};
	},

	methods: {
		async filter() {
			this.$emit("filterLoading", true);
			let brand_ids = JSON.stringify(this.brand_ids);
			let category_ids = JSON.stringify(this.category_ids);
			const res = await this.callApi(
				"get",
				`${this.filterUrl}?brand_ids=${brand_ids}&category_ids=${category_ids}&priceFrom=${this.priceFrom}&priceTo=${this.priceTo}&sort_type=`
			);
			if (res.status == 200) {
				this.$emit("changeFilterResult", res.data);
				this.$router.push(
					`?brand_ids=${brand_ids}&category_ids=${category_ids}&priceFrom=${this.priceFrom}&priceTo=${this.priceTo}&sort_type=`
				);
			} else {
				this.swr();
			}
			this.$emit("filterLoading", false);
		},
	},

	mounted(){
		this.brand_ids = this.$route.query.brand_ids ? JSON.parse(this.$route.query.brand_ids) : [];
		this.category_ids = this.$route.query.category_ids ? JSON.parse(this.$route.query.category_ids) : [];
		this.priceFrom = this.$route.query.priceFrom ? this.$route.query.priceFrom : ''
		this.priceTo = this.$route.query.priceTo ? this.$route.query.priceTo : ''
	}
};
</script>