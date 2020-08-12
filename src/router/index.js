import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@app/views/Login.vue"
import Register from "@app/views/Register.vue"
import Home from "@app/views/Home.vue"
import AdminHome from "@app/views/Admin/Home.vue"
import AdminCreateClient from "@app/views/Admin/CreateClient.vue"

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
            //TODO: Removing this for now, to test out the OpenID login flow
            //  Will need to revisit this later, should be a better way of determining if auth'd or not
            //requiresNoAuth: true
        },
        props(route) {
            const props = { ... route.params};

            //TODO: I'm guessing this is case sensitive
            console.log("Logging in with returnUrl: " + route.query.ReturnUrl);
            props.returnUrl = route.query.ReturnUrl;

            return props;
        }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            requiresAuth: false,
            //requiresNoAuth: true
        }
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminHome,
        meta: {
            requiresAuth: false,
            layout: "admin"
        }
    },
    {
        path: "/admin/client/new",
        name: "admin-create-client",
        component: AdminCreateClient,
        meta: {
            requiresAuth: false,
            layout: "admin"
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
