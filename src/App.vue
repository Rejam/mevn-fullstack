<template>
  <v-app id="inspire">

    <v-navigation-drawer
    fixed
    v-model="drawer"
    app
    >
      <v-list dense>

        <router-link v-bind:to="{ name: 'Home' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Home</v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link v-bind:to="{ name: 'Contact' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Contact</v-list-tile-content>
          </v-list-tile>
        </router-link>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
      <v-toolbar-title>Movie App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          id='add_movie_link'
          v-bind:to="{ name: 'AddMovie' }"
          v-if='current_user'
        >Add Movie</v-btn>
        <v-btn
          flat
          id='user_email'
          v-if='current_user'
        >{{current_user.email}}</v-btn>
        <v-btn
          flat
          id='register_btn'
          v-bind:to='{ name: "Register" }'
          v-if='!current_user'
        >Register</v-btn>
        <v-btn
          flat
          id='login_btn'
          v-bind:to='{ name: "Login" }'
          v-if='!current_user'
        >Login</v-btn>
        <v-btn
          flat
          id='logout_btn'
          v-if='current_user'
          @click='logout'
        >Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <div id="app">
          <router-view/>
        </div>
      </v-container>
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>

  </v-app>
</template>

<script>
import axios from 'axios';
import bus from './bus';

export default {
  data: () => ({
    drawer: null,
    current_user: null,
  }),
  props: {
    source: String,
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
  },
  methods: {
    listenToEvents() {
      bus.$on('refreshUser', () => {
        this.fetchUser();
      });
    },
    async fetchUser() {
      return axios({
        method: 'get',
        url: '/api/current_user',
      }).then((res) => {
        this.current_user = res.data.current_user;
      }).catch(() => {});
    },
    logout() {
      return axios({
        method: 'get',
        url: '/api/logout',
      }).then(() => {
        bus.$emit('refreshUser');
        this.$router.push({ name: 'Home' });
      }).catch(() => {});
    },
  },
};
</script>
