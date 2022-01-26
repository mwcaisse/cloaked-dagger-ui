import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@app/views/Login.vue"
import Register from "@app/views/Register.vue"
import Home from "@app/views/Home.vue"
import AdminHome from "@app/views/Admin/Home.vue"
import AdminCreateClient from "@app/views/Admin/CreateClient.vue"
import AdminEditClient from "@app/views/Admin/EditClient.vue"
import AdminClients from "@app/views/Admin/Clients.vue"
import AdminResources from "@app/views/Admin/Resources.vue"
import AdminEditResource from "@app/views/Admin/EditResource.vue"
import UserRegistrationKeys from "@app/views/Admin/UserRegistrationKeys.vue";

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
            //requiresNoAuth: true // this is causing double redirects on the login page.. Better way to do this?
        },
        props(route) {
            const props = {...route.params};

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
            requiresNoAuth: true
        }
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminHome,
        meta: {
            requiresAuth: true,
            layout: "admin"
        }
    },
    {
        path: "/admin/client/",
        name: "admin-clients",
        component: AdminClients,
        meta: {
            requiresAuth: true,
            layout: "admin"
        }
    },
    {
        path: "/admin/client/new",
        name: "admin-client-create",
        component: AdminCreateClient,
        meta: {
            requiresAuth: true,
            layout: "admin"
        }
    },
    {
        path: "/admin/client/:id",
        name: "admin-client-edit",
        component: AdminEditClient,
        meta: {
            requiresAuth: true,
            layout: "admin"
        },
        props: true
    },
    {
        path: "/admin/resource/",
        name: "admin-resources",
        component: AdminResources,
        meta: {
            requiresAuth: true,
            layout: "admin"
        }
    },
    {
        path: "/admin/resource/new",
        name: "admin-resource-create",
        component: AdminEditResource,
        meta: {
            requiresAuth: true,
            layout: "admin"
        }
    },
    {
        path: "/admin/resource/:id",
        name: "admin-resource-edit",
        component: AdminEditResource,
        meta: {
            requiresAuth: true,
            layout: "admin"
        },
        props: true
    },
    {
        path: "/admin/user/registration-keys/",
        name: "admin-user-registration-keys",
        component: UserRegistrationKeys,
        meta: {
            requiresAuth: true,
            layout: "admin"
        },
        props: true
    }
];

const router = new VueRouter({
    mode: "history",
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
