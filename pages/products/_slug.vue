<template>
  <div>
    <LightBox
      v-if="selectedImageIndex > -1"
      :imageArray="imageArray"
      :imgIndex="selectedImageIndex"
      @closeBox="selectedImageIndex = -1"
    />

    <!-- Product Details Area -->
    <section class="shop-details-area ptb-70">
      <div class="container">
        <div class="single-details">
          <div class="row">
            <div class="col-lg-5">
              <div class="d-flex flex-column justify-content-center">
                <div class="main_image">
                  <image-magnifier
                    :src="backOfficeURL + imageArray[imgIndex]"
                    :zoom-src="backOfficeURL + imageArray[imgIndex]"
                    width="500"
                    height="500"
                    zoom-width="500"
                    zoom-height="500"
                  >
                  </image-magnifier>
                </div>
                <div class="thumbnail-images">
                  <ul id="thumbnail">
                    <li v-for="(item, imgIndex) in imageArray" :key="imgIndex">
                      <a @click.stop.prevent="selectIndex(imgIndex)">
                        <img :src="backOfficeURL + item" width="70" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="shape">
                <img src="/images/shape.png" alt="shape" />
              </div>
            </div>
            <div class="col-lg-7">
              <div class="details-content">
                <div class="page-title-content">
                  <ul>
                    <li class="p-0">
                      <nuxt-link to="/"> Home </nuxt-link>
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
                    <li class="p-0">/</li>
                    <li>{{ product.title }}</li>
                  </ul>
                </div>

                <h3>{{ product.title }}</h3>
                <p class="category">Category : <span>Cars</span></p>

                <Rate
                  v-if="product.avgReview"
                  v-model="product.avgReview.averageRating"
                  disabled
                />
                <Rate v-else disabled />

                <h5 :class="stock_status ? 'stock' : 'out-stock'">
                  {{ stock_status ? "In Stock" : "Out Of Stock" }}
                </h5>
                <p class="desc mt-2">
                  {{ product.description }}
                </p>

                <a v-if="product.wishlist" class="added-wish-list">
                  <i class="bx bx-heart"></i> Wishlist added
                </a>
                <a v-else @click.prevent.stop="addToWishlist" class="wish-list">
                  <i class="bx bx-heart"></i> Add to Wishlist
                </a>

                <div
                  v-for="(item, key, aindex) in product.options"
                  :key="'opt' + aindex"
                  class="colors-settings"
                >
                  <h4>{{ key }}:</h4>
                  <div class="color-select">
                    <RadioGroup
                      v-model="options[aindex]"
                      @on-change="changeOptions(key)"
                      vertical
                    >
                      <Radio
                        v-for="(item2, bindex) in item"
                        :key="'radio' + bindex"
                        :label="item2.value"
                        >{{ item2.value }}
                      </Radio>
                    </RadioGroup>
                  </div>
                </div>

                <div class="prices d-flex">
                  <template
                    v-if="
                      product.offer_price > 0 &&
                      product.main_price > product.offer_price
                    "
                  >
                    <p>$ {{ product.offer_price * quantity }}</p>
                    <del>$ {{ product.main_price * quantity }}</del>
                  </template>
                  <template v-else>
                    <p>$ {{ product.main_price }}</p>
                  </template>
                </div>

                <div class="quantity-settings">
                  <h4>Quantity :</h4>
                  <div class="quantity-select">
                    <input
                      oninput="validity.valid||(value='');"
                      class="form-control"
                      type="number"
                      id="quantity"
                      placeholder="quantity"
                      v-model="quantity"
                      min="1"
                      max="1000"
                    />
                  </div>
                </div>

                <button
                  :disabled="!stock_status"
                  @click="addToCart"
                  class="box-btn"
                >
                  Add to Cart <i class="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Description, Specifications, Reviews -->
        <div class="details-tab-area pt-70">
          <ul class="nav nav-tabs details-tab" role="tablist">
            <!-- Tabs -->
            <li class="nav-item" role="presentation">
              <button
                @click="changeTab('description')"
                :class="['nav-link', tab == 'description' ? 'active' : '']"
                id="description-tab"
                data-bs-toggle="tab"
                data-bs-target="#description"
                type="button"
                role="tab"
                aria-controls="description"
                aria-selected="false"
              >
                Description
              </button>
            </li>

            <li class="nav-item" role="presentation">
              <button
                @click="changeTab('specifications')"
                :class="['nav-link', tab == 'specifications' ? 'active' : '']"
                id="specifications-tab"
                data-bs-toggle="tab"
                data-bs-target="#specifications"
                type="button"
                role="tab"
                aria-controls="specifications"
                aria-selected="false"
              >
                Specifications
              </button>
            </li>

            <li class="nav-item" role="presentation">
              <button
                @click="changeTab('reviews')"
                :class="['nav-link', tab == 'reviews' ? 'active' : '']"
                id="reviews-tab"
                data-bs-toggle="tab"
                data-bs-target="#reviews"
                type="button"
                role="tab"
                aria-controls="reviews"
                aria-selected="true"
              >
                Reviews
              </button>
            </li>
            <!-- Tabs Ends -->
          </ul>

          <!-- Contents -->
          <div class="tab-content" id="myTabContent">
            <!-- Description -->
            <div
              v-if="tab == 'description'"
              class="tab-pane fade show active"
              id="description"
              role="tabpanel"
              aria-labelledby="description-tab"
            >
              <h6 class="mb-3">Product Description:</h6>
              <p>
                {{ product.description }}
              </p>
            </div>
            <!-- Description End -->

            <!-- Specifications	 -->
            <div
              v-if="tab == 'specifications'"
              class="tab-pane fade show active"
              id="specifications"
              role="tabpanel"
              aria-labelledby="specifications-tab"
            >
              <h6 class="mb-4">Detailed Specifications</h6>
              <div
                v-for="(item, index) in product.attributes"
                :key="index"
                class="row"
              >
                <div class="col-2">
                  <p>{{ item.key }} :</p>
                </div>
                <div class="col-10">
                  <p>{{ item.value }}</p>
                </div>
              </div>
            </div>
            <!-- Specifications	End -->

            <!-- Reviews -->
            <div
              v-if="tab == 'reviews'"
              class="tab-pane fade show active"
              id="reviews"
              role="tabpanel"
              aria-labelledby="reviews-tab"
            >
              <h6 class="mb-3">Product Reviews:</h6>
              <template v-if="product.reviews.length == 0">
                <NotFound :title="'No review found'" :width="45" />
              </template>
              <template v-else v-for="item in product.reviews">
                <ReviewCard :review="item" :key="item.id" />
              </template>
            </div>
            <!-- Reviews End -->
          </div>
          <!-- Contents Ends -->
        </div>
        <!-- Description, Specifications, Reviews Ends -->
      </div>
    </section>

    <section v-if="relatedProducts.length > 0" class="related-product pb-70">
      <div class="container">
        <div class="section-title">
          <div class="row">
            <div class="col-11">
              <h2>Related products</h2>
            </div>
            <!-- <div class="col-1">
							<a href="#">See More</a>
						</div> -->
          </div>
        </div>
        <div class="row">
          <div
            v-for="(item, index) in relatedProducts"
            :key="index"
            class="col-lg-3 col-md-6"
          >
            <div class="single-related">
              <ProductCard :product="item" :key="index" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Details Area Ends -->

    <LoaderOverlay v-if="loading" />
  </div>
</template>

<script>
import ProductCard from "~/components/Card/ProductOne";
import ReviewCard from "~/components/Card/Review";
import LightBox from "~/components/Card/Product/LightBox";
import LoaderOverlay from "~/components/Loader/CircleOverlay";
import NotFound from "~/components/NotFound";
import { ImageMagnifier } from "vue-image-magnifier";
import { mapGetters } from "vuex";
export default {
  components: {
    ProductCard,
    ReviewCard,
    LoaderOverlay,
    ImageMagnifier,
    LightBox,
    NotFound,
  },

  data() {
    return {
      tab: "description",
      imageArray: [],
      imgIndex: -1,
      selectedImageIndex: -1,
      options: [],
      variations: {},
      combinations: "",
      quantity: 1,
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      carts: "getCarts",
    }),

    stock_status() {
      if (this.product.options.length == 0) {
        if (this.product.stock == "out_of_stock") {
          return false;
        }
        return true;
      }

      for (let i of this.product.combinations) {
        if (this.combinations == i.name && i.stock == "in_stock") return true;
        return false;
      }
    },
  },

  methods: {
    changeOptions() {
      this.combinations = "";
      for (let i of this.options) {
        if (this.combinations) this.combinations += "-";

        if (i) {
          this.combinations += i;
        }
      }
    },

    changeTab(tab) {
      this.tab = tab;
      this.$router.push(`?tab=${tab}`);
    },

    closeModal(value) {
      this.showCartModal = value;
    },

    selectIndex(index) {
      this.$set(this, "selectedImageIndex", index);
    },

    checkStock() {
      let item = this.product.combinations.filter(
        (el) => el.name == this.combinations
      );
      if (item.length > 0 && item[0].stock == "in_stock") return true;
      return false;
    },

    async addToCart() {
      if (!this.authUser) {
        this.i("Please login first");
        this.$router.push("/auth/login");
        return;
      }
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
      this.$router.go();
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

  created() {
    if (
      this.$route.query.tab != "description" &&
      this.$route.query.tab != "specifications" &&
      this.$route.query.tab != "reviews"
    )
      this.tab = "description";
    else
      this.tab = this.$route.query.tab ? this.$route.query.tab : "description";

    this.$router.push(`?tab=${this.tab}`);

    this.imageArray.push(this.product.primary_image);
    // if (this.product.images.length > 0) {
    // 	for (let i of this.product.images) {
    // 		this.imageArray.push(i.url);
    // 	}
    // }
    this.imgIndex = 0;
  },

  async asyncData({ app, params }) {
    const url = `/api/product/single/${params.slug}`;
    const relatedProductUrl = `/api/product/related/${params.slug}`;

    try {
      const [product, relatedProducts] = await Promise.all([
        app.$axios.get(url),
        app.$axios.get(relatedProductUrl),
      ]);
      return {
        product: product.data,
        relatedProducts: relatedProducts.data,
      };
    } catch (error) {
      return {
        error: true,
      };
    }
  },

  watch: {
    options: (oldVal, newVal) => {
      // this.combinations = this.options;
    },
  },
};
</script>