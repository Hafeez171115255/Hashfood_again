<template>
	<div
		class="tab-pane fade show active"
		id="v-pills-profile"
		role="tabpanel"
		aria-labelledby="v-pills-profile-tab"
	>
		<div class="profile-area">
			<div class="title mb-5">
				<h3>My Profile</h3>
			</div>

			<form id="profileForm" @submit.prevent="checkProfile">
				<div class="row align-items-center">
					<div class="col-12">
						<div class="row">
							<div class="col">
								<div class="form-group mb-3">
									<input
										type="text"
										:class="[
											'form-control',
											error.first_name ? 'error-border' : '',
										]"
										v-model.trim="profile.first_name"
										placeholder="First name"
									/>
									<ErrorText
										v-if="error.first_name"
										:title="error.first_name"
									/>
								</div>
							</div>
							<div class="col">
								<div class="form-group mb-3">
									<input
										type="text"
										:class="[
											'form-control',
											error.last_name ? 'error-border' : '',
										]"
										v-model.trim="profile.last_name"
										placeholder="Last name"
									/>
									<ErrorText v-if="error.last_name" :title="error.last_name" />
								</div>
							</div>
						</div>
					</div>
					<div class="col-12">
						<div class="form-group mb-3">
							<input
								type="email"
								:class="['form-control', error.email ? 'error-border' : '']"
								v-model.trim="profile.email"
								placeholder="Email"
							/>
							<ErrorText v-if="error.email" :title="error.email" />
						</div>
					</div>
					<div class="col-12">
						<div class="form-group mb-3">
							<input
								type="text"
								:class="[
									'form-control',
									error.phone_number ? 'error-border' : '',
								]"
								v-model.trim="profile.phone_number"
								placeholder="Phone Number"
							/>
							<ErrorText
								v-if="error.phone_number"
								:title="error.phone_number"
							/>
						</div>
					</div>
					<!-- <div class="col-12 mb-4">
						<div class="form-group">
							<textarea
								:class="['form-control', error.address ? 'error-border' : '']"
								cols="30"
								rows="6"
								v-model.trim="profile.address"
								placeholder="Full Address"
							></textarea>
							<ErrorText v-if="error.address" :title="error.address" />
						</div>
					</div> -->

					<div class="col-12">
						<button type="submit" class="box-btn">
							Update Profile <i class="ri-arrow-right-line"></i>
						</button>
					</div>
				</div>
			</form>
		</div>
		<LoaderOverlay v-if="loading" />
	</div>
</template>



<script>
import ErrorText from "~/components/Error/Text";
import LoaderOverlay from "~/components/Loader/CircleOverlay";

export default {
	components: { ErrorText, LoaderOverlay },

	data() {
		return {
			profile: {
				first_name: "",
				last_name: "",
				email: "",
				phone_number: "",
				// address: "",
			},
			error: {
				first_name: false,
				last_name: false,
				email: false,
				phone_number: false,
				// address: false,
			},
			loading: false,
			reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
		};
	},
	methods: {
		async checkProfile() {
			this.error = {
				first_name: false,
				last_name: false,
				email: false,
				phone_number: false,
				// address: false,
			};
			if (this.profile.first_name == "") {
				this.error.first_name = "First name is required!";
				return;
			}
			if (this.profile.last_name == "") {
				this.error.last_name = "Last name is required!";
				return;
			}

			if (this.profile.email == "") {
				this.error.email = "Email is required!";
				return;
			}
			if (!this.reg.test(this.profile.email)) {
				this.error.email = "Email is invalid";
				return;
			}
			if (this.profile.phone_number == "") {
				this.error.phone_number = "Phone number is required!";
				return;
			}
			// if (this.profile.address == "") {
			// 	this.error.address = "Address is required!";
			// 	return;
			// }

			this.loading = true;
			const res = await this.callApi(
				"post",
				"/api/profile/update",
				this.profile
			);
			if (res.status == 200) {
				this.s("Profile updated successfully.");
			} else {
				this.swr();
			}

			this.loading = false;
		},
	},

	created() {
		this.profile.first_name = this.authUser.first_name;
		this.profile.last_name = this.authUser.last_name;
		this.profile.email = this.authUser.email;
		this.profile.phone_number = this.authUser.mobile;
	},
};
</script>