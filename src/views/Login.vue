<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div class="card is-horizontal">
                <div class="card-image pt-4 has-text-centered">
                    <app-icon
                        icon="khanda"
                        size="10x"
                    />
                </div>
                <div class="card-content">
                    <div
                        v-if="error"
                        class="notification is-danger"
                    >
                        <button
                            class="delete"
                            @click="clearError"
                        />
                        {{ error }}
                    </div>
                    <form @submit.prevent="login">
                        <div class="field">
                            <div class="control has-icons-left">
                                <input
                                    v-model="username"
                                    class="input"
                                    type="text"
                                    placeholder="Username"
                                    autofocus
                                >
                                <span class="icon  is-left">
                                    <app-icon icon="user" />
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control has-icons-left">
                                <input
                                    v-model="password"
                                    class="input"
                                    type="password"
                                    placeholder="Password"
                                >
                                <span class="icon is-left">
                                    <app-icon icon="key" />
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button
                                    class="button is-link is-fullwidth is-medium"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="box notification is-link is-light has-text-centered">
                Don't have an account?
                <router-link :to="{ name: 'register' }">
                    Register
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from "@app/components/Common/Icon.vue"

    import {UserService} from "@app/services/ApplicationProxy.js";

    export default {
        name: "Login",
        components: {
            "app-icon": Icon
        },
        props: {
            returnUrl: {
                type: String,
                default: null,
                required: false
            }
        },
        data: function() {
            return {
                username: "",
                password: "",
                error: ""
            }
        },
        methods: {
            login() {
                this.$store.dispatch("login", {username: this.username, password: this.password}).then(
                    res => {
                        if (res.emailVerificationRequired) {
                            this.$router.push({
                                name: "email-verification"
                            });
                        }
                        //If a returnUrl was set we want to navigate there instead
                        else if (this.returnUrl) {
                            window.location = this.returnUrl;
                        }
                        else {
                            //Otherwise, we go home
                            this.$router.push({
                                name: "home"
                            });
                        }
                    },
                    error => {
                        this.error="Invalid username/password!";
                    }

                )
            },
            clearError() {
                this.error = "";
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
