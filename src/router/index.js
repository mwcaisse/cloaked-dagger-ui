import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@app/views/Login.vue"
import Register from "@app/views/Register.vue"
import Home from "@app/views/Home.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
