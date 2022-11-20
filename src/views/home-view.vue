<template>
  <div class="HomeView">
    <div class="d-flex justify-center">
      <v-row>
        <v-col
          v-for="(film, index) in films"
          class="align-self-center"
          :cols="4"
          :key="index"
        >
          <film-card class="pa-4" :film="film" />
        </v-col>
      </v-row>
    </div>
    <div
      v-if="films.length"
      class="d-flex justify-center align-center inter-regular"
    >
      <v-btn v-if="page > 2" color="grey-darken-1" icon @click="submit(1)">
        <v-icon>mdi-page-first</v-icon>
      </v-btn>

      <v-btn
        color="grey-darken-1"
        :disable="page === 1"
        icon
        @click="submit(page - 1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <span>{{ `${page} of ${totalPages}` }}</span>

      <v-btn
        color="grey-darken-1"
        :disable="page === totalPages"
        icon
        @click="submit(page + 1)"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-btn
        v-if="totalPages > 2"
        color="grey-darken-1"
        :disable="page === totalPages"
        icon
        @click="submit(totalPages)"
      >
        <v-icon>mdi-page-last</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import filmCard from "@/components/film-card.vue";
import http from "@/config/axios";
export default {
  components: { filmCard },
  name: "HomeView",
  props: {
    filmList: [],
  },
  data() {
    return {
      films: [],
      page: 1,
      totalPages: 0,
    };
  },
  methods: {
    submit(val) {
      this.films.params.page = val;
      const params = this.films.params;

      http
        .get("", { params: this.films.params })
        .then((response) => {
          if (response.data.Response === "True") {
            this.films = response.data.Search;
            this.films.params = params;
            this.page = val;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calculateTotalPages() {
      this.totalPages = Math.ceil(Number(this.films.totalResults) / 10);
    },
  },
  watch: {
    filmList(val) {
      this.films = val;
      this.calculateTotalPages();
    },
  },
};
</script>
