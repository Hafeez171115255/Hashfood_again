<template>
  <div class="single-product">
    <div class="row align-items-center">
      <div class="col-4">
        <div class="image-small">
          <nuxt-link
            :to="`/products/${product.slug}?tab=description?tab=description`"
          >
            <img :src="backOfficeURL + product.primary_image" alt="product" />
          </nuxt-link>
        </div>
      </div>
      <div class="col-8">
        <div class="content">
          <Rate
            disabled
            v-if="product.avgReview"
            v-model="product.avgReview.averageRating"
          />
          <Rate v-else v-model="product.avgReview" disabled />
          <nuxt-link
            :to="`/products/${product.slug}?tab=description?tab=description`"
          >
            <h3>{{ product.title }}</h3>
          </nuxt-link>
          <Price :obj="product" class="d-flex" />

          <ul class="pop-list">
            <li>
              <a @click="onClickAddToCart"><i class="bx bx-show"></i></a>
            </li>
            <li
              @click="addToWishlist"
              v-if="$route.fullPath != '/profile?tab=wishlist'"
            >
              <a
                v-if="product.wishlist"
                class="add-wish-list"
                @click.stop.prevent
              >
                <i class="bx bx-heart"> </i>
              </a>
              <a v-else><i class="bx bx-heart"></i></a>
            </li>
            <li @click="addToCart(1)">
              <a><i class="bx bx-cart"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Cart Modal -->
    <CartModal
      :product="product"
      :showModal="showCartModal"
      @closeModal="closeModal"
    />
    <!-- Cart Modal Ends -->

    <LoaderOverlay v-if="loading" />
  </div>
</template>
<script>
import CartModal from "~/components/Modal/Cart";
import Price from "~/components/Card/Product/Price";
import LoaderOverlay from "~/components/Loader/CircleOverlay";
import { mapGetters } from "vuex";
export default {
  components: { CartModal, Price, LoaderOverlay },

  props: ["product"],

  data() {
    return {
      showCartModal: false,
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      carts: "getCarts",
    }),
  },

  methods: {
    onClickAddToCart() {
      this.showCartModal = true;
    },

    closeModal(value) {
      this.showCartModal = value;
    },

    async addToCart(quantity) {
      if (!this.authUser) {
        this.i("Please login first");
        this.$router.push("/auth/login");
        return;
      }
      this.loading = true;
      const res = await this.callApi("post", "/api/cart/add/new", {
        product_id: this.product.id,
        quantity: quantity,
        unit_price: this.selectPrice(this.product),
      });
      if (res.status == 200) {
        if (res.data.type == "already-added") {
          this.e("This product has been already added into the cart");
          this.loading = false;
          return;
        }

        let cartData = [...this.carts];
        let cart = res.data.cart;
        cart.product = this.product;
        cartData = [...cartData, cart];
        this.$store.commit("setCarts", cartData);
        this.$store.commit("incrementCartLength", 1);
        this.e("This product has been already added into the cart");
      }
      this.loading = false;
    },

    async addToWishlist() {
      if (!this.authUser) {
        this.i("Please login first");
        this.$router.push("/auth/login");
        return;
      }
      this.loading = true;
      const res = await this.callApi("post", "/api/wishlist/add/new", {
        product_id: this.product.id,
      });
      if (res.status == 200) {
        if (res.data.type == "already-added") {
          this.e("This product has been already added into the wishlist");
          this.loading = false;
          return;
        }
        this.$store.commit("icrementWishlistLength", 1);
        this.product.wishlist = { product_id: this.product.id };
      }
      this.loading = false;
    },
  },
};
</script>