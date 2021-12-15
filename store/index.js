import cookie from "cookie";
export const strict = false;

export const state = () => ({
  authUser: false,
  baseURL: "",
  backOfficeURL: "",
  categoryArray: [],
  brands: [],
  carts: [],
  cartLength: 0,
  wishlistLength: 0,
  shipping: [],
  order: {}
});

// common getters
export const getters = {
  getAuthUser(state) {
    return state.authUser;
  },

  getBaseURL(state) {
    return state.baseURL;
  },

  getBackOfficeURL(state) {
    return state.backOfficeURL;
  },

  getCategories(state) {
    return state.categoryArray;
  },

  getBrands(state) {
    return state.brands;
  },

  getCartLength(state) {
    return state.cartLength;
  },

  getWishlistLength(state) {
    return state.wishlistLength;
  },

  getCarts(state) {
    return state.carts;
  },

  getShipping(state) {
    return state.shipping;
  },

  getOrder(state) {
    return state.order
  }
};

// mutations for changing data from action
export const mutations = {
  updateAuthUser(state, user) {
    state.authUser = user;
  },

  setBaseURL(state, data) {
    state.baseURL = data;
  },

  setBackOfficeURL(state, data) {
    state.backOfficeURL = data;
  },

  setCategories(state, data) {
    state.categoryArray = data;
  },

  setBrands(state, data) {
    state.brands = data;
  },

  setCartLength(state, data) {
    state.cartLength = data;
  },

  incrementCartLength(state, data) {
    state.cartLength += data;
  },

  decrementCartLength(state, data) {
    state.cartLength -= data;
  },

  setWishlistLength(state, data) {
    state.wishlistLength = data;
  },

  icrementWishlistLength(state, data) {
    state.wishlistLength += data;
  },

  decrementWishlistLength(state, data) {
    state.wishlistLength -= data;
  },

  setCarts(state, data) {
    state.carts = data;
  },

  setShipping(state, data) {
    state.shipping = data;
  },

  setOrder(state, data) {
    state.order = data
  }
};

// actionns for commiting mutations
export const actions = {
  async nuxtServerInit({ commit, state }, { $axios, req, env }) {
    // commit("setBaseURL", process.env.BASE_URL);
    // commit("setBackOfficeURL", process.env.BACKOFFICE_URL);

    // try {
    //   let { data } = await $axios.get(
    //     `${process.env.BASE_URL}/api/auth/initData`
    //   );
    //   console.log('sfdsd',data)
    //   if (data && data.user) {
    //     commit("updateAuthUser", data.user);
    //     commit("setCartLength", data.totalCartItems);
    //     commit("setWishlistLength", data.totalWishlistItems);
    //   }
    // } catch (e) { }
  }
};
