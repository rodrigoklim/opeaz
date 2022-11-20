<template>
  <div class="MainLayout">
    <v-app-bar app color="white" dark>
      <div class="d-flex flex-row align-center justify-space-between">
        <v-img
          alt="Opeaz Logo"
          class="shrink mr-4"
          contain
          src="../assets/img/opeaz_blue.png"
          transition="scale-transition"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn
        class="inter-regular rounded-lg"
        target="_blank"
        text
        style="background-color: #1f3457"
        @click="openDrawer = !openDrawer"
      >
        <v-icon>mdi-movie-open-star</v-icon>
        <span class="mx-4">My favorites</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      class="mt-5"
      v-model="searchDrawer"
      absolute
      floating
      style="width: 50%"
    >
      <div class="ma-16 pa-8 inter-bold" style="font-size: 4rem">
        <div class="d-flex flex-row">
          <v-icon color="primary" size="200">mdi-magnify</v-icon>
          <div class="d-flex flex-column">
            <div class="self-bottom" style="font-size: 3rem">Search by</div>
            <div
              class="secondary--text"
              style="font-size: 8rem; line-height: 8rem"
            >
              Title
            </div>
          </div>
        </div>
        <v-text-field
          flat
          solo
          class="pa-2 pt-3 mt-6 inter-regular elevation-3 rounded-pill"
          :messages="
            errorMessage ? errorMessage : 'Enter the film you want to search'
          "
          name="film"
          v-model="searchedTitle"
          :loading="loading"
          style="width: 100%; font-size: 1.5rem"
          @keyup.enter="searchFilm"
        >
          <v-icon
            class="pa-2 inter-regular"
            slot="prepend"
            color="gray lighten-3"
            size="40"
            @click="searchFilm"
          >
            mdi-magnify
          </v-icon>
        </v-text-field>
      </div>
    </v-navigation-drawer>
    <v-navigation-drawer
      class="mt-5"
      v-model="openDrawer"
      absolute
      bottom
      right
      elevation="5"
      width="400"
    >
      <div
        class="flex inter-bold pt-15 pl-4 text-bold"
        style="background-color: #3979f2; color: white; font-size: larger"
      >
        My Favorites
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style="transform: rotate(180deg)"
      >
        <path
          fill="#3979f2"
          fill-opacity="1"
          d="M0,32L48,69.3C96,107,192,181,288,176C384,171,480,85,576,58.7C672,32,768,64,864,90.7C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <v-list three-line>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <favorite-item
            v-for="(item, index) in favorites"
            :favorite="item"
            :key="index"
          />
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view :filmList="filmList" />
    </v-main>
  </div>
</template>

<script>
import http from "@/config/axios";
import favoriteItem from "@/components/favorite-item.vue";
import { mapGetters } from "vuex";
export default {
  components: { favoriteItem },
  name: "MainLayout",
  data() {
    return {
      searchDrawer: true,
      group: null,
      apikey: "5494867f",
      filmList: [],
      loading: false,
      showList: false,
      searchedTitle: "",
      errorMessage: "",
      openDrawer: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.searchDrawer = true;
    });
  },
  methods: {
    searchFilm() {
      this.loading = true;
      this.errorMessage = "";

      let data = {
        s: this.searchedTitle,
      };

      http
        .get("", { params: data })
        .then((response) => {
          if (response.data.Response === "True") {
            this.searchDrawer = false;
            this.filmList = response.data.Search;
            this.filmList.params = data;
            this.filmList.totalResults = response.data.totalResults;
            return;
          }
          this.searchedTitle = "";
          this.errorMessage = response.data.Error ?? "";
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    ...mapGetters(["favorites", "openFavorites"]),
  },
  watch: {
    openFavorites(val) {
      if (!this.openDrawer) {
        this.openDrawer = true;
      }
      return val;
    },
  },
};
</script>
