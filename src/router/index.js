import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@app/views/Login.vue"
import Register from "@app/views/Register.vue"
import Home from "@app/views/Home.vue"

import store from "@app/store"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            requiresAuth: false,
            requiresNoAuth: true
        }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            requiresAuth: false,
            requiresNoAuth: true
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("Trying to navigate to a page that requires auth: " + store.getters.isAuthenticated)
        if (!store.getters.isAuthenticated) {
            next({
                path: "/login"
            });
        }
        else {
            next();
        }
    }
    else if (to.matched.some(record => record.meta.requiresNoAuth)) {
        console.log("Trying to navigate to a page that requires no auth: " + store.getters.isAuthenticated)
        if (store.getters.isAuthenticated) {
            next({
                path: "/"
            });
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});

export default router
