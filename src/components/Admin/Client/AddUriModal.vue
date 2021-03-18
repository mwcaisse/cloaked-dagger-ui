<template>
    <app-modal
        ref="modal"
        title="Add URI"
    >
        <div class="field">
            <label class="label">Type</label>
            <div class="control">
                <div class="select">
                    <select v-model="type">
                        <option
                            v-for="uriType in constants.CLIENT_URI_TYPES"
                            :key="uriType"
                            :value="uriType"
                        >
                            {{ uriType | friendlyConstant("CLIENT_URI_TYPE") }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <app-text-field
            v-model="uri"
            name="URI"
        />

        <template slot="footer-buttons">
            <button
                class="button"
                type="button"
                @click="create"
            >
                Add
            </button>
        </template>
    </app-modal>
</template>

<script>

    import system from "@app/services/System";

    import TextField from "@app/components/Common/TextField.vue";
    import Modal from "@app/components/Common/Modal.vue";

    import {ClientUriService} from "@app/services/ApplicationProxy";

    const clientUriService = new ClientUriService();

    export default {
        components: {
            "app-modal": Modal,
            "app-text-field": TextField
        },
        props: {
            clientId: {
                type: String,
                required: true,
                default: null
            }
        },
        data: function() {
            return {
                type: 1,
                uri: ""
            }
        },
        created() {
            system.events.$on("client-add-uri-modal::open", () => {
                this.clear();
                this.$refs.modal.open();
            });

            system.events.$on("client-add-uri-modal::hide", () => {
                this.close();
            });

        },
        methods: {
            create() {
                let uri = {
                    type: this.type,
                    uri: this.uri
                };
                clientUriService.create(this.clientId, uri).then(
                    res => {
                        this.$emit("new-uri", res);
                        this.close();
                    },
                    err => {
                        console.log("Error creating client uri :(");
                    }
                );
            },
            close() {
                this.$refs.modal.close();
            },
            clear() {
                this.type = 1;
                this.uri = "";
            }
        }

    }
</script>

<style scoped>

</style>