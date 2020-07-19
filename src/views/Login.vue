<template>

    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-one-third">
                    <div class="card is-horizontal">
                        <div class="card-image">
                            <span class="icon is-large">
                                <app-icon icon="user" size="10x"/>
                            </span>
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
                        alert("Woo login was successful!");
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

</style>