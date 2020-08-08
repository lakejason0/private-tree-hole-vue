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
    icon: "home"
  },
  {
    path: "/about",
    name: i18n.t('navigation.about'),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) fora this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    icon: "information"
  },
  {
    path: "/thread",
    name: i18n.t('navigation.thread'),
    component: () => import("../views/GetThread.vue"),
    icon: "forum"
  }
];

const router = new VueRouter({
  routes
});

export default router;

export {routes};