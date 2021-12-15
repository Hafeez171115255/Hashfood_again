<template>
  <div>
    <Header></Header>
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters({
      authUser: "getAuthUser",
    }),
  },

  data() {
    return {};
  },

  methods: {},
  watch: {
    "$route.name": function (newVal, oldVal) {
      // this.activeRoute = newVal;
    },
  },
};
</script>

