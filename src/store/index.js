import Vue from "vue"
import Vuex from "vuex"

import router from "@app/router"

import {UserService} from "@app/services/ApplicationProxy.js"

const userService = new UserService();

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authenticated: true,
        status: "logged_in",
        currentUser: null
    },
    getters: {
        isAuthenticated: state => state.authenticated,
        status: state => state.status,
        currentUser: state => state.currentUser
    },
    mutations: {
        authRequest(state) {
            state.status = "in_progress";
        },
        authSuccessful(state) {
            state.authenticated = true;
            state.status = "success";
        },
        authError(state) {
            state.authenticated = false;
            state.status = "error";
        },
        authLogout(state) {
            state.authenticated = false;
            state.status = "logged_out";
            state.currentUser = null;
        },
        updateCurrentUser(state, user) {
            state.currentUser = user;
        }
    },
    actions: {
        login ({commit, dispatch}, {username, password}) {
            return new Promise((resolve, reject) => {
                commit("authRequest");

                userService.login(username, password).then(
                    res => {
                        commit("authSuccessful");
                        dispatch("fetchCurrentUser");
                        resolve(res);
                    },
                    err => {
                        commit("authError");
                        reject(err);
                    }
                )
            });
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                userService.logout().then(
                    res => {
                        commit("authLogout")
                        router.push({
                            name: "login"
                        });
                        resolve(res);
                    },
                    err => {
                        reject(err);
                    }
                )
            });
        },
        fetchCurrentUser({commit}) {
            return new Promise(resolve => {
                userService.me().then(res => {
                    commit("updateCurrentUser", res);
                    resolve(res);
                });
            });
        }
    },
    modules: {
    }
})
