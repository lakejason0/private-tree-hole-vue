<template>
  <div id="app">
    <v-app id="treehole">
      <v-navigation-drawer app temporary v-model="drawer">
        <v-list nav>
          <v-list-item v-for="i in routes" :key="i" :to="{path: i.path}">
            <v-list-item-action>
              <v-icon>mdi-{{ i.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ i.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t('appBar.title') }}</v-toolbar-title>
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
      routes,
      drawer: false
    }
  }
};
</script>
