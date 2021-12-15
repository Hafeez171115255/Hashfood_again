<template>
  <div>
    <!-- Navbar Area -->
    <div class="desktop-navbar">
      <div class="upper-nav" id="navbar_top">
        <nav class="navbar navbar-expand-lg">
          <div class="container">
            <nuxt-link class="navbar-brand header-logo" to="/">
            <h3 class="logo">Hash <span>Food</span></h3>
             
            </nuxt-link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#top_nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="top_nav">
              <ul class="navbar-nav ms-5">
                <li class="nav-item">
                  <nuxt-link
                    :class="['nav-link', $route.path == '/' ? 'active' : '']"
                    to="/"
                  >
                    HOME
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    :class="[
                      'nav-link',
                      $route.path == '/shop' ? 'active' : '',
                    ]"
                    to="/shop"
                  >
                    SHOP
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    :class="[
                      'nav-link',
                      $route.path == '/about' ? 'active' : '',
                    ]"
                    to="/about"
                  >
                    ABOUT
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    :class="[
                      'nav-link',
                      $route.path == '/contact' ? 'active' : '',
                    ]"
                    to="/contact"
                  >
                    CONTACT
                  </nuxt-link>
                </li>
              </ul>
              <ul class="navbar-nav ms-auto">
            <div>
              <ul class="navbar-nav ms-auto nav-cart">
                <li class="nav-item">
                  <nuxt-link class="nav-link" to="/profile">
                    <i class="bx bx-user"></i>
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link class="nav-link" to="/profile?tab=wishlist">
                    <i class="bx bx-heart"></i>
                    <span v-if="wishlistLength > 0">{{ wishlistLength }}</span>
                  </nuxt-link>
                </li>

                <li class="nav-item cart">
                  <a
                    @click.stop.prevent="showCart = !showCart"
                    class="nav-link"
                  >
                    <i class="bx bx-cart-alt"></i>
                    <span v-if="cartLength > 0">{{ cartLength }}</span>
                  </a>
                  <div :class="['shopping-cart', showCart ? 'visible' : '']">
                    <CartSmall v-if="showCart" />
                  </div>
                </li>

                <li v-if="authUser" class="nav-item">
                  <a class="nav-link" @click="logout">
                    <i class="bx bx-log-out"></i>
                  </a>
                </li>
                <li v-else class="nav-item">
                  <nuxt-link class="nav-link" to="/auth/login">
                    <i class="bx bx-log-in"></i>
                  </nuxt-link>
                </li>
              </ul>
              </div>
                <li class="nav-item" style="padding: 3px 1rem">
                  <a class="nav-link call" href="tel:+8801245215464">
                   Signup</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div class="navbar-area">
        <nav class="navbar navbar-expand-lg">
          <div class="container">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#main_nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main_nav">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link category"
                    v-on:click.stop="showCategoryDropdown"
                    data-bs-toggle="dropdown"
                  >
                    <i class="bx bx-menu-alt-left"></i> Shop By Category
                  </a>
                  <ul
                    :class="[
                      'dropdown-menu',
                      isShowCategoryDropdown ? 'show' : '',
                    ]"
                  >
                    <li v-for="(item, index) in categories" :key="'ca' + index">
                      <nuxt-link
                        class="dropdown-item"
                        :to="`/categories/single/${item.id}`"
                      >
                        <i class="bx bx-category"></i> {{ item.name }}
                        <span v-if="item.sub_category.length > 0"
                          ><i class="bx bxs-chevron-right"></i>
                        </span>
                      </nuxt-link>
                      <ul
                        v-if="item.sub_category.length > 0"
                        class="submenu dropdown-menu"
                      >
                        <li
                          v-for="(sitem, index) in item.sub_category"
                          :key="'subCat' + index"
                        >
                          <nuxt-link
                            class="dropdown-item"
                            :to="`/categories/sub-categories/${sitem.id}`"
                          >
                            <i class="bx bx-category"></i>
                            {{ sitem.name }}
                          </nuxt-link>
                        </li>

                        <!-- <li>
												<a class="dropdown-item" href="#"
													>Submenu item 3
													<span><i class="bx bxs-chevron-right"></i></span>
												</a>
												<ul class="submenu dropdown-menu">
													<li>
														<a class="dropdown-item" href="#">Multi level 1</a>
													</li>
													<li>
														<a class="dropdown-item" href="#">Multi level 2</a>
													</li>
												</ul>
											</li> -->
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>

              <!-- Search  -->
              <ul class="navbar-nav m-auto search-nav">
                <!-- Search Input -->
                <form v-on:submit.prevent>
                  <div class="rounded rounded-pill shadow-sm">
                    <div class="input-group">
                      <input
                        v-model="query_word"
                        type="search"
                        v-debounce:300ms="searchResult"
                        @keyup.enter="goToSearchPage"
                        placeholder="Start typing...."
                        class="form-control"
                      />
                      <div class="input-group-append">
                        <a @click="goToSearchPage" class="search-btn">
                          <i class="bx bx-search"></i>Search
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
                <!-- Seach Input Ends  -->

                <!-- search result box -->
                <div
                  @focusout="showSearch = false"
                  :class="['search-item-area', showSearch ? 'show' : '']"
                  id="search-item-area"
                >
                  <div v-if="loading == 'search'" class="loader_center">
                    <Loader width="30px"></Loader>
                  </div>

                  <ul v-else class="search-item">
                    <template v-if="!loading && searchData.length == 0">
                      <NotFound :title="'No product found'" :width="60" />
                    </template>
                    <li
                      v-else
                      v-for="(item, searchIndex) in searchData"
                      :key="'sss' + searchIndex"
                      class="clearfix"
                    >
                      <nuxt-link :to="`/products/${item.slug}`">
                        <img
                          v-if="item.primary_image"
                          :src="backOfficeURL + item.primary_image"
                          :alt="item.title"
                        />
                        <span class="item-name">{{ item.title }}</span>
                        <span v-if="item.category" class="item-cart">
                          {{ item.category.name }}
                        </span>
                        <Price :obj="item" />
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
                <!-- search result box end -->
              </ul>
              <!-- Search Ends -->
<!-- <div>
              <ul class="navbar-nav ms-auto nav-cart">
                <li class="nav-item">
                  <nuxt-link class="nav-link" to="/profile">
                    <i class="bx bx-user"></i>
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link class="nav-link" to="/profile?tab=wishlist">
                    <i class="bx bx-heart"></i>
                    <span v-if="wishlistLength > 0">{{ wishlistLength }}</span>
                  </nuxt-link>
                </li>

                <li class="nav-item cart">
                  <a
                    @click.stop.prevent="showCart = !showCart"
                    class="nav-link"
                  >
                    <i class="bx bx-cart-alt"></i>
                    <span v-if="cartLength > 0">{{ cartLength }}</span>
                  </a>
                  <div :class="['shopping-cart', showCart ? 'visible' : '']">
                    <CartSmall v-if="showCart" />
                  </div>
                </li>

                <li v-if="authUser" class="nav-item">
                  <a class="nav-link" @click="logout">
                    <i class="bx bx-log-out"></i>
                  </a>
                </li>
                <li v-else class="nav-item">
                  <nuxt-link class="nav-link" to="/auth/login">
                    <i class="bx bx-log-in"></i>
                  </nuxt-link>
                </li>
              </ul>
              </div> -->
            </div>
          </div>
        </nav>
      </div>
    </div>
    <!-- End Navbar Area -->

    <!-- Mobile Navbar Area -->
    <div class="mobile-navbar mobile-view">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-8">
            <nuxt-link class="navbar-brand mobile-logo" to="/">
              <img src="/images/logo.png" alt="logo" />
            </nuxt-link>
          </div>

          <div class="col-2 text-center">
            <a
              v-if="!showMobileSearch"
              class="search-bar"
              @click.stop.prevent="showMobileSearch = true"
            >
              <i class="bx bx-search"></i>
            </a>
          </div>

          <div class="col-2">
            <a class="menu" href="#" @click="sidebar = true">
              <i class="bx bx-menu-alt-right"></i>
            </a>

            <Drawer :closable="false" v-model="sidebar" width="300">
              <ul>
                <li>
                  <a class="nav-link call" href="tel:+8801245215464">
                    <i class="bx bxs-phone-call"> </i> +88 01245 215464</a
                  >
                </li>
                <li>
                  <a
                    class="nav-link email"
                    href="mailto:businessemail@business.com"
                    ><i class="bx bxs-envelope"></i>
                    businessemail@business.com</a
                  >
                </li>
              </ul>

              <ul class="ms-auto nav-cart">
                <li>
                  <nuxt-link to="/profile">
                    <i class="bx bx-user"></i>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/profile?tab=wishlist">
                    <i class="bx bx-heart"></i>
                    <span>{{ wishlistLength }}</span>
                  </nuxt-link>
                </li>
              </ul>

              <hr class="hr-top" />

              <ul class="main-mobile-nav ms-5">
                <li class="nav-item">
                  <nuxt-link
                    :class="['nav-link', $route.path == '/' ? 'active' : '']"
                    to="/"
                  >
                    HOME
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    :class="[
                      'nav-link',
                      $route.path == '/shop' ? 'active' : '',
                    ]"
                    to="/shop"
                  >
                    SHOP
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    :class="[
                      'nav-link',
                      $route.path == '/about' ? 'active' : '',
                    ]"
                    to="/about"
                  >
                    ABOUT
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    :class="[
                      'nav-link',
                      $route.path == '/contact' ? 'active' : '',
                    ]"
                    to="/contact"
                  >
                    CONTACT
                  </nuxt-link>
                </li>
              </ul>
            </Drawer>
          </div>

          <!-- Mobile Search  -->
          <ul v-if="showMobileSearch" class="navbar-nav m-auto search-nav">
            <!-- Mobile Search Input -->
            <form v-on:submit.prevent>
              <div class="input-group">
                <input
                  v-model="query_word"
                  type="search"
                  v-debounce:300ms="searchResult"
                  @keyup.enter="goToSearchPage"
                  placeholder="Start typing...."
                  class="form-control"
                  @focusout="showSearch = false"
                />

                <div class="input-group-append">
                  <a class="search-btn" @click.stop.prevent="closeMobileSearch">
                    <Icon type="ios-close-circle" />
                  </a>
                </div>
              </div>
            </form>
            <!-- Mobile Seach Input Ends  -->

            <!-- Mobile search result box -->
            <div
              :class="['search-item-area', showSearch ? 'show' : '']"
              id="search-item-area"
            >
              <div v-if="loading == 'search'" class="loader_center">
                <Loader width="30px"></Loader>
              </div>

              <ul class="search-item">
                <template v-if="!loading && searchData.length == 0">
                  <NotFound :title="'No product found'" :width="60" />
                </template>
                <li
                  v-else
                  v-for="(item, searchIndex) in searchData"
                  :key="'sss' + searchIndex"
                  class="clearfix"
                >
                  <nuxt-link :to="`/products/${item.slug}`">
                    <img
                      v-if="item.primary_image"
                      :src="backOfficeURL + item.primary_image"
                      :alt="item.title"
                    />
                    <span class="item-name">{{ item.title }}</span>
                    <span v-if="item.category" class="item-cart">
                      {{ item.category.name }}
                    </span>
                    <Price :obj="item" />
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <!-- Mobile search result box end -->
          </ul>
          <!-- Mobile Search Ends -->
        </div>
      </div>
    </div>
    <!-- Mobile Navbar Area End -->
  </div>
</template>


<script>
import Loader from "~/components/CircleLoader";
import NotFound from "~/components/NotFound";
import CartSmall from "~/components/Cart/CartSmall";
import Price from "~/components/Card/Product/Price";
import _ from "lodash";
import { mapGetters } from "vuex";
export default {
  components: {
    Loader,
    NotFound,
    CartSmall,
    Price,
  },

  data() {
    return {
      loading: "initial",
      showSearch: false,
      showMobileSearch: false,
      showCart: false,
      isShowCategoryDropdown: false,
      // baseURL: false,
      query_word: "",
      sidebar: false,
      searchData: [],
    };
  },

  computed: {
    ...mapGetters({
      cartLength: "getCartLength",
      wishlistLength: "getWishlistLength",
    }),
  },

  methods: {
    showCategoryDropdown() {
      this.isShowCategoryDropdown = !this.isShowCategoryDropdown;
    },

    async logout() {
      const res = await this.callApi("get", `/api/auth/logout`);
      if (res.status == 200) {
        this.$router.go();
      } else {
        this.swr();
      }
    },

    async searchResult() {
      if (this.query_word.trim() == "") return;
      this.showSearch = this.$route.name != "search" ? true : false;
      this.showMobileSearch = this.$route.name != "search" ? true : false;
      this.loading = "search";

      const res = await this.callApi(
        "get",
        `/api/search/product?query=${this.query_word}`
      );
      if (res.status == 200) {
        this.searchData = res.data;
      } else {
        this.swr();
      }
      this.loading = false;
    },

    goToSearchPage() {
      this.showSearch = false;
      this.showMobileSearch = false;
      if (this.query_word.trim() == "") return;

      if (this.$route.path == "/search") {
        this.i("ss");
        return (window.location.href = `/search?query_word=${this.query_word}`);
      }

      this.$router.push(`/search?query_word=${this.query_word}`);
    },

    closeMobileSearch() {
      this.showSearch = false;
      this.showMobileSearch = false;
    },
  },

  watch: {
    "$route.path": function () {
      this.showSearch = false;
      this.showMobileSearch = false;
      this.isShowCategoryDropdown = false;
      this.showCart = false;
    },

    query_word(oldVal, newVal) {
      if (oldVal.trim() == "") {
        this.showSearch = false;
        this.showMobileSearch = false;
      }
    },
  },

  async mounted() {
    window.onscroll = function () {
      myFunction();
    };

    var header = document.querySelector(".upper-nav");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("is-sticky");
      } else {
        header.classList.remove("is-sticky");
      }
    }

    // const [res, shipping] = await Promise.all([
    //   this.callApi("get", "/api/home/category/sub-category/all"),
    //   this.callApi("get", "/api/home/shipping_details/get/all"),
    // ]);
    // if (res.status == 200) {
    //   this.$store.commit("setCategories", res.data.categories);
    //   this.$store.commit("setBrands", res.data.brands);
    // }

    // if (shipping.status == 200) {
    //   this.$store.commit("setShipping", shipping.data);
    // } else {
    // }
  },
};
</script>