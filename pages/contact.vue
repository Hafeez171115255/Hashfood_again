<template>
  <div>
    <BreadCrumbs :routes="routes" :active_route="'Contact'" />

    <!-- Conact Area -->
    <section class="main-contact-area ptb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-3">
            <div class="single-contact">
              <div class="icon">
                <i class="bx bx-location-plus"></i>
              </div>
              <div class="content">
                <h3>Address</h3>
                <p>39, 4th Floor West World Shopping City Zindabazar, Sylhet</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-3">
            <div class="single-contact">
              <div class="icon">
                <i class="bx bxs-phone-call"></i>
              </div>
              <div class="content">
                <h3>Phone</h3>
                <a href="tel: +88 0176 3344438"> +88 0176 3344438 </a>
                <a href="tel: +88 0170 000000"> +88 0170 000000 </a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-3">
            <div class="single-contact">
              <div class="icon">
                <i class="bx bxs-envelope"></i>
              </div>
              <div class="content">
                <h3>Email</h3>
                <a href="mailto: info@syncart.com"> info@syncart.com </a>
                <a href="mailto: support@syncart.com"> support@syncart.com </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- End Conact Area -->

    <!-- Map Area -->
    <section class="contact-map-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="content">
              <h2>Get in touch</h2>
              <p>Write us your thoughts</p>
            </div>
            <form id="contactForm">
              <div class="row align-items-center">
                <div class="col-12">
                  <div class="form-group mb-3">
                    <input
                      type="email"
                      name="email"
                      class="form-control"
                      id="email"
                      required
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group mb-3">
                    <input
                      type="text"
                      name="phone_number"
                      class="form-control"
                      id="phone_number"
                      required
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                <div class="col-12 mb-4">
                  <div class="form-group">
                    <textarea
                      name="message"
                      id="message"
                      class="form-control"
                      cols="30"
                      rows="6"
                      required
                      placeholder="Message..."
                    ></textarea>
                  </div>
                </div>

                <div class="col-12">
                  <button type="submit" class="box-btn">
                    Send Message <i class="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-lg-6">
            <div class="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14475.259566651797!2d91.88062475!3d24.90429495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1630001710071!5m2!1sen!2sbd"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Map Area -->
  </div>
</template>

<script>
import BreadCrumbs from "~/components/BreadCrumbs";
export default {
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
    };
  },
};
</script>