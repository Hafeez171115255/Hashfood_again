<template>
  <div class="flash-sale-time">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h3>Flash Sale</h3>
        </div>
        <div class="col-lg-6">
          <div class="flash-date">
            <client-only>
              <flip-countdown :deadline="endTime"></flip-countdown>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlipCountdown from "vue2-flip-countdown";
import moment from "moment";
export default {
  components: { FlipCountdown },

  props: ["time"],

  computed: {
    endTime() {
      return moment(this.time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>