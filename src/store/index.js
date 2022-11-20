import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: [],
    openFavorites: false,
  },
  getters: {
    favorites: (state) => state.favorites,
    openFavorites: (state) => state.openFavorites,
  },
  mutations: {
    ADD_FAVORITE(state, value) {
      const selectedIndex = state.favorites.findIndex(
        (item) => item.imdbID == value.imdbID
      );

      if (selectedIndex !== -1) {
        return;
      }

      state.favorites.push(value);
      state.openFavorites = !state.openFavorites;
    },
    REMOVE_FAVORITE(state, value) {
      const selectedIndex = state.favorites.findIndex(
        (item) => item.imdbID == value.imdbID
      );

      state.favorites.splice(selectedIndex, 1);
    },
    RATE_MOVIE(state, value) {
      const selectedIndex = state.favorites.findIndex(
        (item) => item.imdbID == value.item.imdbID
      );
      state.favorites[selectedIndex].rate = value.rate;
    },
    OPEN_FAVORITES_DRAWER(state) {
      state.openFavorites = !state.openFavorites;
    },
  },
  actions: {
    addFilmToFavorite(context, payload) {
      context.commit("ADD_FAVORITE", payload);
    },
    removeFilmFromFavorite(context, payload) {
      context.commit("REMOVE_FAVORITE", payload);
    },
    addRateToMovie(context, payload) {
      context.commit("RATE_MOVIE", payload);
    },
    openDrawer(context) {
      context.commit("OPEN_FAVORITES_DRAWER");
    },
  },
  modules: {},
});
