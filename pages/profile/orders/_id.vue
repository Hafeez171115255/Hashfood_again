<template>
  <div>
    <BreadCrumbs :routes="routes" :active_route="`${$route.params.id}`" />

    <section class="order-details-area ptb-70">
      <div class="container">
        <div class="order-details-top">
          <h3 class="section-title">View Order</h3>

          <div class="row">
            <div class="col-lg-6">
              <div class="order-information">
                <h4>Order Information</h4>
                <ul class="list-inline order-information-list">
                  <li>
                    <label>Email:</label> <span>{{ order.email }}</span>
                  </li>
                  <li>
                    <label>Date:</label>
                    <span>{{ order.created_at | formatFeedDate }}</span>
                  </li>
                  <li>
                    <label>Shipping Method:</label>
                    <span>{{ order.shipping_method }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="order-billing-details">
                <h4>Billing Address</h4>
                <address>
                  <ul>
                    <li>
                      {{
                        order.billing_first_name + " " + order.billing_last_name
                      }}
                    </li>
                    <li>{{ order.billing_address_one }}</li>
                    <li v-if="order.billing_address_two">
                      {{ order.billing_address_two }}
                    </li>
                    <li>{{ order.billing_city }}</li>
                    <li>{{ order.billing_country }}</li>
                  </ul>
                </address>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="order-shipping-details">
                <h4>Shipping Address</h4>
                <address>
                  <ul>
                    <li>
                      {{
                        order.shipping_first_name +
                        " " +
                        order.shipping_last_name
                      }}
                    </li>
                    <li>{{ order.shipping_address_one }}</li>
                    <li v-if="order.shipping_address_two">
                      {{ order.shipping_address_two }}
                    </li>
                    <li>{{ order.shipping_city }}</li>
                    <li>{{ order.shipping_country }}</li>
                  </ul>
                </address>
              </div>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-borderless order-details-table">
            <thead>
              <tr class="heading">
                <th scope="col">PRODUCT NAME</th>
                <th scope="col">UNIT PRICE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">LINE TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in order.details" :key="'pro' + index">
                <td v-if="item.product">
                  <nuxt-link
                    :to="`/products/${item.product.slug}`"
                    class="product-name"
                  >
                    {{ item.product.title }}
                  </nuxt-link>
                </td>
                <td>$&nbsp;{{ item.unit_price }}</td>
                <td>{{ item.quantity }}</td>
                <td>$&nbsp;{{ item.unit_price * item.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="order.status != 'Delivered'" class="row align-items-center">
          <div class="col-lg-8">
            <form @submit.prevent="submitReview">
              <div class="row">
                <h3>Product Review</h3>
                <div class="col-12">
                  <div class="form-group mb-3">
                    <Rate v-model="rating" />
                    <ErrorText v-if="error.rating" :title="error.rating" />
                  </div>
                  <div class="form-group mb-3">
                    <input
                      type="text"
                      v-model.trim="review_text"
                      :class="[
                        'form-control',
                        error.review_text ? 'error-border' : '',
                      ]"
                      id="review"
                      placeholder="Write a Review"
                    />
                    <ErrorText
                      v-if="error.review_text"
                      :title="error.review_text"
                    />
                  </div>
                </div>
                <div class="col-3">
                  <button type="submit" class="box-btn">Send Review</button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-lg-4">
            <div class="order-details-bottom">
              <ul class="list-inline order-summary-list">
                <li>
                  <label>Subtotal</label>
                  <span class="price-amount">
                    $&nbsp;{{ order.sub_total }}
                  </span>
                </li>
                <li>
                  <label>{{ order.shipping_method }}</label>
                  <span class="price-amount">
                    $&nbsp;{{ order.shipping_charge }}
                  </span>
                </li>
              </ul>
              <div class="order-summary-total">
                <label>Total</label>
                <span class="total-price">
                  $&nbsp;{{ order.grand_total }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Order Details Area -->
  </div>
</template>

<script>
import BreadCrumbs from "~/components/BreadCrumbs";
import ErrorText from "~/components/Error/Text";
export default {
  components: { BreadCrumbs, ErrorText },
  data() {
    return {
      routes: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Profile",
          link: "/profile",
        },
        {
          name: "Orders",
          link: "/profile?tab=orders",
        },
      ],

      rating: 0,
      review_text: "",
      loading: false,

      error: {
        rating: false,
        review_text: false,
      },
    };
  },

  methods: {
    clearErrorData() {
      this.error = {
        rating: false,
        review_text: false,
      };
    },

    validate() {
      if (this.rating == 0) {
        this.error.rating = "Select a rating";
        return false;
      }
      if (this.review_text == "") {
        this.error.review_text = "Review is required";
        return false;
      }
      return true;
    },
    async submitReview() {
      if (!this.validate()) return;

      this.loading = true;
      const res = await this.callApi("post", "/api/product/review/add/new", {
        rating: this.rating,
        review_text: this.review_text,
        product_id: this.$route.params.id,
      });
      if (res.status == 200) {
        this.$router.go();
      } else {
        this.swr();
      }
      this.loading = false;
    },
  },

  async asyncData({ app, params }) {
    try {
      const { data } = await app.$axios.get(
        `/api/profile/get/order/${params.id}`
      );
      return {
        order: data,
      };
    } catch (error) {
      console.log(error.message);
      return {
        error: true,
      };
    }
  },
};
</script>