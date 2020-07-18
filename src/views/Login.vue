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
                                    <input class="input is-large" type="text" placeholder="Username">
                                    <span class="icon  is-left">
                                        <app-icon icon="user" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-large" type="password" placeholder="Password">
                                    <span class="icon is-left">
                                        <app-icon icon="key" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button class="button is-link is-large is-fullwidth">Login</button>
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

    export default {
        name: "Login",
        components: {
            "app-icon": Icon
        }
    }
</script>

<style scoped>

</style>