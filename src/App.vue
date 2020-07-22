<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import axios from "axios"

    import { UserService } from "@app/services/ApplicationProxy.js";

    export default {
        name: "Home",
        created: function () {
            axios.interceptors.response.use(undefined, (err) => {
                console.dir(err);
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config.url !== "/api/user/login") {
                        console.log("hi 2");
                        this.$router.push({
                            name: "login"
                        });
                    }
                });
            });

            // Attempt to fetch info around the currently logged in user, to redirect to login if
            // we aren't currently logged in
            new UserService().me();
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
