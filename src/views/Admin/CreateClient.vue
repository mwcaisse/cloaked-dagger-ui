<template>
    <div class="box">
        <h1 class="title">Register a new Client</h1>

        <form @submit.prevent="create">
            <app-text-field name="Name"
                            icon="id-badge"
                            v-model="name"
            />

            <app-text-field name="Description"
                            v-model="description"
                            :height="3"
                            field-type="textarea"
            />

            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button class="button is-link"
                            type="submit"
                    >
                        Create
                    </button>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import TextField from "@app/components/Common/TextField.vue"

    import { ClientService } from "@app/services/ApplicationProxy";

    const clientService = new ClientService();

    export default {
        components: {
            "app-text-field": TextField
        },
        data: function () {
            return {
                name: "",
                description: ""
            }
        },
        methods: {
            create() {
                let client = {
                    name: this.name,
                    description: this.description
                };

                clientService.create(client).then(
                    res => {
                        this.$router.push({
                            name: "admin-client-edit",
                            params: {
                                id: res.id,
                                secret: res.secret
                            }
                        })
                    },
                    err => {
                        console.log("Error creating client :(");
                    }
                )
            }
        }
    }
</script>