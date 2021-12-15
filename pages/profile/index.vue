<template>
	<div>
		<!-- Page Titel Area -->
		<div class="page-title-area">
			<div class="container">
				<div class="page-title-content">
					<ul>
						<li>
							<a href="index.html"> Home </a>
						</li>
						<li class="p-0">/</li>
						<li>Profile</li>
					</ul>
				</div>
			</div>
			<div class="shape">
				<img src="assets/images/shape.png" alt="shape" />
			</div>
		</div>
		<!-- End Page Title Area -->

		<!-- Profile Area -->
		<section class="profile-area ptb-100">
			<div class="container">
				<div class="row">
					<div class="col-lg-3">
						<div class="profile-nav">
							<div
								class="nav flex-column nav-pills"
								id="v-pills-tab"
								role="tablist"
								aria-orientation="vertical"
							>
								<button
									@click="changeTab('dashboard')"
									:class="['nav-link', tab == 'dashboard' ? 'active' : '']"
									id="v-pills-dashboard-tab"
									data-bs-toggle="pill"
									data-bs-target="#v-pills-dashboard"
									type="button"
									role="tab"
									aria-controls="v-pills-dashboard"
									aria-selected="true"
								>
									<i class="bx bxs-dashboard"></i>
									Dashboard
								</button>

								<button
									@click="changeTab('orders')"
									:class="['nav-link', tab == 'orders' ? 'active' : '']"
									id="v-pills-orders-tab"
									data-bs-toggle="pill"
									data-bs-target="#v-pills-orders"
									type="button"
									role="tab"
									aria-controls="v-pills-orders"
									aria-selected="false"
								>
									<i class="bx bxs-cart-download"></i> My Orders
								</button>

								<button
									@click="changeTab('wishlist')"
									:class="['nav-link', tab == 'wishlist' ? 'active' : '']"
									id="v-pills-wishlist-tab"
									data-bs-toggle="pill"
									data-bs-target="#v-pills-wishlist"
									type="button"
									role="tab"
									aria-controls="v-pills-wishlist"
									aria-selected="false"
								>
									<i class="bx bx-heart"></i> My Wishlist
								</button>

								<button
									@click="changeTab('reviews')"
									:class="['nav-link', tab == 'reviews' ? 'active' : '']"
									id="v-pills-reviews-tab"
									data-bs-toggle="pill"
									data-bs-target="#v-pills-reviews"
									type="button"
									role="tab"
									aria-controls="v-pills-reviews"
									aria-selected="false"
								>
									<i class="bx bxs-message-alt-edit"></i> My Reviews
								</button>

								<button
									@click="changeTab('account')"
									:class="['nav-link', tab == 'account' ? 'active' : '']"
									id="v-pills-settings-tab"
									data-bs-toggle="pill"
									data-bs-target="#v-pills-profile"
									type="button"
									role="tab"
									aria-controls="v-pills-profile"
									aria-selected="false"
								>
									<i class="bx bxs-user"></i> My Profile
								</button>

								<button
									@click="logout"
									class="nav-link"
									id="v-pills-profile-tab"
									data-bs-toggle="pill"
									type="button"
									role="tab"
									aria-selected="false"
									href="#"
								>
									<i class="bx bx-power-off"></i> Logout
								</button>
							</div>
						</div>
					</div>
					<div class="col-lg-9">
						<div class="tab-content profile-content" id="v-pills-tabContent">
							<Dashboard v-if="tab == 'dashboard'" />

							<Orders v-if="tab == 'orders'" />

							<Wishlist v-if="tab == 'wishlist'" />

							<Reviews v-if="tab == 'reviews'" />

							<Profile v-if="tab == 'account'" />
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- End Profile Area -->
	</div>
</template>

<script>
import Dashboard from "~/components/Profile/Dashboard";
import Profile from "~/components/Profile";
import Orders from "~/components/Profile/Orders";
import Wishlist from "~/components/Profile/Wishlist";
import Reviews from "~/components/Profile/Reviews";
export default {
	middleware: ["auth"],

	components: {
		Dashboard,
		Profile,
		Orders,
		Wishlist,
		Reviews,
	},

	data() {
		return {
			tab: "dashboard",
		};
	},

	methods: {
		changeTab(tab) {
			this.tab = tab;
			this.$router.push(`?tab=${this.tab}`);
		},

		async logout() {
			const res = await this.callApi("get", `/api/auth/logout`);
			if (res.status == 200) {
				this.$router.go();
			} else {
				this.swr();
			}
		},
	},

	mounted() {
		if (
			this.$route.query.tab != "dashboard" &&
			this.$route.query.tab != "orders" &&
			this.$route.query.tab != "wishlist" &&
			this.$route.query.tab != "reviews" &&
			this.$route.query.tab != "account"
		) {
			this.tab = "dashboard";
		} else {
			this.tab = this.$route.query.tab ? this.$route.query.tab : "dashboard";
		}
		this.$router.push(`?tab=${this.tab}`);
	},
};
</script>