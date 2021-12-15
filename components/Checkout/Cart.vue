<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="shopping-cart-inner">
        <div class="table-responsive">
          <table class="table table-borderless shopping-cart-table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT NAME</th>
                <th>UNIT PRICE</th>
                <th>QUANTITY</th>
                <th>LINE TOTAL</th>
                <th>
                  <button class="btn-remove">
                    <!-- <i class="bx bx-trash-alt"></i> -->
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in carts" :key="'cart' + index">
                <td v-if="item.product">
                  <div class="product-image">
                    <img :src="backOfficeURL + item.product.primary_image" />
                  </div>
                </td>
                <td v-if="item.product">
                  <nuxt-link
                    :to="`/products/${item.product.slug}?tab=description`"
                    class="product-name"
                  >
                    {{ item.product.title }}
                  </nuxt-link>
                  <ul class="list-inline product-options"></ul>
                </td>
                <td>
                  <label>Unit Price:</label>
                  <span class="product-price"
                    >BDT&nbsp;{{ item.unit_price }}</span
                  >
                </td>
                <td>
                  <label>Quantity:</label>
                  <div class="number-picker">
                    <div class="input-group-quantity">
                      <!-- <button
                        type="button"
                        data-type="minus"
                        disabled="disabled"
                        class="btn btn-number btn-minus"
                      >
                        <i class="las la-angle-left"></i>
                      </button> -->
                      <input
                        type="number"
                        v-model="item.quantity"
                        min="1"
                        max="1000"
                        class="form-control input-number input-quantity"
                      />
                      <!-- <button
                        type="button"
                        data-type="plus"
                        class="btn btn-number btn-plus"
                      >
                        <i class="las la-angle-right"></i>
                      </button> -->
                    </div>
                  </div>
                </td>
                <td>
                  <label>Line Total:</label>
                  <span class="product-price"
                    >BDT&nbsp;{{ item.quantity * item.unit_price }}</span
                  >
                </td>
                <td>
                  <button @click="removeFromCart(item.id)" class="btn-remove">
                    <i class="bx bx-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <template v-if="!loading && carts.length == 0">
            <NotFound :title="'Cart is empty'" :width="45" />
          </template>
        </div>
      </div>
    </div>

    <div class="col-lg-4">
      <div class="order-summary">
        <h4>Order Summary</h4>
        <p class="subtotla">
          Subtotal : <span>${{ total }}</span>
        </p>

        <p class="subtotla">Shipping:</p>

        <div class="order">
          <!-- <p>
						<input type="radio" id="test1" name="radio-group" />
						<label for="test1">Local Pickup </label>
						<span>$99</span>
					</p> -->

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

          <!-- <p v-for="(item, index) in shippingData" :key="'ss' + index">
            <template v-if="item.charge">
              <input
                v-model="shipping_charge"
                type="radio"
                id="test2"
                :value="item.charge.charge"
              />
              <label for="test2">{{ item.name }} </label>
              <span>${{ item.charge.charge }}</span>
            </template>
          </p> -->
        </div>

        <p class="total">
          Total: <span>${{ total + shipping_charge }}</span>
        </p>

        <button @click="changeTab('checkout')" type="submit" class="box-btn">
          Proceed to checkout
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import NotFound from "~/components/NotFound";

export default {
  props: ["loading"],

  components: { NotFound },

  data() {
    return {
      cartData: [],
      shipping_method: "",
      shipping_charge: "",
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
      // for (let i of this.shipping) {
      // 	if (this.shipping_method == i.name)
      // 		this.shipping_charge = i.charge.charge;
      // }
      return this.shipping;
    },
  },

  methods: {
    async removeFromCart(id) {
      const res = await this.callApi("post", `/api/cart/remove/${id}`);
      if (res.status == 200) {
        this.cartData = this.cartData.filter((el) => el.id != id);
        this.$store.commit("setCarts", this.cartData);
        this.$store.commit("decrementCartLength", 1);
      }
    },

    changeTab(tab) {
      this.$store.commit("setCart", this.cartData);
      this.$emit("changeTab", { tab: tab });
    },
  },
};
</script>