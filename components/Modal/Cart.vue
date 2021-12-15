<template>
  <Modal v-model="showingModal" :footer-hide="true" :closable="false">
    <div v-if="product" class="modal show">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div slot="header" class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              {{ product.title }}
            </h5>
            <button
              @click="closeModal"
              type="button"
              class="btn-close p-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-5">
            <div class="container">
              <div class="single-preview">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="d-flex flex-column justify-content-center">
                      <div v-if="images.length > 0" class="main_image">
                        <a href="#">
                          <img
                            :src="backOfficeURL + images[imageIndex].url"
                            id="main_product_image"
                          />
                        </a>
                      </div>
                      <div class="thumbnail-images">
                        <ul id="thumbnail">
                          <li v-for="(item, index) in images" :key="index">
                            <a>
                              <img
                                @click="imageIndex = index"
                                :src="backOfficeURL + item.url"
                                width="70"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="details-content">
                      <div class="page-title-content">
                        <ul>
                          <li class="p-0">
                            <a href="index.html"> Home </a>
                          </li>
                          <li class="p-0">/</li>
                          <li v-if="product.category">
                            <nuxt-link
                              :to="`/categories/single/${product.category.id}`"
                            >
                              {{ product.category.name }}
                            </nuxt-link>
                          </li>
                          <template v-if="product.sub_category">
                            <li class="p-0">/</li>
                            <li>
                              <nuxt-link
                                :to="`/categories/sub-categories/${product.sub_category.id}`"
                              >
                                {{ product.sub_category.name }}
                              </nuxt-link>
                            </li>
                          </template>
                          <li>{{ product.title }}</li>
                        </ul>
                      </div>
                      <h3>{{ product.title }}</h3>
                      <p class="category">
                        Category :
                        <span v-if="product.category">{{
                          product.category.name
                        }}</span>

                        <span
                          :class="[
                            'float-end',
                            product.stock == 'in_stock'
                              ? 'stock '
                              : 'out-stock',
                          ]"
                        >
                          {{
                            product.stock == "in_stock"
                              ? "In Stock"
                              : "Out Of Stock"
                          }}
                        </span>
                      </p>

                      <Rate
                        v-if="product.avgReview"
                        v-model="product.avgReview.averageRating"
                        disabled
                      />
                      <Rate v-else disabled />

                      <p class="desc text-limit">
                        {{ product.description }}
                      </p>
                      <!-- <a @click.prevent.stop="addToWishlist" class="wish-list">
												<i class="bx bx-heart"></i> Add to Wishlist
											</a> -->
                      <a v-if="product.wishlist" class="added-wish-list">
                        <i class="bx bx-heart"></i> Added
                      </a>
                      <a
                        v-else
                        @click.prevent.stop="addToWishlist"
                        class="wish-list"
                      >
                        <i class="bx bx-heart"></i> Add to Wishlist
                      </a>
                      <!-- <div class="colors-settings">
												<h4>COLOR :</h4>
												<div class="color-select">
													<form action="#">
														<input type="radio" id="test1" name="radio-group" />
														<label for="test1">Red</label>

														<input
															type="radio"
															id="test2"
															name="radio-group"
															checked
														/>
														<label for="test2">Green</label>

														<input type="radio" id="test3" name="radio-group" />
														<label for="test3">Tomato</label>
													</form>
												</div>
											</div> -->

                      <div class="prices d-flex">
                        <template
                          v-if="
                            product.offer_price > 0 &&
                            product.main_price > product.offer_price
                          "
                        >
                          <p>$ {{ product.offer_price }}</p>
                          <del>$ {{ product.main_price }}</del>
                        </template>
                        <template v-else>
                          <p>$ {{ product.main_price }}</p>
                        </template>
                      </div>
                      <div class="quantity-settings">
                        <h4>Quantity :</h4>
                        <div class="quantity-select">
                          <form action="#">
                            <input
                              class="form-control"
                              type="number"
                              id="quantity"
                              placeholder="5"
                              v-model="quantity"
                              min="1"
                              max="5"
                            />
                          </form>
                        </div>
                      </div>
                      <button type="submit" class="box-btn">
                        Add to Cart <i class="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loader_center">
      <Loader width="30px"></Loader>
    </div>
  </Modal>
</template>

<script>
import Loader from "~/components/CircleLoader";
export default {
  props: ["showModal", "product"],

  components: { Loader },

  data() {
    return {
      imageIndex: 0,
      quantity: 1,
    };
  },
  computed: {
    showingModal() {
      return this.showModal ? true : false;
    },
    images() {
      let array = [];
      array.push({ url: this.product.primary_image });
      if (this.product.image && this.product.images.length > 0) {
        array = [...array, this.product.images];
      }
      return array;
    },
  },

  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },

    async addToCart() {
      this.loading = true;
      const res = await this.callApi("post", "/api/cart/add/new", {
        product_id: this.product.id,
        quantity: this.quantity,
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