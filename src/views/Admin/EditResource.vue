<template>
    <div class="box">
        <h1 class="title">
            <template v-if="isCreate">Creating Resource</template>
            <template v-else>Resource: {{ name }}</template>
        </h1>

        <div>
            <app-text-field
                name="Name"
                icon="id-badge"
                :horizontal="true"
                v-model="name"
            />
            <app-text-field
                name="Description"
                :horizontal="true"
                v-model="description"
                :height="3"
            />
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button class="button is-link"
                            type="submit"
                            @click="save"
                    >
                        <template v-if="isCreate">Create</template>
                        <template v-else>Save</template>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="!isCreate">
            <div class="pt-3"></div>

            <div class="box">
                <h3 class="subtitle is-3">
                    Available Scopes
                    <span class="is-pulled-right is-size-5">
                        <app-icon
                            icon="plus"
                            :action="true"
                            @click.native="addScope"
                        />
                    </span>
                </h3>
                <span>
                    The scopes that are used to protect the different APIs that this resource exposes.
                </span>
                <div class="pt-3"></div>
                <table class="table is-fullwidth is-striped is-hoverable is-bordered-outer">
                    <tbody>
                    <tr v-for="scope in availableScopes" :key="scope.resourceScopeId">
                        <td>{{ scope.name }}</td>
                        <td>
                            <span class="is-pulled-right">
                                <app-icon
                                    icon="trash"
                                    :action="true"
                                    @click.native="removeScope(scope)"
                                />
                            </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <app-resource-scope-modal
                :resource-id="id"
                v-on:new-scope="onScopeAdded"
                v-if="!isCreate"
            />
        </div>

    </div>
</template>

<script>
    import system from "@app/services/System"

    import TextField from "@app/components/Common/TextField.vue"
    import Icon from "@app/components/Common/Icon.vue"
    import ResourceAddScopeModal from "@app/components/Resources/ResourceAddScopeModal.vue";

    import { ResourceService, ResourceScopeService } from "@app/services/ApplicationProxy.js";

    const resourceService = new ResourceService();
    const resourceScopeService = new ResourceScopeService();

    export default {
        components: {
            "app-text-field": TextField,
            "app-icon": Icon,
            "app-resource-scope-modal": ResourceAddScopeModal
        },
        data: function () {
            return {
                name: "",
                description: "",
                availableScopes: []
            }
        },
        props: {
            id: {
                type: String,
                required: false,
                default: null
            }
        },
        computed: {
            isCreate() {
                return this.id === null;
            }
        },
        methods: {
            save() {
                let resource = {
                    name: this.name,
                    description: this.description
                };
                let promise;

                if (this.isCreate) {
                    promise = resourceService.create(resource);
                }
                else {
                    promise = resourceService.update(this.id, resource);
                }

                promise.then(
                    res => {
                        if (this.isCreate) {
                            //navigate to the page to view this resource
                            this.$router.push({
                                name: "admin-resource-edit",
                                params: {
                                    id: res.resourceId
                                }
                            })
                        }
                        else {
                            this.update(res);

                        }
                    },
                    err => {
                        console.log("Error creating / updating resource");
                    }
                );
            },
            fetch() {
                resourceService.get(this.id).then(
                    res => {
                        this.update(res);
                    },
                    err => {
                        console.log("Error fetching resource! :(");
                    }
                )
            },
            update(resource) {
                this.name = resource.name;
                this.description = resource.description;
                this.availableScopes = resource.availableScopes;
            },
            addScope() {
                system.events.$emit("resource-add-scope-modal::open");
            },
            removeScope(scope) {
                resourceScopeService.remove(this.id, scope.resourceScopeId).then(
                    res => {
                        let index = this.availableScopes.indexOf(scope);
                        this.availableScopes.splice(index, 1);
                    },
                    err => {
                        console.log("Error removing scope :(");
                    }
                )
            },
            onScopeAdded(scope) {
                this.availableScopes.push(scope);
            }
        },
        created() {
            if (!this.isCreate) {
                this.fetch();
            }
        }
    }

</script>