<template>
    <app-modal
        ref="modal"
        title="Add URI"
    >
        <app-text-field
            name="URI"
            v-model="uri"
        />

        <template slot="footer-buttons">
            <button class="button" type="button" @click="create">
                Add
            </button>
        </template>

    </app-modal>
</template>

<script>

import system from "@app/services/System";

import TextField from "@app/components/Common/TextField.vue";
import Modal from "@app/components/Common/Modal.vue";

import { ClientUriService } from "@app/services/ApplicationProxy";

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
    methods: {
        create() {
            let uri = {
                type: this.type,
                uri: this.uri
            };
            clientUriService.create(this.clientId, uri).then(
                res => {
                    this.close();
                    this.$emit("new-uri", res);
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
            this.name = "";
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

    }

}
</script>

<style scoped>

</style>