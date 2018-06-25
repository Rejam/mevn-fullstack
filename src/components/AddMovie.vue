<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Movie Name"
      v-model="movie.name"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      name="input-7-1"
      label="Movie Description"
      v-model="movie.desc"
      multi-line
    ></v-text-field>
    <v-select
      label="Movie Release Year"
      v-model="movie.release_year"
      required
      :rules="releaseRules"
      :items="years"
    ></v-select>
    <v-text-field
      label="Movie Genre"
      v-model="movie.genre"
      required
      :rules="genreRules"
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    movie: {
      name: '',
      desc: '',
      genre: '',
      release_year: '',
    },
    nameRules: [
      v => !!v || 'Movie name is required',
    ],
    releaseRules: [
      v => !!v || 'Movie release year is rquired',
    ],
    genreRules: [
      v => !!v || 'Movie genre is required',
      v => (v && v.length <= 80) || 'Genre must be less than 80 characters',
    ],
    select: null,
    years: [
      '2018',
      '2017',
      '2016',
      '2015',
    ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: this.movie,
          url: '/movies',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(() => {
          this.$swal(
            'Great!',
            'Movie added successfully!',
            'success',
          );
          this.$router.push({ name: 'Home' });
          this.$refs.form.reset();
        }).catch(() => {
          this.$swal(
            'Oh oo!',
            'Could not add the movie!',
            'error',
          );
        });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
