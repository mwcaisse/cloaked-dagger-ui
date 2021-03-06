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
                <div class="card-content has-text-left">
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
                    <form @submit.prevent="register">
                        <app-text-field
                            v-model="username"
                            name="Username"
                            icon="user"
                            :validator="validateNotEmpty"
                        />
                        <app-text-field
                            v-model="password"
                            name="Password"
                            icon="key"
                            type="password"
                            :validator="validatePassword"
                        />
                        <app-text-field
                            ref="passwordConfirmField"
                            v-model="passwordConfirm"
                            name="Confirm Password"
                            icon="key"
                            type="password"
                            :validator="validatePasswordConfirm"
                        />
                        <app-text-field
                            v-model="email"
                            name="Email"
                            icon="envelope"
                            :validator="validateEmail"
                        />
                        <app-text-field
                            v-model="name"
                            name="Name"
                            icon="id-badge"
                            :validator="validateNotEmpty"
                        />

                        <app-text-field
                            v-model="key"
                            name="Registration Key"
                            icon="key"
                            :validator="validateNotEmpty"
                        />

                        <div class="field">
                            <div class="control">
                                <button
                                    class="button is-link is-medium is-fullwidth"
                                    type="submit"
                                    :disabled="!hasValidationIssues"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="box notification is-link is-light has-text-centered">
                Already have an account?
                <router-link :to="{ name: 'login' }">
                    Login
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from "@app/components/Common/Icon.vue"
    import TextField from "@app/components/Common/TextField.vue"

    import {UserService} from "@app/services/ApplicationProxy.js";

    const userService = new UserService();

    export default {
        name: "Register",
        components: {
            "app-icon": Icon,
            "app-text-field": TextField
        },
        data: function() {
            return {
                username: "",
                password: "",
                passwordConfirm: "",
                email: "",
                name: "",
                key: "",
                error: ""
            }
        },
        computed: {
            hasValidationIssues: function() {
                let errors = []

                errors.push(...this.validateNotEmpty(this.username));
                errors.push(...this.validatePassword(this.password));
                errors.push(...this.validatePasswordConfirm(this.passwordConfirm));
                errors.push(...this.validateEmail(this.email));
                errors.push(...this.validateNotEmpty(this.name));
                errors.push(...this.validateNotEmpty(this.key));

                return errors.length === 0;
            }
        },
        watch: {
            password(newVal) {
                //re run the validation on the confirm password field, if it has a value and password changed
                if (this.passwordConfirm) {
                    this.$refs.passwordConfirmField.validate();
                }
            }
        },
        methods: {
            register() {
                const registration = {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    name: this.name,
                    registrationKey: this.key
                };
                userService.register(registration).then(
                    () => {
                        this.$router.push({
                            name: "login"
                        })
                    },
                    error => {
                        if (error.response && error.response.data.message) {
                            this.error = error.response.data.message;
                        }
                        else {
                            this.error = "Unknown error occurred! Please try again later."
                        }
                    }

                )
            },
            cancel() {
                window.location = "https://google.com/" //for now, since we don't have a home page
            },
            validateNotEmpty(val, name) {
                let errors = [];
                if (!val) {
                    errors.push(`${name} not be empty`);
                }
                return errors;
            },
            validateEmail(val, name) {
                let errors = this.validateNotEmpty(val, name);

                if (!val.includes("@")) {
                    errors.push(`${name} invalid format. Must contain @.`)
                }

                return errors;
            },
            validatePassword(val, name) {
                let errors = [];
                if (!val || val.length < 8) {
                    errors.push("Password must be at least 8 characters long!");
                }
                return errors;
            },
            validatePasswordConfirm(val, name) {
                let errors = this.validateNotEmpty(val, name);
                if (this.password !== val) {
                    errors.push("Passwords do not match");
                }
                return errors;
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
