<template>

    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-one-third">
                    <div class="card is-horizontal">
                        <div class="card-image pt-4">
                            <app-icon icon="khanda" size="10x"/>
                        </div>
                        <div class="card-content">
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-large" type="text" placeholder="Username" v-model="username">
                                    <span class="icon  is-left">
                                        <app-icon icon="user" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-large" type="password" placeholder="Password" v-model="password">
                                    <span class="icon is-left">
                                        <app-icon icon="key" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button class="button is-link is-large is-fullwidth" @click="login">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="box notification is-link is-light">
                        Don't have an account?
                        <router-link to="register">Register</router-link>
                    </div>

                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import Icon from "@app/components/Common/Icon.vue"

    import { UserService } from "@app/services/ApplicationProxy.js";

    const userService = new UserService();

    export default {
        name: "Login",
        components: {
            "app-icon": Icon
        },
        data: function() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            login() {
                userService.login(this.username, this.password).then(
                    () => {
                        this.$router.push({
                            name: "Home"
                        })
                    },
                    error => {
                        alert("Error logging in :(");
                    }

                )
            }
        }

    }
</script>

<style scoped>

    html {
        height: 100%;
        overflow-y: hidden !important;
    }

    body {
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        /*animation: gradient 15s ease infinite;*/
        min-height: 100%;

    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%
        }

    }

</style>