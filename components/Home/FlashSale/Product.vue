<template>
  <section class="flash-sale-area desktop-view">
    <div class="container">
      <div class="section-title">
        <div class="row align-items-center">
          <div class="col-11">
            <hr />
          </div>
          <div class="col-1">
            <nuxt-link to="/flashsale" class="see-more" href="#"
              >See More</nuxt-link
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div
          v-for="(item, index) in flashSaleProducts"
          :key="'flash' + index"
          class="col-lg-3"
        >
          <FlashSaleCard :product="item.productDetails" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import FlashSaleCard from "~/components/Card/Product/FlashSale";
export default {
  components: { FlashSaleCard },

  props: ["flashSaleProducts"],
};
</script>