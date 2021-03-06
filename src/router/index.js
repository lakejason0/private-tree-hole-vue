import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "navigation.home",
    component: () => import("../views/Home.vue"),
    icon: "home",
    showAtNavigation: true
  },
  {
    path: "/thread",
    name: "navigation.thread",
    component: () => import("../views/GetThread.vue"),
    icon: "forum",
    showAtNavigation: true
  },
  {
    path: "/thread/:threadID",
    name: "threadPage",
    component: () => import("../views/Thread.vue"),
    icon: "forum",
    showAtNavigation: false
  },
  {
    path: "/public",
    name: "navigation.public",
    component: () => import("../views/Public.vue"),
    icon: "post",
    showAtNavigation: true
  },
  {
    path: "/about",
    name: "navigation.about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) fora this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    icon: "information",
    showAtNavigation: true
  },
  {
    path: "/user",
    name: "navigation.user",
    component: () => import("../views/User.vue"),
    icon: "account",
    showAtNavigation: true
  }
];

const navigationRoutes = routes.filter(route => route.showAtNavigation);

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;

export { routes };

export { navigationRoutes };
