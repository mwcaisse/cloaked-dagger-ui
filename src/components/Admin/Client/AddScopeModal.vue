<template>
    <app-modal
        ref="modal"
        title="Add Allowed Scope"
    >
        <form @submit.prevent="search(searchText)">
            <div class="field has-addons">
                <div class="control">
                    <input
                        v-model="searchText"
                        class="input"
                        type="text"
                        placeholder="Find a scope"
                    >
                </div>
                <div class="control">
                    <button
                        type="submit"
                        class="button is-info"
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>

        <div class="pt-3" />

        <table class="table is-fullwidth is-striped is-hoverable is-bordered-outer">
            <tbody>
                <tr
                    v-for="scope in scopeOptions"
                    :key="scope.id"
                >
                    <td>{{ scope.name }}</td>
                    <td>
                        <span class="is-pulled-right">
                            <app-icon
                                icon="plus"
                                :action="true"
                                @click.native="addScope(scope)"
                            />
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <template slot="footer-buttons" />
    </app-modal>
</template>

<script>

    import system from "@app/services/System"
    import Icon from "@app/components/Common/Icon.vue"

    import TextField from "@app/components/Common/TextField.vue";
    import Modal from "@app/components/Common/Modal.vue"

    import {ClientAllowedScopeService, ScopeService} from "@app/services/ApplicationProxy";

    const clientAllowedScopeService = new ClientAllowedScopeService();
    const scopeService = new ScopeService();

    export default {
        components: {
            "app-modal": Modal,
            "app-text-field": TextField,
            "app-icon": Icon
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
                searchText: "",
                scopeOptions: []
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

        },
        methods: {
            addScope(scope) {
                clientAllowedScopeService.add(this.clientId, scope.name).then(
                    res => {
                        this.$emit("new-scope", scope);
                    },
                    err => {
                        console.log("Error adding allowed scope to  client :(");
                    }
                );
            },
            search(text) {
                scopeService.search(text).then(
                    res => {
                        this.scopeOptions = res;
                    },
                    error => {
                        console.log("Error occurred while searching for scopes :(");
                    }
                )
            },
            close() {
                this.$refs.modal.close();
            },
            clear() {
                this.name = "";
            }
        }

    }
</script>

<style scoped>

    .table.is-bordered-outer td:first-child {
        border-left-width: 1px;
    }

    .table.is-bordered-outer td:last-child {
        border-right-width: 1px;
    }

    .table.is-bordered-outer tr:first-child td {
        border-top-width: 1px;
    }

    .table.is-bordered-outer tr:last-child td {
        border-bottom-width: 1px;
    }

</style>