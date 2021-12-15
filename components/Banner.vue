<template>
  <!-- Banner Area -->
  <section v-if="slides.length > 0" class="banner-area">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="">
          <!-- <hooper :settings="hooperSettings">
            <slide v-for="(item, index) in slides" :key="'slides' + index">
              <div>
                <img
                  v-if="backOfficeURL"
                  class="d-block w-100"
                  :src="backOfficeURL + item.image_url"
                  alt="banner"
                />
                <nuxt-link to="/shop" class="banner box-btn">
                  Shop Now
                </nuxt-link>
              </div>
            </slide>
            <hooper-pagination slot="hooper-addons"></hooper-pagination>
          </hooper> -->

          <Flicking v-bind="settings">
            <div
              v-for="(item, index) in slides"
              :key="'slides' + index"
              style="width: 100%;"
            >
              <img
                v-if="backOfficeURL"
                class="d-block w-100"
                :src="backOfficeURL + item.image_url"
                alt="banner"
              />
              <nuxt-link to="/shop" class="banner box-btn">
                Shop Now
              </nuxt-link>
            </div>
            <div
              slot="viewport"
              class="flicking-pagination color-primary"
            ></div>
          </Flicking>
        </div>

        <!--  -->
      </div>
    </div>
  </section>
  <!-- End Banner Area -->
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
import "hooper/dist/hooper.css";

import { Flicking } from "@egjs/vue-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import { Fade } from "@egjs/flicking-plugins";
import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";

const plugins = [
  // new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
  new Fade(),
  new Pagination({ type: "scroll" }),
];

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination,

    Flicking,
  },

  props: ["slides"],

  data() {
    return {
      hooperSettings: {
        infiniteScroll: false,
        centerMode: false,
        autoPlay: false,
        wheelControl: false,
        playSpeed: 3500,
      },

      settings: {
        hideBeforeInit: true,
        circular: true,
        plugins,
        resizeOnContentsReady: true
      },
    };
  },
};
</script>

<style >
@import url("node_modules/@egjs/vue-flicking/dist/flicking.css");
@import url("node_modules/@egjs/vue-flicking/dist/flicking-inline.css");
</style>