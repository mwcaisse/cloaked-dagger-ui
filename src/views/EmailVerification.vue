<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="card is-horizontal">
                <div class="card-image pt-4 has-text-centered pb-4">
                    <app-icon
                        icon="khanda"
                        size="10x"
                    />
                </div>
            </div>
            <div
                v-if="verificationKey && verifyingEmail"
                class="box notification is-info is-light has-text-centered"
            >
                <div>
                    <p class="pb-3">
                        Verifying your email address
                    </p>
                    <progress
                        class="progress is-medium is-info"
                        max="100"
                    >
                        50%
                    </progress>
                </div>
            </div>
            <div
                v-else-if="verificationKey && emailVerified"
                class="box notification is-success is-light has-text-centered"
            >
                <div>
                    <p>Your email has been successfully verified</p>
                    <p>Redirecting to home in {{ secondsToRedirect }} seconds.</p>
                </div>
            </div>
            <div
                v-else-if="verificationKey"
                class="box notification is-danger is-light has-text-centered"
            >
                <div>
                    <p>Unable to verify your email.</p>
                    <p
                        v-if="verificationError"
                        class="pt-3"
                    >
                        {{ verificationError }}
                    </p>
                    <p class="pt-3">
                        <a
                            href=""
                            @click.prevent="requestResend"
                        >
                            Click here to resend
                        </a>
                    </p>
                </div>
            </div>
            <div
                v-else
                class="box notification is-danger is-light has-text-centered"
            >
                <p>
                    You need to verify your email before proceeding further. Please check the email you registered with for
                    a verification link.
                </p>
                <p class="pt-3">
                    Don't see an email?
                    <a
                        href=""
                        @click.prevent="requestResend"
                    >
                        Click here to resend
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from "@app/components/Common/Icon.vue";

    import {UserService} from "@app/services/ApplicationProxy.js";

    const userService = new UserService();

    export default {
        name: "EmailVerification",
        components: {
            "app-icon": Icon
        },
        props: {
            verificationKey: {
                type: String,
                default: null,
                required: false
            }
        },
        data() {
            return {
                verifyingEmail: false,
                emailVerified: false,
                verificationError: "",
                secondsToRedirect: null
            }
        },
        watch: {
            secondsToRedirect(value) {
                if (this.emailVerified) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.secondsToRedirect--;
                        }, 1000);
                    }
                    else {
                        this.$router.push({
                            name: "home"
                        });
                    }
                }
            }
        },
        created() {
            if (this.verificationKey) {
                this.verifyEmail();
            }
        },
        methods: {
            requestResend() {
                userService.resendEmailVerification().then(
                    res => {
                        //TODO: Add some form of visual notification for the user. Toast?
                        console.log("Email verification re-sent");
                    },
                    err => {
                        console.log("Error resending email verification");
                    }
                )
            },
            verifyEmail() {
                this.verifyingEmail = true;

                this.$store.dispatch("validateEmailAddress", this.verificationKey).then(
                    () => {
                        this.verifyingEmail = false;
                        this.emailVerified = true;
                        this.secondsToRedirect = 10;
                    },
                    err => {
                        this.verifyingEmail = false;
                        console.log("errors");
                        console.dir(err);

                        if (err.response.status === 400 && err.response.data.message) {
                            this.verificationError = err.response.data.message;
                        }
                    }
                );
            }
        }
    }
</script>
