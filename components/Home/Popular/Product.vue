<template>
  <section class="popular-area ptb-70 desktop-view">
    <div v-if="popularProducts.length > 0" class="container">
      <div class="section-title">
        <div class="row">
          <div class="col-11">
            <h2>Most Popular</h2>
          </div>
          <!-- <div class="col-1">
            <a href="#" class="see-more">See More</a>
          </div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div
            id="popularCarousel"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inside">
              <div class="carousel-item active">
                <div class="row">
                  <hooper :settings="hooperSettings">
                    <slide
                      v-for="(item, index) in get"
                      :key="'popular' + index"
                    >
                      <div class="single-popular">
                        <!-- <ProductCard :product="item" /> -->
                      </div>
                    </slide>
                    <hooper-navigation slot="hooper-addons">
                    </hooper-navigation>
                  </hooper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from "~/components/Card/ProductOne";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: { Hooper, Slide, HooperNavigation, ProductCard },

  props: ["popularProducts", "hooperSettings"],

  computed: {
    get() {
      return this.popularProducts;
    },
  },
};
</script>