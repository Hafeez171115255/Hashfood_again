<template>
  <div class="row">
    <div class="col-12">
      <div class="complate-order-area">
        <div class="d-table">
          <div class="d-table-cell">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-12">
                  <div class="content text-center">
                    <p>
                      Thank you for your order!
                      <span>Your Order ID is #{{ $route.query.order_id }}</span>
                    </p>
                    <button
                      @click="
                        $router.push(`/profile/orders/${$route.query.order_id}`)
                      "
                      class="box-btn mt-3"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    if (!this.$route.query.order_id) return;
  },
};
</script>