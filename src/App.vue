<template>
  <div id="app">
    <v-app id="treehole">
      <v-navigation-drawer app temporary v-model="drawer">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{$t('navigation.title')}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{$t('navigation.subtitle')}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list nav>
          <v-list-item v-for="route in navigationRoutes" :key="route.name" :to="{path: route.path}">
            <v-list-item-action>
              <v-icon>mdi-{{ route.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app clipped-left color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t('appBar.title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu>
          <template v-slot:activator="{ on , attrs }">
            <v-btn icon v-bind=attrs v-on="on" >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Test</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import { routes, navigationRoutes } from "./router";
export default {
  data(){
    return {
      routes,
      navigationRoutes,
      drawer: false
    }
  }
};
</script>
