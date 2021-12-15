<template>
  <div>
    <section class="home-product-area ptb-70 desktop-view">
      <div class="container">
        <div class="row">
          <div class="col-lg-11">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li
                @click="changeTab('new')"
                class="nav-item"
                role="presentation"
              >
                <button :class="['nav-link', tab == 'new' ? 'active' : '']">
                  New Arrivals
                </button>
              </li>
              <li
                @click="changeTab('top-selling')"
                class="nav-item"
                role="presentation"
              >
                <button
                  :class="['nav-link', tab == 'top-selling' ? 'active' : '']"
                >
                  Top Selling
                </button>
              </li>
              <li
                @click="changeTab('most-rated')"
                class="nav-item"
                role="presentation"
              >
                <button
                  :class="['nav-link', tab == 'most-rated' ? 'active' : '']"
                >
                  Most Rated
                </button>
              </li>
            </ul>
          </div>
          <!-- <div class="col-lg-1">
          <a href="#" class="see-more">See More</a>
        </div> -->
        </div>
        <div class="tab-content" id="myTabContent">
          <div v-if="loading" class="loader_center">
            <Loader width="30px"></Loader>
          </div>

          <div
            v-else-if="products.length > 0"
            class="tab-pane fade show active"
          >
            <div class="row">
              <div class="col-lg-12">
                <!-- <div class="carousel slide">
                <div class="carousel-inside">
                  <div class="carousel-item active"> -->
                <div class="row">
                  <hooper :settings="hooperSettings">
                    <slide v-for="(item, index) in products" :key="tab + index">
                      <div class="single-popular">
                        <ProductCard :product="item" />
                      </div>
                    </slide>
                    <hooper-navigation slot="hooper-addons"></hooper-navigation>
                  </hooper>
                </div>
                <!-- </div>
                </div>
              </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shape1">
        <img src="/images/shape.png " alt="shape" />
      </div>
      <div class="shape2">
        <img src="/images/shape.png " alt="shape" />
      </div>
    </section>

    <section class="home-product-area ptb-70 mobile-view">
      <div class="container">
        <div class="row">
          <Tabs
            v-model="tab"
            @on-click="changeTab"
            :animated="false"
            value="name1"
          >
            <TabPane label="New Arrivais" name="new">
              <div class="row">
                <div
                  v-for="(item, index) in products"
                  :key="index"
                  class="col-6 mb-3"
                >
                  <div class="single-product">
                    <ResponsiveProduct :product="item" />
                  </div>
                </div>
              </div>
            </TabPane>

            <TabPane label="Top Selling" name="top-selling">
              <div class="row">
                <div
                  v-for="(item, index) in products"
                  :key="index"
                  class="col-6 mb-3"
                >
                  <div class="single-product">
                    <ResponsiveProduct :product="item" />
                  </div>
                </div>
              </div>
            </TabPane>

            <TabPane label="Most Rated" name="most-rated">
              <div class="row">
                <div
                  v-for="(item, index) in products"
                  :key="index"
                  class="col-6 mb-3"
                >
                  <div class="single-product">
                    <ResponsiveProduct :product="item" />
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
          <!-- <a href="#" class="see-more">See More</a> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "~/components/CircleLoader";
import ProductCard from "~/components/Card/ProductOne";
import ResponsiveProduct from "~/components/Card/ResponsiveProduct";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  components: {
    ProductCard,
    ResponsiveProduct,
    Loader,
    Hooper,
    Slide,
    HooperNavigation,
  },

  props: ["hooperSettings"],

  data() {
    return {
      products: [],
      loading: false,
      tab: "",
    };
  },

  methods: {
    async changeTab(tab) {
      this.tab = tab;
      this.loading = true;
      const res = await this.callApi("get", `/api/home/get/product/${tab}`);
      if (res.status == 200) {
        this.products = res.data;
      }
      this.loading = false;
    },
  },

  mounted() {
    this.changeTab("new");
  },
};
</script>