<template>
  <div>
    <BreadCrumbs :routes="routes" :active_route="'Search'" />

    <!-- Shop Area -->
    <section class="shop-area">
      <div class="container">
        <div class="row" style="background: #fbfbfb">
          <!-- Sidebar -->
          <div class="col-lg-3 ptb-70">
            <div class="accordion" id="accordionPanelsStayOpenExample">
              <!-- Side Accordion Filter  -->
              <h2 class="filter mt-33">Filter</h2>

              <FilterOptions
                :filterUrl="`/api/search/product/advance`"
                @filterLoading="handleChangeFilterLoading"
                @changeFilterResult="handleChangeFilterResult"
              />

              <!-- Side Accordion Filter Ends  -->
            </div>
          </div>
          <!-- Sidebar end -->

          <div class="col-lg-9 shop ptb-70">
            <div class="row align-items-center">
              <div class="col-lg-9">
                <div class="shop-head">
                  <h3>Search Proudct</h3>
                  <div class="border-line"></div>
                </div>
              </div>
              <div class="col-lg-3">
                <Select id="sort">
                  <Option
                    v-for="item in sortList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </div>
            </div>

            <div class="row desktop-view">
              <!-- card -->
              <div v-if="loading" class="loader_center">
                <Loader width="30px"></Loader>
              </div>

              <template v-else>
                <template v-if="!loading && resultData.total == 0">
                  <NotFound :title="'No product found'" :width="80" />
                </template>

                <template v-else>
                  <div
                    v-for="(item, index) in resultData.data"
                    :key="'res' + index"
                    class="col-lg-4"
                  >
                    <div class="single-shop">
                      <ProductCard :product="item" />
                    </div>
                  </div>
                </template>
              </template>
              <!-- cards -->
            </div>

            <div class="mobile-view">
              <div class="row">
                <div v-if="loading" class="loader_center">
                  <Loader width="30px"></Loader>
                </div>

                <template v-else>
                  <template v-if="!loading && resultData.total == 0">
                    <NotFound :title="'No product found'" :width="80" />
                  </template>

                  <template v-else>
                    <div
                      v-for="(item, index) in resultData.data"
                      :key="'res' + index"
                      class="col-6"
                    >
                      <div class="single-product">
                        <ResponsiveProduct :product="item" />
                      </div>
                    </div>
                  </template>
                </template>
                <!-- <a href="#" class="see-more">See More</a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Shop Area -->
  </div>
</template>

<script>
import ProductCard from "~/components/Card/ProductOne";
import ProductSmallCard from "~/components/Card/ProductSmall";
import ResponsiveProduct from "~/components/Card/ResponsiveProduct";
import BreadCrumbs from "~/components/BreadCrumbs";
import FilterOptions from "~/components/Card/Filter";
import Loader from "~/components/CircleLoader";
import NotFound from "~/components/NotFound";
export default {
  components: {
    ProductCard,
    ProductSmallCard,
    ResponsiveProduct,
    BreadCrumbs,
    FilterOptions,
    NotFound,
    Loader,
  },

  data() {
    return {
      routes: [
        {
          name: "Home",
          link: "/",
        },
      ],

      product: {
        slug: "test",
      },

      sortList: [
        {
          label: "Best Match",
          value: "best_match",
        },
        {
          label: "Price Low to hight",
          value: "price_low_to_high",
        },
        {
          label: "Price High to low",
          value: "price_high_to_low",
        },
      ],
    };
  },

  methods: {
    handleChangeFilterLoading(data) {
      this.loading = data;
    },

    handleChangeFilterResult(data) {
      this.loading = false;
      this.resultData = data;
    },

    async sortProduct() {
      this.loading = true;

      const res = await this.callApi(
        "get",
        `/api/search/product/advance?
		brand_ids=${this.brand_ids}&category_ids=${this.category_ids}&priceFrom=${this.priceFrom}&priceTo=${this.priceTo}&sort_type=${this.sort}`
      );

      if (res.status == 200) {
        this.resultData = res.data;
        this.$router.push(
          `?brand_ids=${this.brand_ids}&category_ids=${this.category_ids}&priceFrom=${this.priceFrom}&priceTo=${this.priceTo}&sort_type=${this.sort}`
        );
      }

      this.loading = false;
    },
  },

  async asyncData({ app, query }) {
    let query_word = query.query_word ? query.query_word : "";
    let brand_ids = query.brand_ids ? query.brand_ids : [];
    let category_ids = query.category_ids ? query.category_ids : [];
    let priceFrom = query.priceFrom ? query.priceFrom : "";
    let priceTo = query.priceTo ? query.priceTo : "";
    let sort = query.sort ? query.sort : "best_match";

    let url = `/api/search/product/advance?query=${query_word}&
		brand_ids=${brand_ids}&category_ids=${category_ids}&priceFrom=${priceFrom}&priceTo=${priceTo}&sort_type=${sort}`;

    try {
      const { data } = await app.$axios.get(url);

      return {
        resultData: data,
        brand_ids,
        category_ids,
        priceFrom,
        priceTo,
        sort,
      };
    } catch (error) {
      return {
        error: true,
      };
    }
  },
};
</script>