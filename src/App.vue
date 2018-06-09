<template>
  <v-app id='inspire'>

    <!-- Nav drawer -->
    <v-navigation-drawer fixed v-model='drawer' app>
      <v-list dense>
        <router-link :to="{ name: 'Home' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Home</v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link :to="{ name: 'Contact' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>Contact</v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <!-- Top toolbar -->
    <v-toolbar color='indigo' dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
      <v-toolbar-title>Home</v-toolbar-title>
    </v-toolbar>

    <!-- Main content -->
    <v-content>
      <v-container fluid>
        <div id="app">
          <router-view></router-view>
        </div>
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer color='indigo' app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
  props: {
    source: String,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
