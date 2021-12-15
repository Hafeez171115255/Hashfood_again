import Vue from "vue";
import { mapGetters } from "vuex";
import moment from "moment";

// Debounce
import vueDebounce from "vue-debounce";
Vue.use(vueDebounce);

Vue.mixin({
  methods: {
    async callApi(method, url, dataObj) {
      try {
        let data = await this.$axios({
          config: {
            withCredentials: true
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: method,
          url: url,
          data: dataObj
        });
        return data;
      } catch (e) {
        return e.response;
      }
    },

    i(msg, i = "Hey!") {
      this.$Notice.info({
        title: i,
        desc: msg
      });
    },

    s(msg, i = "Great!") {
      this.$Notice.success({
        title: i,
        desc: msg
      });
    },

    w(msg, i = "Hi!") {
      this.$Notice.warning({
        title: i,
        desc: msg
      });
    },

    e(msg, i = "Oops!") {
      this.$Notice.error({
        title: i,
        desc: msg
      });
    },

    swr() {
      this.$Notice.error({
        title: "Oops",
        desc: "Something went wrong, please try again later"
      });
    },

    selectPrice(obj) {
      if (obj.offer_price > 0 && obj.main_price > obj.offer_price)
        return obj.offer_price;
      return obj.main_price;
    }
  },
  computed: {
    ...mapGetters({
      authUser: "getAuthUser",
      baseURL: "getBaseURL",
      backOfficeURL: "getBackOfficeURL",
      categories: "getCategories",
      brands: "getBrands"
    })
  },

  filters: {
    formatFeedDate(date) {
      return moment(date).format("DD MMM YYYY H:mmA");
    },

    fullName(obj) {
      return obj.first_name + " " + obj.last_name;
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    showCategoryName(id) {
      // let item = this.categories.filter(el => el.id == id)
      // return item ? item.name : ''
      return "";
    }
  }
});
