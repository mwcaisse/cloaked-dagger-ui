<template>

    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-one-third">
                    <div class="card is-horizontal">
                        <div class="card-image pt-4">
                            <app-icon icon="khanda" size="10x"/>
                        </div>
                        <div class="card-content registration-form">
                            <div class="notification is-danger" v-if="error">
                                <button class="delete" @click="clearError"></button>
                                {{ error }}
                            </div>
                            <app-text-field name="Username"
                                            icon="user"
                                            v-model="username"
                                            :validator="validateNotEmpty"
                            />
                            <app-text-field name="Password"
                                            icon="key" v-model="password"
                                            type="password"
                                            :validator="validatePassword"
                            />
                            <app-text-field name="Confirm Password"
                                            icon="key"
                                            v-model="passwordConfirm"
                                            type="password"
                                            :validator="validatePasswordConfirm"
                                            ref="passwordConfirmField"
                            />
                            <app-text-field name="Email"
                                            icon="envelope"
                                            v-model="email"
                                            :validator="validateEmail"
                            />
                            <app-text-field name="Name"
                                            icon="id-badge"
                                            v-model="name"
                                            :validator="validateNotEmpty"
                                            @enter_pressed="register"
                            />

                            <div class="field">
                                <div class="control">
                                    <button class="button is-link is-large is-fullwidth"
                                            @click="register"
                                            :disabled="!hasValidationIssues"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="box notification is-link is-light">
                        Already have an account?
                        <router-link to="login">Login</router-link>
                    </div>

                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import Icon from "@app/components/Common/Icon.vue"
    import TextField from "@app/components/Common/TextField.vue"

    import { UserService } from "@app/services/ApplicationProxy.js";

    const userService = new UserService();

    export default {
        name: "Register",
        components: {
            "app-icon": Icon,
            "app-text-field": TextField
        },
        computed: {
            hasValidationIssues: function() {
                let errors = []

                errors.push(...this.validateNotEmpty(this.username));
                errors.push(...this.validatePassword(this.password));
                errors.push(...this.validatePasswordConfirm(this.passwordConfirm));
                errors.push(...this.validateEmail(this.email));
                errors.push(...this.validateNotEmpty(this.name));

                return errors.length === 0;
            }
        },
        data: function() {
            return {
                username: "",
                password: "",
                passwordConfirm: "",
                email: "",
                name: "",
                error: ""
            }
        },
        watch: {
            password(newVal) {
                // re run the validation on the confirm password field, if it has a value and password changed
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
                    name: this.name
                }
                userService.register(registration).then(
                    () => {
                        alert("Woo registration was successful!");
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
                window.location = "https://google.com/" // for now, since we don't have a home page
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

    .registration-form {
        text-align: left
    }

</style>