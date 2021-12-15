<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="account-area">
        <div class="row">
          <h4>Account Details</h4>

          <div class="col-lg-6">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email </label>
              <input
                v-model="order.email"
                type="email"
                placeholder="Email"
                :class="['form-control', error.email ? 'error-border' : '']"
              />
              <ErrorText v-if="error.email" :title="error.email" />
            </div>
          </div>

          <div class="col-lg-6">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Phone </label>
              <input
                v-model="order.phone"
                type="text"
                placeholder="Phone"
                :class="['form-control', error.phone ? 'error-border' : '']"
              />
              <ErrorText v-if="error.phone" :title="error.phone" />
            </div>
          </div>
        </div>
        <!-- <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Create Account
            </label>
          </div> -->

        <div class="row">
          <!-- Billing Address  -->
          <template>
            <h4>Billing Details</h4>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >First Name
                </label>
                <input
                  v-model.trim="order.billing_address.first_name"
                  type="text"
                  placeholder="First Name"
                  :class="[
                    'form-control',
                    error.billing_address.first_name ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.billing_address.first_name"
                  :title="error.billing_address.first_name"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Last Name
                </label>
                <input
                  v-model.trim="order.billing_address.last_name"
                  type="text"
                  placeholder="Last Name"
                  :class="[
                    'form-control',
                    error.billing_address.last_name ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.billing_address.last_name"
                  :title="error.billing_address.last_name"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Street Address
                </label>
                <input
                  v-model.trim="order.billing_address.street_address"
                  type="text"
                  placeholder="Address Line 1"
                  :class="[
                    'form-control',
                    error.billing_address.street_address ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.billing_address.street_address"
                  :title="error.billing_address.street_address"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"> </label>
                <input
                  v-model.trim="order.billing_address.street_address2"
                  type="text"
                  placeholder="Address Line 2"
                  :class="['form-control']"
                />
                <span>Optional</span>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">City </label>
                <input
                  v-model.trim="order.billing_address.city"
                  type="text"
                  placeholder="Address Line 1"
                  :class="[
                    'form-control',
                    error.billing_address.city ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.billing_address.city"
                  :title="error.billing_address.city"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Postal Code
                </label>
                <input
                  v-model.trim="order.billing_address.postal_code"
                  type="text"
                  placeholder="Address Line 2"
                  :class="[
                    'form-control',
                    error.billing_address.postal_code ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.billing_address.postal_code"
                  :title="error.billing_address.postal_code"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="Country" class="form-label">Country</label>
                <select
                  v-model="order.billing_address.country"
                  id="Country"
                  :class="[
                    'form-select form-control',
                    error.billing_address.country ? 'error-border' : '',
                  ]"
                >
                  <option>Bangladesh</option>
                </select>
                <ErrorText
                  v-if="error.billing_address.country"
                  :title="error.email"
                />
              </div>
            </div>

            <div class="col-lg-12">
              <div class="mb-3 form-check">
                <input
                  v-model.trim="isShipToDifferentAddress"
                  type="checkbox"
                  class="form-check-input"
                />
                <label class="form-check-label" for="exampleCheck1"
                  >Ship to Different Address
                </label>
              </div>
            </div>
          </template>
          <!-- Billing Address Ends  -->

          <!-- Different Shipping Address  -->
          <template v-if="isShipToDifferentAddress">
            <h4>Shipping Address</h4>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >First Name
                </label>
                <input
                  v-model.trim="order.shipping_address.first_name"
                  type="text"
                  placeholder="First Name"
                  :class="[
                    'form-control',
                    error.shipping_address.first_name ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.shipping_address.first_name"
                  :title="error.shipping_address.first_name"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Last Name
                </label>
                <input
                  v-model.trim="order.shipping_address.last_name"
                  type="text"
                  placeholder="Last Name"
                  :class="[
                    'form-control',
                    error.shipping_address.last_name ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.shipping_address.last_name"
                  :title="error.shipping_address.last_name"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Street Address
                </label>
                <input
                  v-model.trim="order.shipping_address.street_address"
                  type="text"
                  placeholder="Address Line 1"
                  :class="[
                    'form-control',
                    error.shipping_address.street_address ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.shipping_address.street_address"
                  :title="error.shipping_address.street_address"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"> </label>
                <input
                  v-model.trim="order.shipping_address.street_address2"
                  type="text"
                  placeholder="Address Line 2"
                  :class="['form-control']"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">City </label>
                <input
                  v-model.trim="order.shipping_address.city"
                  type="text"
                  placeholder="Address Line 1"
                  :class="[
                    'form-control',
                    error.shipping_address.city ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.shipping_address.city"
                  :title="error.shipping_address.city"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Postal Code
                </label>
                <input
                  v-model.trim="order.shipping_address.postal_code"
                  type="text"
                  placeholder="Address Line 2"
                  :class="[
                    'form-control',
                    error.shipping_address.postal_code ? 'error-border' : '',
                  ]"
                />
                <ErrorText
                  v-if="error.shipping_address.postal_code"
                  :title="error.shipping_address.postal_code"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="mb-3">
                <label for="Country" class="form-label">Country</label>
                <select
                  v-model="order.shipping_address.country"
                  id="Country"
                  :class="[
                    'form-select form-control',
                    error.shipping_address.country ? 'error-border' : '',
                  ]"
                >
                  <option>Bangladesh</option>
                </select>
                <ErrorText
                  v-if="error.shipping_address.country"
                  :title="error.shipping_address.country"
                />
              </div>
            </div>
          </template>
          <!-- Different Shipping Address Ends  -->

          <!-- Notes -->
          <div class="col-lg-12">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Other Notes
              </label>
              <input
                type="text"
                placeholder="Other Notes"
                class="form-control"
                v-model="order.notes"
              />
            </div>
          </div>
          <!-- Notes -->

          <!-- Coupon -->
          <div class="col-lg-4">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Have a Coupon Code?
              </label>
              <input
                type="text"
                placeholder="Promo Code"
                class="form-control"
                id=""
              />
            </div>
          </div>
          <div class="col-lg-6">
            <button type="submit" class="box-btn">Apply Coupon</button>
          </div>
          <!-- Coupon Ends -->
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="order-payment">
        <h4>Payment Method</h4>
        <input
          checked
          type="radio"
          class="form-check-input"
          id="exampleCheck11"
        />
        <label class="form-check-label" for="exampleCheck12"
          >Cash On Delivery
        </label>
      </div>
      <div class="order-summary">
        <h4>Order Summary</h4>

        <ul class="shopping-cart-items">
          <li v-for="(item, index) in carts" :key="index" class="clearfix">
            <template v-if="item.product">
              <img :src="backOfficeURL + item.product.primary_image" />
              <span class="item-name"> {{ item.product.title }} </span>
              <!-- <span class="item-cart">Men's Shoe</span> -->
              <span class="item-quantity"
                >{{ item.quantity }} x ${{ item.unit_price }}
              </span>
              <!-- <span class="item-action">
                <a href="#"> <i class="bx bx-trash-alt"> </i> </a
              ></span> -->
            </template>
          </li>
        </ul>

        <p class="subtotla">
          Subtotal : <span>${{ total }}</span>
        </p>

        <p class="subtotla">Shipping:</p>

        <div class="order">
          <!-- <template v-if="item.charge"> -->
          <RadioGroup v-model="shipping_charge">
            <Radio
              v-for="(item, index) in shippingData"
              :key="'ss' + index"
              :label="item.charge.charge"
              vertical
            >
              <label>{{ item.name }} </label>
              <span v-if="item.charge">${{ item.charge.charge }}</span>
            </Radio>
          </RadioGroup>
          <!-- </template> -->
        </div>

        <p class="total">
          Total: <span>${{ total + shipping_charge }}</span>
        </p>

        <div class="contact">
          <input
            v-model="agree"
            type="checkbox"
            class="form-check-input"
            id="exampleCheck11"
          />
          <label class="form-check-label" for="exampleCheck11"
            >I agree to the <a href="#">Terms and Conditions</a>
          </label>
        </div>

        <button :disabled="!agree" @click="addOrder" type="submit" class="box-btn">
          Place Order
        </button>
      </div>
    </div>

    <LoaderOverlay v-if="loading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NotFound from "~/components/NotFound";
import ErrorText from "~/components/Error/Text";
import LoaderOverlay from "~/components/Loader/CircleOverlay";
export default {
  props: ["loading"],

  components: { NotFound, ErrorText, LoaderOverlay },

  data() {
    return {
      cartData: [],
      shipping_method: "",
      shipping_charge: "",
      agree: true,

      order: {
        email: "",
        phone: "",
        billing_address: {
          first_name: "",
          last_name: "",
          street_address: "",
          street_address2: "",
          city: "",
          postal_code: "",
          country: "",
        },
        shipping_address: {
          first_name: "",
          last_name: "",
          street_address: "",
          street_address2: "",
          city: "",
          postal_code: "",
          country: "",
        },
        notes: "",
      },

      error: {
        email: false,
        phone: false,
        billing_address: {
          first_name: false,
          last_name: false,
          street_address: false,
          street_address2: false,
          city: false,
          postal_code: false,
          country: false,
        },
        shipping_address: {
          first_name: false,
          last_name: false,
          street_address: false,
          street_address2: false,
          city: false,
          postal_code: false,
          country: false,
        },
      },

      isShipToDifferentAddress: false,
      isLoading: false,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },

  computed: {
    ...mapGetters({
      carts: "getCarts",
      shipping: "getShipping",
    }),

    total() {
      let count = 0;
      this.cartData = [...this.carts];
      for (let i of this.cartData) {
        count += i.quantity * i.unit_price;
      }
      return count;
    },

    shippingData() {
      if (this.shipping.length > 0) {
        this.shipping_method = this.shipping[0].name;
        this.shipping_charge = this.shipping[0].charge.charge;
      }
      return this.shipping;
    },
  },

  methods: {
    clearData() {
      this.order = {
        email: "",
        phone: "",
        billing_address: {
          first_name: "",
          last_name: "",
          street_address: "",
          street_address2: "",
          city: "",
          postal_code: "",
          country: "",
        },
        shipping_address: {
          first_name: "",
          last_name: "",
          street_address: "",
          street_address2: "",
          city: "",
          postal_code: "",
          country: "",
        },
        notes: "",
      };
    },

    clearErrorData() {
      this.error = {
        email: false,
        phone: false,
        billing_address: {
          first_name: false,
          last_name: false,
          street_address: false,
          street_address2: false,
          city: false,
          postal_code: false,
          country: false,
        },
        shipping_address: {
          first_name: false,
          last_name: false,
          street_address: false,
          street_address2: false,
          city: false,
          postal_code: false,
          country: false,
        },
        notes: false,
      };
    },

    async removeFromCart(id) {
      const res = await this.callApi("post", `/api/cart/remove/${id}`);
      if (res.status == 200) {
        this.cartData = this.cartData.filter((el) => el.id != id);
        this.$store.commit("setCarts", this.cartData);
        this.$store.commit("decrementCartLength", 1);
      }
    },

    validate() {
      this.clearErrorData();
      if (this.order.email == "") {
        this.error.email = "Email is required";
        return false;
      }
      if (!this.reg.test(this.order.email)) {
        this.error.email = "Email is invalid";
        return false;
      }
      if (this.order.phone == "") {
        this.error.phone = "Phone is required";
        return false;
      }
      if (this.order.billing_address.first_name == "") {
        this.error.billing_address.first_name = "First Name is required";
        return false;
      }
      if (this.order.billing_address.last_name == "") {
        this.error.billing_address.last_name = "Last Name is required";
        return false;
      }
      if (this.order.billing_address.street_address == "") {
        this.error.billing_address.street_address =
          "Street Address is required";
        return false;
      }
      if (this.order.billing_address.city == "") {
        this.error.billing_address.city = "City is required";
        return false;
      }
      if (this.order.billing_address.postal_code == "") {
        this.error.billing_address.postal_code = "Postal Code is required";
        return false;
      }
      if (this.order.billing_address.country == "") {
        this.error.billing_address.country = "Country is required";
        return false;
      }
      if (this.isShipToDifferentAddress) {
        if (this.order.shipping_address.first_name == "") {
          this.error.shipping_address.first_name = "First Name is required";
          return false;
        }
        if (this.order.shipping_address.last_name == "") {
          this.error.shipping_address.last_name = "Last Name is required";
          return false;
        }
        if (this.order.shipping_address.street_address == "") {
          this.error.shipping_address.street_address =
            "Street Address is required";
          return false;
        }
        if (this.order.shipping_address.city == "") {
          this.error.shipping_address.city = "City is required";
          return false;
        }
        if (this.order.shipping_address.postal_code == "") {
          this.error.shipping_address.postal_code = "Postal Code is required";
          return false;
        }
        if (this.order.shipping_address.country == "") {
          this.error.shipping_address.country = "Country is required";
          return false;
        }
      }

      return true;
    },

    async addOrder() {
      if (!this.validate()) return;

      let obj = {
        shipping_method: this.shipping_method,
        shipping_charge: this.shipping_charge,
        sub_total: this.total,
        products: this.carts,
        email: this.order.email,
        phone: this.order.phone,
        notes: this.order.notes,
        billing_first_name: this.order.billing_address.first_name,
        billing_last_name: this.order.billing_address.last_name,
        billing_address_one: this.order.billing_address.street_address,
        billing_address_two: this.order.billing_address.street_address2,
        billing_city: this.order.billing_address.city,
        billing_postal_code: this.order.billing_address.postal_code,
        billing_country: this.order.billing_address.country,

        shipping_first_name: this.order.billing_address.first_name,
        shipping_last_name: this.order.billing_address.last_name,
        shipping_address_one: this.order.billing_address.street_address,
        shipping_address_two: this.order.billing_address.street_address2,
        shipping_city: this.order.billing_address.city,
        shipping_postal_code: this.order.billing_address.postal_code,
        shipping_country: this.order.billing_address.country,
      };

      if (this.isShipToDifferentAddress) {
        obj.shipping_first_name = this.order.shipping_address.first_name;
        obj.shipping_last_name = this.order.shipping_address.last_name;
        obj.shipping_address_one = this.order.shipping_address.street_address;
        obj.shipping_address_two = this.order.shipping_address.street_address2;
        obj.shipping_city = this.order.shipping_address.city;
        obj.shipping_postal_code = this.order.shipping_address.postal_code;
        obj.shipping_country = this.order.shipping_address.country;
      }

      this.isLoading = true;
      const res = await this.callApi("post", `/api/order/add/new`, obj);
      if (res.status == 200) {
        this.$store.commit("setCarts", []);
        this.$store.commit("setCartLength", 0);
        this.changeTab({
          tab: "complete",
          order_id: res.data.id,
        });
      } else {
        this.swr();
      }

      this.isLoading = false;
    },

    changeTab(data) {
      this.$store.commit("setCart", this.cartData);
      this.$emit("changeTab", data);
    },
  },

  created() {
    if (this.authUser) {
      this.order.email = this.authUser.email;
    }
  },
};
</script>