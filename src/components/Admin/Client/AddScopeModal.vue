<template>
    <app-modal
        ref="modal"
        title="Add Allowed Scope"
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

import { ClientAllowedScopeService, ScopeService } from "@app/services/ApplicationProxy";

const clientAllowedScopeService = new ClientAllowedScopeService();
const scopeService = new ScopeService();

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
            selectedScope: "",
            scopeOptions: []
        }
    },
    methods: {
        create() {
            clientAllowedScopeService.add(this.clientId, this.selectedScope).then(
                res => {
                    this.close();
                    this.$emit("new-scope", this.selectedScope);
                },
                err => {
                    console.log("Error adding allowed scope to  client :(");
                }
            );
        },
        search(text) {

        },
        close() {
            this.$refs.modal.close();
        },
        clear() {
            this.name = "";
        }
    },
    created() {
        system.events.$on("client-add-scope-modal::open", () => {
            this.clear();
            this.$refs.modal.open();
        });

        system.events.$on("client-add-scope-modal::hide", () => {
            this.close();
        });

    }

}
</script>

<style scoped>

</style>