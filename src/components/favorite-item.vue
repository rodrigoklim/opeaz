<template>
  <div class="FavoriteItem">
    <v-list-item>
      <v-list-item-avatar tile square size="80">
        <v-img :src="favorite.Poster" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <span class="inter-regular" v-html="favorite.Title" />
        </v-list-item-title>
        <v-list-item-subtitle>
          <div class="d-flex flex-row">
            <v-rating
              background-color="orange lighten-3"
              color="orange"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              length="5"
              size="20"
              :value="favorite.rate"
              @input="rateMovie"
            />
            <v-spacer></v-spacer>
            <v-icon color="red" @click="removeFavorite">
              mdi-trash-can-outline
            </v-icon>
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider inset />
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "FavoriteItem",
  props: {
    favorite: Object,
  },
  data() {
    return {};
  },
  methods: {
    rateMovie(val) {
      const data = {
        rate: val,
        item: this.favorite,
      };

      store.dispatch("addRateToMovie", data);
    },
    removeFavorite(val) {
      store.dispatch("removeFilmFromFavorite", val);
    },
  },
};
</script>
