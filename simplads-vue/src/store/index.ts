import Vue from "vue";
import Vuex from "vuex";
import { Ads } from "../api/ads";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    advertisements: [
      {
        id: 1,
        title: "Lemon Juice",
        category: "Drink",
        price: "500$",
        image: "lemonjuice.jpg",
        status: "Active",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      },
      {
        id: 2,
        title: "Coca Cola",
        category: "Drink",
        price: "1k$",
        image: "cocacola.jpg",
        status: "Active",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      },
      {
        id: 3,
        title: "Lemon Juice",
        category: "Drink",
        price: "500$",
        image: "hildegard.org",
        status: "Pending",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      },
      {
        id: 4,
        title: "Pencil",
        category: "Pen & Pencil",
        price: "2000$",
        image: "pencil.jpg",
        status: "Pending",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      },
      {
        id: 5,
        title: "Chewing Gum",
        category: "Drink",
        price: "20$",
        image: "chewing-gum.jpg",
        status: "Active",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      }
    ]
  },
  mutations: {
    setAdsList(state, adsList) {
      state.advertisements = adsList;
    },
    addNewAds(state, newAds) {
      state.advertisements.push(newAds);
    }
  },
  actions: {
    async getAds({ commit }) {
      const adsList = await new Ads().getAllAds();
      commit("setAdsList", adsList);
    },
    async createNewAds({ commit }, ads) {
      const adsService = new Ads();
      const result = await adsService.createNewAds(ads);
      await adsService.uploadAds(result.data._id, ads.uploadImage);
      commit("addNewAds", ads);
    }
  },
  modules: {}
});
