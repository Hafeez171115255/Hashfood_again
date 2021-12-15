<template>
  <div
    class="tab-pane fade show active"
    id="v-pills-dashboard"
    role="tabpanel"
    aria-labelledby="v-pills-dashboard-tab"
  >
    <div class="order-table-area">
      <div class="title">
        <h3>Recent Orders</h3>
      </div>
      <div class="table-responsive">
        <table
          class="
            table table-striped table-borderless
            order-table
            table-responsive
          "
        >
          <thead>
            <tr class="heading">
              <th scope="col">Order ID</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orders" :key="'order' + index">
              <td>{{ item.id }}</td>
              <td>{{ item.created_at | formatFeedDate }}</td>
              <td :class="item.status == 'pending' ? 'pending' : ''">
                {{ item.status }}
              </td>
              <th>${{ item.grand_total }}</th>
              <th>
                <nuxt-link :to="`/profile/orders/${item.id}`">
                  <i class="bx bx-show"></i>View
                </nuxt-link>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <LoaderOverlay v-if="loading" />
  </div>
</template>

<script>
import LoaderOverlay from "~/components/Loader/CircleOverlay";

export default {
  components: { LoaderOverlay },
  data() {
    return {
      orders: [],
      loading: false,
    };
  },

  async created() {
    this.loading = true;
    const res = await this.callApi("get", "/api/profile/get/orders");
    if (res.status == 200) {
      this.orders = res.data;
    } else {
      this.swr();
    }
    this.loading = false;
  },
};
</script>