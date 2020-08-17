<template>
    <div class="box">
        <h1 class="title">Clients</h1>
        <span>
            A client is an application that calls other resources / applications on behalf of a user.
        </span>

        <div class="pt-3"></div>

        <div class="columns is-multiline is-centered">
            <div class="column is-one-third action" v-for="client in clients" :key="client.name">
                <router-link :to="{name: 'admin-client-edit', params: { id: 'testId' } }">
                    <div class="box has-background-link-light has-text-centered">
                        <p class="title">{{ client.name }}</p>
                    </div>
                </router-link>
            </div>
            <div class="column is-one-third">
                <router-link :to="{ name: 'admin-client-create'}">
                    <div class="box has-background-primary has-text-centered action">
                        <p class="title">
                            <app-icon icon="plus"/> Create</p>
                    </div>
                </router-link>

            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@app/components/Common/Icon.vue"
import TextField from "@app/components/Common/TextField.vue"

export default {
    components: {
        "app-icon": Icon,
        "app-text-field": TextField
    },
    data: function () {
        return {
            clients: [
                {
                    name: "DasCookbook"
                },
                {
                    name: "Client 2"
                },
                {
                    name: "Client 3"
                },
                {
                    name: "Client 4"
                },
                {
                    name: "Client 5"
                },
            ]
        }
    },
    methods: {
        create() {

        }
    }
}
</script>

<style scoped>
    .action:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
</style>