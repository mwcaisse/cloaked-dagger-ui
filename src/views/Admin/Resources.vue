<template>
    <div class="box">
        <h1 class="title">
            Resources
        </h1>
        <span>
            A resource is an application that exposes an API that can be called.
        </span>

        <div class="pt-3" />

        <div class="columns is-multiline is-centered">
            <div
                v-for="resource in resources"
                :key="resource.name"
                class="column is-one-third action"
            >
                <router-link :to="{name: 'admin-resource-edit', params: { id: resource.resourceId } }">
                    <div class="box has-background-link-light has-text-centered">
                        <p class="title">
                            {{ resource.name }}
                        </p>
                    </div>
                </router-link>
            </div>
            <div class="column is-one-third">
                <router-link :to="{ name: 'admin-resource-create'}">
                    <div class="box has-background-primary has-text-centered action">
                        <p class="title">
                            <app-icon icon="plus" /> Create
                        </p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from "@app/components/Common/Icon.vue"
    import TextField from "@app/components/Common/TextField.vue"

    import {ResourceService} from "@app/services/ApplicationProxy.js";

    const resourceService = new ResourceService();

    export default {
        components: {
            "app-icon": Icon,
            "app-text-field": TextField
        },
        data: function () {
            return {
                resources: []
            }
        },
        created() {
            this.fetchResources();
        },
        methods: {
            fetchResources() {
                resourceService.getAll().then(
                    res => {
                        this.resources = res;
                    },
                    err => {
                        console.log("Error fetching resources :(")
                    }
                )
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