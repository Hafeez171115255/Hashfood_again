<template>
  <section class="popular-area ptb-70 mobile-view">
    <div v-if="popularProducts.length > 0" class="container">
      <div class="section-title-mobile">
        <div class="row align-items-center">
          <div class="col-5">
            <h3>Most Popular</h3>
          </div>
          <div class="col-7">
            <div class="border-line"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          v-for="(item, index) in get"
          :key="'popular' + index"
          class="col-6 mb-2"
        >
          <div class="single-product">
            <ResponsiveProduct :product="item" />
          </div>
        </div>
        <!-- <a href="#" class="see-more">See More</a> -->
      </div>
    </div>
  </section>
</template>

<script>
import ResponsiveProduct from "~/components/Card/ResponsiveProduct";
export default {
  components: { ResponsiveProduct },
  props: ["popularProducts", "hooperSettings"],

  computed:{
    get(){
      return this.popularProducts
    }
  }
};
</script>