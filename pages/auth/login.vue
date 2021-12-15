<template>
  <div>
    <BreadCrumbs :routes="routes" :active_route="'Login'" />

    <!-- Login -->
    <section class="signup-area ptb-70">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="signup-form">
              <div class="section-tittle text-center">
                <h2>Sign In</h2>
              </div>
              <form v-on:submit.prevent="login">
                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mb-3">
                      <input
                        v-model="user.email"
                        class="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mb-3">
                      <input
                        v-model="user.password"
                        class="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="privecy-txt">
                      <input type="checkbox" id="chb1" />
                      <label> Remember me </label>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <button
                      :disabled="loading"
                      class="box-btn signup-btn"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  <div class="col-12 text-center">
                    <p class="al-acc">
                      Not a Member
                      <nuxt-link to="/auth/signup"> Sign Up</nuxt-link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Login -->
  </div>
</template>

<script>
import BreadCrumbs from "~/components/BreadCrumbs";
export default {
  middleware: ["loggedIn"],

  components: {
    BreadCrumbs,
  },

  data() {
    return {
      routes: [
        {
          name: "Home",
          link: "/",
        },
      ],
      user: {
        email: "",
        password: "",
      },
	  loading: false,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },

  methods: {
    async login() {
      if (this.user.email == "") {
        this.e("Email is required!");
        return;
      }

      if (!this.reg.test(this.user.email)) {
        this.e("Email is invalid");
        return;
      }

      if (this.user.password == "") {
        this.e("Password is required!");
        return;
      }

      this.loading = true;
      const res = await this.callApi("post", `/api/auth/login`, this.user);
      if (res.status == 200) {
        this.$store.commit("updateAuthUser", res.data);
        window.location = "/";
      } else {
        this.swr();
      }
      this.loading = false;
    },
  },
};
</script>