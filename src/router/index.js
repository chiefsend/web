import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/upload",
    name: "Upload",
    component: () => import("@/views/Upload.vue")
  },
  {
    path: "/download/:id",
    name: "Download",
    component: () => import("@/views/Download.vue")
  },
  {
    path: "/public",
    name: "Public",
    component: () => import("@/views/Public.vue")
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
