<template>
  <div class="FilmCard">
    <v-card class="mx-auto my-12" max-width="400" v-if="film">
      <v-img height="300" :src="film.Poster"></v-img>

      <v-card-title v-html="film.Title" />

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="grey--text ms-4">
            {{ `${film.Year} • ${film.Type} • #${film.imdbID}` }}
          </div>
        </v-row>
      </v-card-text>

      <v-divider class="my-6" />
      <v-card-actions>
        <v-btn color="secondary" text @click="favorite(film)">
          <v-icon color="red" class="mr-4">mdi-cards-heart-outline</v-icon>
          Favorite
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "FilmCard",
  props: {
    film: Object,
  },
  data() {
    return {};
  },
  methods: {
    favorite(val) {
      store.dispatch("addFilmToFavorite", val);
    },
  },
};
</script>

<style></style>
