import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@app/views/Login.vue"
import Register from "@app/views/Register.vue"
import EmailVerification from "@app/views/EmailVerification.vue";

import Home from "@app/views/Home.vue"
import AdminHome from "@app/views/Admin/Home.vue"
import AdminCreateClient from "@app/views/Admin/CreateClient.vue"
import AdminEditClient from "@app/views/Admin/EditClient.vue"
import AdminClients from "@app/views/Admin/Clients.vue"
import AdminResources from "@app/views/Admin/Resources.vue"
import AdminEditResource from "@app/views/Admin/EditResource.vue"
import UserRegistrationKeys from "@app/views/Admin/UserRegistrationKeys.vue";

import store from "@app/store"
import {ADDITIONAL_ACTIONS, AUTHENTICATION_STATUS} from "@app/services/Constants.js";


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

            //This is case-sensitive
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
        path: "/email-verification",
        name: "email-verification",
        component: EmailVerification,
        meta: {
            requiresAuth: false,
            requiresNoAuth: false
        },
        props(route) {
            return {...route.params, ...route.query};
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

    /*
     * if our authentication status is unknown, then don't do anything / prevent navigation
     * re-navigation will occur once we know if we are authed or not.
     */
    const authStatus = store.getters.authenticationStatus;
    if (authStatus === null || authStatus === AUTHENTICATION_STATUS.UNKNOWN)
    {
        next();
        return;
    }
    //TODO: Handle the case where authentication is unknown better
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            if (store.getters.additionalAction === ADDITIONAL_ACTIONS.EMAIL_VERIFICATION) {
                //if the additional action is email verification, let's go there
                next({
                    path: "/email-verification"
                });
            }
            else {
                //otherwise, we goto the login page to authenticate
                next({
                    path: "/login"
                });
            }
        }
        else {
            next();
        }
    }
    else if (to.matched.some(record => record.meta.requiresNoAuth)) {
        if (store.getters.isAuthenticated !== null && store.getters.isAuthenticated) {
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
