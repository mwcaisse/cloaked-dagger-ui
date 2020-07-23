<template>
    <div id="app">
        <nav class="navbar is-dark" role="navigation">
            <div class="navbar-brand">
                <router-link :to="{ name: 'home' }" class="navbar-item">
                    Cloaked Dagger
                </router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable" v-if="user">
                    <a class="navbar-link">
                        {{ user.name }}
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item" @click="logout">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <router-view/>
    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from "vuex"

    import { UserService } from "@app/services/ApplicationProxy.js";

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
            })
        },
        created: function () {
            axios.interceptors.response.use(undefined, (err) => {
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config.url !== "/api/user/login") {
                        this.$store.commit("authLogout");
                        this.$router.push({
                            name: "login"
                        });
                    }
                    else {
                        reject(err);
                    }
                });
            });

            this.$store.dispatch("fetchCurrentUser");
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
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
