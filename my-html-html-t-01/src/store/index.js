//该文件用于创建Vuex中最为核心的store
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
import treeDrag from "./treeDrag";
import expDrag from "./expDrag";
import apiConfig from "./apiConfig";

//应用Vuex插件
Vue.use(Vuex);

//创建并暴露store
export default new Vuex.Store({
  modules: {
    treeDrag: treeDrag,
    expDrag: expDrag,
    apiConfig: apiConfig,
  },
});
