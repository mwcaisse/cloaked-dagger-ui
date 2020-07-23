import Vue from 'vue'
import Vuex from 'vuex'

import { UserService } from "@app/services/ApplicationProxy.js"

const userService = new UserService();

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authenticated: false,
        status: "logged_out"
    },
    getters: {
        isAuthenticated: state =>  state.authenticated,
        status: state => status
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
        }
    },
    actions: {
        login ({commit, dispatch}, {username, password}) {
            return new Promise((resolve, reject) => {
                commit("authRequest");

                userService.login(username, password).then(
                    res => {
                        commit("authSuccessful");
                        resolve(res);
                    },
                    err => {
                        commit("authError");
                        reject(err);
                    }
                )
            });
        },
        logout({commit, dispatch}) {
            return new Promise((resolve, reject) => {
               userService.logout().then(
                    res => {
                        commit("authLogout")
                        resolve(res);
                   },
                   err => {
                        reject(err);
                   }
               )
            });
        }
    },
    modules: {
    }
})
