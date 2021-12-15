<template>
  <div>
    <BreadCrumbs :routes="routes" :active_route="'Cart'" />

    <!-- cart area -->
    <section class="shopping-cart-wrap checkout-cart-area pt-70">
      <div class="container">
        <div class="steps-wrap">
          <div class="container">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <button
                  @click="changeTab({ tab: 'cart' })"
                  :class="['nav-link', tab == 'cart' ? 'active' : '']"
                  type="button"
                  role="tab"
                >
                  Shopping Cart <span>01</span>
                </button>
              </li>

              <li class="nav-item">
                <button
                  :class="['nav-link', tab == 'checkout' ? 'active' : '']"
                  type="button"
                  role="tab"
                >
                  Checkout <span>02</span>
                </button>
              </li>

              <li class="nav-item">
                <button
                  :class="['nav-link', tab == 'complete' ? 'active' : '']"
                  type="button"
                  role="tab"
                >
                  Complete Order <span>03</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="shopping-cart-area ptb-70">
          <template v-if="tab == 'cart'">
            <Cart @changeTab="changeTab" :loading="loading" />
          </template>

          <template v-if="tab == 'checkout'">
            <Checkout @changeTab="changeTab" :loading="loading" />
          </template>

          <template v-if="tab == 'complete'">
            <Complete />
          </template>
        </div>

        <!---->
      </div>
    </section>
    <!--end of cart area  -->

    <LoaderOverlay v-if="loading" />
  </div>
</template>

<script>
import Cart from "~/components/Checkout/Cart";
import Checkout from "~/components/Checkout";
import Complete from "~/components/Checkout/Complete";
import BreadCrumbs from "~/components/BreadCrumbs";
import LoaderOverlay from "~/components/Loader/CircleOverlay";
import { mapGetters } from "vuex";
export default {
  components: {
    Cart,
    Checkout,
    Complete,
    BreadCrumbs,
    LoaderOverlay,
  },
  data() {
    return {
      routes: [
        {
          name: "Home",
          link: "/",
        },
      ],
      tab: "cart",
      loading: true,
      orders: {},
    };
  },

  computed: {
    ...mapGetters({
      carts: "getCarts",
    }),
  },
  methods: {
    changeTab(data) {
      this.tab = data.tab;
      if (data.order_id && data.tab == "complete")
        return this.$router.push(`?tab=${data.tab}&order_id=${data.order_id}`);
      this.$router.push(`?tab=${data.tab}`);
    },
  },

  async created() {
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab;
    }

    this.loading = true;
    const res = await this.callApi("get", "/api/cart/get/all");
    if (res.status == 200) {
      this.$store.commit("setCarts", res.data);
    } else {
      this.swr();
    }
    this.loading = false;
  },
};
</script>