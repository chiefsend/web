import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/privacy",
    name: "Privacy",
    component: () =>
      import(/* webpackChunkName: "text" */ "@/views/Privacy.vue")
  },
  {
    path: "/imprint",
    name: "Imprint",
    component: () =>
      import(/* webpackChunkName: "text" */ "@/views/Imprint.vue")
  },
  {
    path: "/upload",
    name: "Upload",
    component: () =>
      import(/* webpackChunkName: "upload" */ "@/views/Upload.vue")
  },
  {
    path: "/download/:id",
    alias: "/d/:id",
    name: "Download",
    component: () =>
      import(/* webpackChunkName: "download" */ "@/views/Download.vue")
  },
  {
    path: "/public",
    name: "Public",
    component: () =>
      import(/* webpackChunkName: "download" */ "@/views/Public.vue")
  },
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "upload" */ "@/views/Home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
