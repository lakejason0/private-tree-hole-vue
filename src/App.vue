<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app clipped>
        <v-list>
          <v-list-item v-for="i in routes" :key="i" :to="{path: i.path}">
            <v-list-item-action>
              <v-icon>mdi-{{ i.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>i.name</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app clipped-left>
        <v-toolbar-title>App Bar</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </v-container>
      </v-main>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
import { routes } from "./router";
export default {
  data(){
    return {
      routes
    }
  }
};
</script>
