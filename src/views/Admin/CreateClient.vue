<template>
    <div class="box">
        <h1 class="title">Register a new Client</h1>

        <form @submit.prevent="create">
            <app-text-field name="Name"
                            icon="id-badge"
                            v-model="name"
            />

            <!-- TODO: Make this a text area -->
            <app-text-field name="Description"
                            icon="id-badge"
                            v-model="description"
            />

            <div class="field">
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

            }
        }
    }
</script>