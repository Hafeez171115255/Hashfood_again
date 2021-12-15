<template>
	<div>
		<div v-if="loading" class="loader_center">
			<Loader width="30px"></Loader>
		</div>

		<template v-else>
			<template v-if="!loading && carts.length == 0">
				<NotFound :title="`Cart's Empty`" :width="60" />
			</template>

			<template v-else>
				<ul class="shopping-cart-items">
					<li v-for="(item, index) in carts" :key="index" class="clearfix">
						<template v-if="item.product">
							<img :src="backOfficeURL + item.product.primary_image" />
							<span class="item-name">{{ item.product.title }}</span>
							<span class="item-cart"
								>{{ item.product.category ? item.product.category.name : "" }}
							</span>
							<span class="item-quantity">
								{{ item.quantity }} x ${{ item.unit_price }}
							</span>
							<span class="item-action">
								<a @click.stop.prevent="removeFromCart(item.id)"
									><i class="bx bx-trash"></i
								></a>
							</span>
						</template>
					</li>
				</ul>

				<ul class="sub-total">
					<li>
						Subtotal: <span>${{ total }}</span>
					</li>
					<li>
						<nuxt-link to="/checkout?tab=cart" class="border-bnt">
							View Cart
						</nuxt-link>
					</li>
				</ul>

				<nuxt-link to="/checkout?tab=checkout" class="box-btn ms-auto"
					>Proceed To Checkout</nuxt-link
				>
			</template>
		</template>
	</div>
</template>


<script>
import { mapGetters } from "vuex";
import Loader from "~/components/CircleLoader";
import NotFound from "~/components/NotFound";
export default {
	components: { Loader, NotFound },
	data() {
		return {
			loading: false,
		};
	},

	computed: {
		...mapGetters({
			carts: "getCarts",
			cartLength: "getCartLength",
		}),

		total() {
			let count = 0;
			for (let i of this.carts) {
				count += i.quantity * i.unit_price;
			}
			return count;
		},
	},

	methods: {
		async removeFromCart(id) {
			const res = await this.callApi("post", `/api/cart/remove/${id}`);
			if (res.status == 200) {
				let cartData = [...this.carts];
				cartData = cartData.filter((el) => el.id != id);
				this.$store.commit("setCarts", cartData);
				this.$store.commit("decrementCartLength", 1);
			}
		},

		async getCartProducts() {
			this.loading = false;
			const res = await this.callApi("get", "/api/cart/get/all");
			if (res.status == 200) {
				this.$store.commit("setCarts", res.data);
			}
			this.loading = false;
		},
	},

	async created() {
		if (this.carts.length > 0 && this.carts.length == this.cartLength) return;
		this.getCartProducts();
	},
};
</script>