<template>
	<!-- Page Titel Area -->
	<div class="page-title-area">
		<div class="container">
			<div class="page-title-content">
				<ul>
					<span v-for="(item, index) in routes" :key="'r' + index">
						<li>
							<nuxt-link :to="item.link">
								{{ item.name | capitalize }}
							</nuxt-link>
						</li>
						<li class="p-0">/</li>
					</span>
					<li v-if="active_route">
						<nuxt-link :to="active_route">{{
							active_route | capitalize
						}}</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="shape">
			<img src="/images/shape.png" alt="shape" />
		</div>
	</div>
	<!-- End Page Title Area -->
</template>

<script>
import _ from "lodash";
export default {
	props: ["routes", "active_route", "type"],

	data() {
		return {
			category_index: -1,
			sub_category_index: -1,
		};
	},

	computed: {
		category() {
			if (this.categories && this.type && this.type == "category") {
				let index = this.categories.findIndex(
					(e) => e.id == this.$route.params.id
				);
				this.category_index = index;
				return this.categories[index];
			}
		},

		subCategory() {
			let routes = _.clone(this.routes);
			if (this.categories && this.type && this.type == "sub-category") {
				let index = this.categories.findIndex(
					(e) => e.id == this.$route.params.id
				);
				this.category_index = index;

				routes.push({
					name: this.category[this.category_index].name,
					link: `/categories/${this.categories[this.category_index].id}`,
				});

				if (
					this.categories[this.category_index].sub_category.length > 0 &&
					this.type &&
					this.type == "sub-category"
				) {
					let sindex = this.categories.findIndex(
						(e) => e.id == this.$route.params.id
					);
					this.sub_category_index = sindex;
				}
				return this.categories[this.category_index].sub_category[
					this.sub_category_index
				];
			}
		},
	},
};
</script>