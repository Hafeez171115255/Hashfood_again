<template>
	<div class="light-box loading-overlays">
		<div class="container">
			<div class="main-content">
				<span @click="close" class="close cursor" onclick="closeModal()"
					>&times;</span
				>

				<div v-if="imageArray[imindex]" class="mySlides">
					<img :src="backOfficeURL + imageArray[imindex]" class="hover-shadow" />
				</div>

				<a @click="gotLeft" class="prev">&#10094;</a>
				<a @click="gotRight" class="next">&#10095;</a>

				<div class="row " >
					<div v-for="(item, index) in imageArray" :key="index"  class="thumbnail-container col-2">
						<div @click="changeIndex(index)" class="thumbnail">
							<img :src="backOfficeURL + item"  />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["imageArray", "imgIndex"],

	data() {
		return {
			imindex: -1,
		};
	},

	created() {
		this.imindex = this.imgIndex;
	},

	methods: {
		changeIndex(index) {
			this.imindex = index;
			this.$set(this, "imindex", index);
		},

		close() {
			this.$emit("closeBox", -1);
		},

		gotLeft() {
			let index = this.imindex;
			if (this.imindex == 0) {
				index = this.imageArray.length - 1;
				this.$set(this, "imindex", index);
				return;
			}
			index -= 1;
			this.$set(this, "imindex", index);
		},
		gotRight() {
			let index = this.imindex;
			if (this.imindex == this.imageArray.length - 1) {
				index = 0;
				this.$set(this, "imindex", index);
				return;
			}
			index += 1;
			this.$set(this, "imindex", index);
		},
	},
};
</script>