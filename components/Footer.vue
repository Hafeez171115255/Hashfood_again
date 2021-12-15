<template>
  <div>
    <!-- Footer Area -->
    <footer class="footer-area ptb-70">
      <div class="container">
        <div class="row align-items-baseline desktop-view">
          <div class="col-lg-3 col-sm-6 col-md-6">
            <div class="single-footer-widget">
              <div class="logo">
                <a href="/"><img src="images/logo.png" alt="logo" /></a>
              </div>
              <div class="content">
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos.
                </p>

                <div class="social">
                  <ul>
                    <li>
                      <a href="#"><i class="bx bxl-facebook"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="bx bxl-youtube"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="bx bxl-instagram-alt"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="bx bxl-twitter"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-md-6">
            <div class="single-footer-widget">
              <h3>Services</h3>
              <ul class="list">
                <li><a href="#">Profile</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Address</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-md-6">
            <div class="single-footer-widget">
              <h3>Trending Categories</h3>
              <ul class="list">
                <li><a href="">Asus</a></li>
                <li><a href="#">Hp</a></li>
                <li><a href="#">Del</a></li>
                <li><a href="#">Apple</a></li>
                <li><a href="">Mi</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-md-6">
            <div class="single-footer-widget address">
              <h3>Contact Us</h3>

              <ul>
                <li>
                  <a href="tel:+88 0176 3344438"
                    ><i class="bx bxs-phone-call"></i> +88 0176 3344438</a
                  >
                </li>
                <li>
                  <a href="#"
                    ><i class="bx bxs-location-plus"></i>
                    West World Shopping City (4th Floor) Zindabazar, Sylhet-3100
                  </a>
                </li>
                <li>
                  <a href="mailto:businessemail@business.com"
                    ><i class="bx bxs-envelope"></i>
                    businessemail@business.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row align-items-baseline mobile-view">
          <div class="col-lg-6 col-md-6">
            <div class="single-footer-widget">
              <div class="logo">
                <a href="/"><img src="images/logo.png" alt="logo" /></a>
              </div>
              <div class="content">
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos.
                </p>

                <div class="social">
                  <ul>
                    <li>
                      <a href="#"><i class="bx bxl-facebook"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="bx bxl-youtube"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="bx bxl-instagram-alt"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="bx bxl-twitter"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-lg-3 col-sm-6 col-md-6">
						<div class="single-footer-widget">
							<h3>Services</h3>
							<ul class="list">
								<li><a href="#">Profile</a></li>
								<li><a href="#">About Us</a></li>
								<li><a href="#">Contact</a></li>
								<li><a href="#">Address</a></li>
							</ul>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 col-md-6">
						<div class="single-footer-widget">
							<h3>Trending Categories</h3>
							<ul class="list">
								<li><a href="">Asus</a></li>
								<li><a href="#">Hp</a></li>
								<li><a href="#">Del</a></li>
								<li><a href="#">Apple</a></li>
								<li><a href="">Mi</a></li>
							</ul>
						</div>
					</div> -->
          <div class="col-lg-6 col-md-6">
            <div class="single-footer-widget address">
              <h3>Contact Us</h3>

              <ul>
                <li>
                  <a href="#">
                    <i class="bx bxs-location-plus"></i>
                    West World Shopping City (4th Floor) Zindabazar, Sylhet-3100
                  </a>
                </li>
                <li>
                  <a href="tel:+88 0176 3344438">
                    <i class="bx bxs-phone-call"></i>
                    +88 0176 3344438</a
                  >
                </li>
                <li>
                  <a href="mailto:businessemail@business.com">
                    <i class="bx bxs-envelope"></i>
                    businessemail@business.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- End Footer Area  -->

    <!--  Mobile Navbar Area -->
    <div class="bottom-nav-mobile">
      <div class="container">
        <div class="row">
          <div class="col-3 bar">
            <a href="">
              <i class="bx bx-home-alt"></i>
            </a>
          </div>
          <div class="col-3 bar">
            <nuxt-link to="/footerCategory" class="see-more" href="#"
              ><i class="bx bx-grid-alt"></i
            ></nuxt-link>
            <!-- <a href="">
							<i class="bx bx-grid-alt"></i>
						</a> -->
          </div>
          <div class="col-3 bar">
            <nuxt-link to="/checkout?tab=cart">
              <i class="bx bx-cart"></i>
              <span v-if="cartLength > 0">{{ cartLength }}</span>
            </nuxt-link>
          </div>
          <div class="col-3">
            <a href="">
              <i class="bx bx-user"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cartLength: "getCartLength",
    }),
  },
};
</script>