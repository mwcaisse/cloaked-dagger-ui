<template>
    <app-modal
        ref="modal"
        title="Add Scope"
    >
        <app-text-field
            name="Name"
            v-model="name"
        />

        <template slot="footer-buttons">
            <button class="button" type="button" @click="create">
                Add
            </button>
        </template>

    </app-modal>
</template>

<script>

    import system from "@app/services/System"

    import TextField from "@app/components/Common/TextField.vue";
    import Modal from "@app/components/Common/Modal.vue"

    import { ResourceScopeService } from "@app/services/ApplicationProxy";

    const resourceScopeService = new ResourceScopeService();

    export default {
        components: {
            "app-modal": Modal,
            "app-text-field": TextField
        },
        props: {
            resourceId: {
                type: String,
                required: true,
                default: null
            }
        },
        data: function() {
            return {
                name: ""
            }
        },
        methods: {
            create() {
                let scope = {
                    name: this.name
                };
                resourceScopeService.create(this.resourceId, scope).then(
                    res => {
                        this.close();
                        this.$emit("new-scope", res);
                    },
                    err => {
                        console.log("Error creating resource scope :(");
                    }
                );
            },
            close() {
                this.$refs.modal.close();
            },
            clear() {
                this.name = "";
            }
        },
        created() {
            system.events.$on("resource-add-scope-modal::open", () => {
                this.clear();
                this.$refs.modal.open();
            });

            system.events.$on("resource-add-scope-modal::hide", () => {
                this.close();
            });

        }

    }
</script>

<style scoped>

</style>