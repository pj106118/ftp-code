export default {
  namespaced: true,
  actions: {},
  mutations: {
    ApiConfigSetApiName(state, value) {
      state.currentApiName = value.apiName;
      state.currentApiDesc = value.apiDesc;
    },
  },
  state: {
    currentApiName: null,
    currentApiDesc: null,
  },
  getters: {},
};
