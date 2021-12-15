<template>
  <div>
    <BreadCrumbs :routes="routes" :active_route="'Sign Up'" />

    <!-- SignUp -->
    <section class="signup-area ptb-100">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="signup-form">
              <div class="section-tittle text-center">
                <h2>Sign Up</h2>
              </div>
              <form v-on:submit.prevent="regsiter">
                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mb-3">
                      <input
                        v-model="user.first_name"
                        class="form-control"
                        type="text"
                        name="name"
                        placeholder="First Name"
                      />
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mb-3">
                      <input
                        v-model="user.last_name"
                        class="form-control"
                        type="text"
                        name="name"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

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
                      <input v-model="isChecked" type="checkbox" id="chb1" />
                      <label>
                        I agree with Paso
                        <a href="privecy.html">Privacy Policy</a>
                      </label>
                    </div>
                  </div>

                  <div class="col-12 text-center">
                    <button
                      :disabled="!isChecked || loading"
                      class="box-btn signup-btn"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>

                  <div class="col-12 text-center">
                    <p class="al-acc">
                      Already have an account?
                      <nuxt-link to="/auth/login"> Sign In</nuxt-link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End SignUp -->
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
      isChecked: false,
      user: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      },
      loading: false,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },

  methods: {
    async regsiter() {
      if (this.user.first_name == "") {
        this.e("First Name is required!");
        return;
      }

      if (this.user.last_name == "") {
        this.e("Last Name is required!");
        return;
      }

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

      if (this.user.password.length < 6) {
        this.e("Password length should be at lesat 6!");
        return;
      }

      this.loading = true;
      const res = await this.callApi("post", "/api/auth/register", this.user);
      if (res.status == 200) {
        this.s("Account created");
        this.$store.commit("updateAuthUser", res.data);
        this.$router.push("/");
      } else {
        if (res.status == 401) {
          for (let i of res.data) {
            this.e(i.message);
          }
        }
      }
      this.loading = false;
    },
  },
};
</script>