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
            requiresAuth: false
        }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            requiresAuth: false
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
        if (!store.getters.isAuthenticated) {
            next({
                path: "/login"
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
