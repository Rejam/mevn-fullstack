<template>
  <v-layout row wrap>
    <v-flex xs4 v-for='movie in movies' :key='movie._id'>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn flat v-bind:to="`/movies/${movie._id}`">
                {{movie.name}}
              </v-btn>
            </div>
            <span class='grey--text'>{{movie.release_year}} - {{movie.genre}}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{movie.desc}}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Movies',
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      return axios({
        method: 'get',
        url: 'http://localhost:8081/movies',
      }).then((res) => {
        this.movies = res.data.movies;
      }).catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
#inspire {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.container.fill-height {
  align-items: normal;
}
a.side_bar_link {
  text-decoration: none;
}
.card__title--primary, .card__text {
  text-align: left;
}
.card {
  height: 100% !important;
}
</style>
