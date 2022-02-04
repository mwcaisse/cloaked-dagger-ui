import Vue from "vue"
import Vuex from "vuex"

import router from "@app/router"

import {UserService} from "@app/services/ApplicationProxy.js"
import {ADDITIONAL_ACTIONS, AUTHENTICATION_STATUS} from "@app/services/Constants.js";

const userService = new UserService();

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authenticationStatus: AUTHENTICATION_STATUS.UNKNOWN,
        currentUser: null,
        additionalAction: null
    },
    getters: {
        authenticationStatus: state => state.authenticationStatus,
        isAuthenticated: state => state.authenticationStatus === AUTHENTICATION_STATUS.AUTHENTICATED,
        currentUser: state => state.currentUser,
        additionalAction: state => state.additionalAction
    },
    mutations: {
        authSuccessful(state) {
            state.authenticationStatus = AUTHENTICATION_STATUS.AUTHENTICATED;
            state.additionalAction = null;
        },
        authPartial(state, additionalAction) {
            state.authenticationStatus = AUTHENTICATION_STATUS.PARTIAL;
            state.additionalAction = additionalAction;
        },
        authError(state) {
            state.authenticationStatus = AUTHENTICATION_STATUS.UNAUTHENTICATED;
        },
        authLogout(state) {
            state.authenticationStatus = AUTHENTICATION_STATUS.UNAUTHENTICATED;
            state.currentUser = null;
            state.additionalAction = null;
        },
        updateCurrentUser(state, user) {
            state.currentUser = user;
        },
        emailVerificationSuccessful(state) {
            state.additionalAction = null;
            state.authenticationStatus = AUTHENTICATION_STATUS.AUTHENTICATED;
        }
    },
    actions: {
        login ({commit, dispatch}, {username, password}) {
            return new Promise((resolve, reject) => {
                userService.login(username, password).then(
                    res => {
                        if (res.emailVerificationRequired) {
                            commit("authPartial", ADDITIONAL_ACTIONS.EMAIL_VERIFICATION);
                        }
                        else {
                            commit("authSuccessful");
                        }
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
            return userService.me().then(
                res => {
                    if (res.additionalActions && res.additionalActions.emailVerificationRequired) {
                        commit("authPartial", ADDITIONAL_ACTIONS.EMAIL_VERIFICATION);
                    }
                    else {
                        commit("authSuccessful");
                    }
                    commit("updateCurrentUser", res);
                    return res;
                },
                err => {
                    commit("authError");
                    throw err;
                }
            );

        },
        validateEmailAddress({commit}, verificationKey) {
            return new Promise((resolve, reject) => {
                userService.verifyEmail(verificationKey).then(
                    res => {
                        commit("emailVerificationSuccessful");
                        resolve(res)
                    },
                    err => {
                        reject(err);
                    }
                );
            });
        }
    },
    modules: {
    }
})
