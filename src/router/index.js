import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import i18n from "../i18n";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: i18n.t('navigation.home'),
    component: Home,
    icon: "home",
    showAtNavigation: true
  },
  {
    path: "/about",
    name: i18n.t('navigation.about'),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) fora this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    icon: "information",
    showAtNavigation: true
  },
  {
    path: "/thread",
    name: i18n.t('navigation.thread'),
    component: () => import("../views/GetThread.vue"),
    icon: "forum",
    showAtNavigation: true
  },
  {
    path: "/thread/:threadUID",
    name: "threadPage",
    component: () => import("../views/Thread.vue"),
    icon: "forum",
    showAtNavigation: false
  }
];

const navigationRoutes = routes.filter( route => route.showAtNavigation )

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;

export {routes};

export {navigationRoutes};