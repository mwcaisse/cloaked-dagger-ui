<template>
    <div id="app">
        <nav
            class="navbar is-dark"
            role="navigation"
        >
            <div class="navbar-brand">
                <router-link
                    :to="{ name: 'home' }"
                    class="navbar-item"
                >
                    Cloaked Dagger
                </router-link>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <router-link
                        v-if="user && user.hasRole('Admin')"
                        :to="{ name: 'admin' }"
                        class="navbar-item"
                    >
                        Admin
                    </router-link>
                </div>
                <div class="navbar-end">
                    <div
                        v-if="user"
                        class="navbar-item has-dropdown is-hoverable"
                    >
                        <a class="navbar-link">
                            {{ user.name }}
                        </a>

                        <div class="navbar-dropdown">
                            <a
                                class="navbar-item"
                                @click="logout"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script>
    import axios from "axios"
    import {mapGetters} from "vuex"

    import "@app/services/CustomDirectives.js";

    import DefaultLayout from "@app/layouts/DefaultLayout.vue"
    import AdminLayout from "@app/layouts/AdminLayout.vue"

    import {UserService} from "@app/services/ApplicationProxy.js";

    export default {
        name: "Home",
        data: function() {
            return {
            }
        },
        methods: {
            logout() {
                this.$store.dispatch("logout");
            }
        },
        computed: {
            ...mapGetters({
                user: "currentUser"
            }),
            layout() {
                let routeLayout = this.$route.meta.layout;
                //TODO: Probably want to expand this into a dictionary at some point
                if (routeLayout === "admin") {
                    return AdminLayout;
                }
                return DefaultLayout;
            }
        },
        created: function () {
            axios.interceptors.response.use(undefined, err => new Promise((resolve, reject) => {
                if (err.response.status === 401 && err.config.url !== "/api/user/login" &&
                    this.$route.name !== "login") {
                    this.$store.commit("authLogout");
                    this.$router.push({
                        name: "login"
                    });
                }
                else {
                    reject(err);
                }
            }));

            this.$store.dispatch("fetchCurrentUser");
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
