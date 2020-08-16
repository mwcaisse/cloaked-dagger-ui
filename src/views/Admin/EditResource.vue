<template>
    <div class="box">
        <h1 class="title">Resource: {{ name }}</h1>

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
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>

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
                <tr v-for="scope in availableScopes" :key="scope">
                    <td>{{ scope }}</td>
                    <td>
                        <span class="is-pulled-right">
                            <app-icon
                                icon="trash"
                                :action="true"
                            />
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <app-resource-scope-modal
            v-on:new-scope="onScopeAdded"
        />
    </div>
</template>

<script>
    import system from "@app/services/System"

    import TextField from "@app/components/Common/TextField.vue"
    import Icon from "@app/components/Common/Icon.vue"
    import ResourceAddScopeModal from "@app/components/Resources/ResourceAddScopeModal.vue";

    export default {
        components: {
            "app-text-field": TextField,
            "app-icon": Icon,
            "app-resource-scope-modal": ResourceAddScopeModal
        },
        data: function () {
            return {
                name: "DasCookbook",
                description: "",
                availableScopes: [
                    "das-cookbook.read",
                    "das-cookbook.write"
                ]
            }
        },
        methods: {
            create() {

            },
            addScope() {
                system.events.$emit("resource-add-scope-modal::open");
            },
            onScopeAdded(scope) {
                this.availableScopes.push(scope.name);
            }
        }
    }

</script>