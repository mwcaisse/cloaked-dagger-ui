<template>
    <div>
        <article class="message is-warning" v-if="recentlyCreated">
            <div class="message-header">
                <p>Client Created</p>
                <button class="delete" type="button" @click="clearSecret"></button>
            </div>
            <div class="message-body">
                <p>
                    Client {{ name }} has been successfully created.
                    <span class="has-text-weight-bold"> Please record the secret below and keep it safe. </span>
                    You will need to in the future when trying authenticate, but you won't be able to retrieve it again.

                </p>
                <br/>
                <span class="tag is-danger is-medium">
                    {{ secret }}
                </span>

            </div>
        </article>

        <div class="box">
            <h1 class="title">Client: {{ name }}</h1>
            <div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">ID</label>
                    </div>
                    <div class="field-body">
                        <p class="control" >
                            <span class="field-text">{{ id }}</span>
                        </p>
                    </div>
                </div>
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
                    field-type="textarea"
                />

                <div class="field is-horizontal">
                    <div class="field-label">

                    </div>
                    <div class="field-body">
                        <div class="control">
                            <div class="tags has-addons are-large" v-if="active">
                                <a class="tag is-dark" @click="deactivate"></a>
                                <span class="tag is-success">Active</span>
                            </div>
                            <div class="tags has-addons are-large" v-else>
                                <span class="tag is-danger">Inactive</span>
                                <a class="tag is-dark" @click="activate"></a>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button class="button is-link"
                                type="submit"
                                @click="save"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <div class="pt-3"></div>

            <div class="box">
                <h3 class="subtitle is-3">
                    Redirect URIs
                    <span class="is-pulled-right is-size-5">
                        <app-icon
                            icon="plus"
                            :action="true"
                            @click.native="addUri"
                        />
                    </span>
                </h3>
                <span>
                    The different redirect URIs for the client.
                </span>
                <div class="content">
                    <ul>
                        <li>The allowed redirect URIs that cab be redirected to after a successful login. <span class="has-text-weight-bold">At least one is required.</span></li>
                        <li>The allowed redirect URIs that can be redirected to after the user logs out. <span class="has-text-weight-bold">At least one is required.</span></li>
                    </ul>
                </div>

                <div class="pt-3"></div>
                <table class="table is-fullwidth is-striped is-hoverable is-bordered-outer">
                    <tbody>
                    <tr v-for="uri in uris" :key="uri.uri">
                        <td class="has-text-weight-bold">{{ uri.type | friendlyConstant("CLIENT_URI_TYPE")}}</td>
                        <td>{{ uri.uri }}</td>
                        <td>
                            <span class="is-pulled-right">
                                <app-icon
                                    icon="trash"
                                    :action="true"
                                    @click.native="deleteUri(uri)"
                                />
                            </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="pt-3"></div>

            <div class="box">
                <h3 class="subtitle is-3">
                    Allowed Grant Types
                </h3>
                <span>
                    The Grant types that are allowed for this client
                </span>
                <div class="pt-3"></div>

                <div class="field" v-for="grantType in constants.CLIENT_GRANT_TYPES" :key="grantType">
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox"
                                   :value="grantType"
                                   v-model="allowedGrantTypes"
                                   @change="allowedGrantTypeChanged(grantType)"
                            />
                            <span class="has-text-weight-bold">{{ grantType | friendlyConstant("CLIENT_GRANT_TYPE") }}</span>:
                            {{ grantType | friendlyConstant("CLIENT_GRANT_TYPE_DESCRIPTION") }}
                        </label>
                    </div>
                </div>
            </div>

            <div class="pt-3"></div>

            <div class="columns">
                <div class="column">
                    <div class="box">
                        <h3 class="subtitle is-3">
                            Allowed Scopes
                            <span class="is-pulled-right is-size-5">
                                <app-icon
                                    icon="plus"
                                    :action="true"
                                    @click.native="addAllowedScope()"
                                />
                            </span>
                        </h3>
                        <span>
                            The scopes that this application is allowed to request. In other words the functionality
                            of protected APIs that the client is allowed to request access to.
                        </span>
                        <div class="pt-3"></div>
                        <table class="table is-fullwidth is-striped is-hoverable is-bordered-outer">
                            <tbody>
                                <tr v-for="scope in allowedScopes" :key="scope">
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
                </div>

                <div class="column">
                    <div class="box">
                        <h3 class="subtitle is-3">
                            Allowed Identities
                        </h3>
                        <span>
                            The OpenID Identities that this application is allowed to request. In other
                            words the pieces of the user's profile the application is allowed access to.
                        </span>
                        <div class="pt-3"></div>

                        <div class="field" v-for="allowedIdentity in constants.IDENTITIES" :key="allowedIdentity">
                            <div class="control">
                                <label class="checkbox">
                                    <input type="checkbox"
                                           :value="allowedIdentity"
                                           v-model="allowedIdentities"
                                           @change="allowedIdentityChanged(allowedIdentity)"
                                   />
                                    {{ allowedIdentity | friendlyConstant("IDENTITY")}}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <add-uri-modal :client-id="id" v-on:new-uri="uriAdded"/>
    </div>
</template>

<script>
import TextField from "@app/components/Common/TextField.vue"
import Icon from "@app/components/Common/Icon.vue"

import AddUriModal from "@app/components/Admin/Client/AddUriModal.vue";

import { ClientService, ClientAllowedGrantTypeService, ClientAllowedIdentityService, ClientUriService } from "@app/services/ApplicationProxy";
import system from "@app/services/System";
import {Arrays} from "@app/services/Utils.js"

const clientService = new ClientService();
const clientAllowedGrantTypeService = new ClientAllowedGrantTypeService();
const clientAllowedIdentityService = new ClientAllowedIdentityService();
const clientUriService = new ClientUriService();

export default {
    components: {
        "app-text-field": TextField,
        "app-icon": Icon,
        "add-uri-modal": AddUriModal
    },
    data: function () {
        return {
            name: "",
            description: "",
            active: false,
            allowedScopes: [
                "das-cookbook.read",
                "das-cookbook.write"
            ],
            allowedIdentities: [],
            allowedGrantTypes: [],
            uris: []
        }
    },
    props: {
        id: {
            type: String,
            required: false,
            default: null
        },
        secret: {
            type: String,
            required: false,
            default: null
        }
    },
    computed: {
        recentlyCreated() {
            return this.secret !== null;
        }
    },
    methods: {
        fetch() {
            clientService.get(this.id).then(
                res => {
                    this.update(res);
                },
                err => {
                    console.log("Error fetching client! :(");
                }
            )
        },
        save() {
            const vm = {
              name: this.name,
              description: this.description
            };
            clientService.update(this.id, vm).then(
                res => {
                    this.update(res);
                },
                err => {
                    console.log("Error updating client! :(");
                }
            )
        },
        update(client) {
            this.name = client.name;
            this.description = client.description;
            this.active = client.active;
            this.allowedGrantTypes = client.allowedGrantTypes;
            this.allowedIdentities = client.allowedIdentities;
            this.uris = client.uris;
        },
        addAllowedScope() {
            this.allowedScopes.push("new scope 1");
        },
        clearSecret() {
            this.secret = null;
        },
        allowedGrantTypeChanged(grantType) {
            if (this.allowedGrantTypes.indexOf(grantType) >= 0) {
                clientAllowedGrantTypeService.add(this.id, grantType).then( () => {}, (error) => {
                    console.log("Failed to add allowed grant type!");
                    Arrays.remove(this.allowedGrantTypes, grantType);
                })
            }
            else {
                clientAllowedGrantTypeService.remove(this.id, grantType).then( () => {}, (error) => {
                    //we failed somehow, let's log and re-add
                    //TODO: Add some sort of page message
                    console.log("Failed to remove allowed grant type!");
                    this.allowedGrantTypes.push(grantType);
                })
            }
        },
        allowedIdentityChanged(identity) {
            if (this.allowedIdentities.indexOf(identity) >= 0) {
                clientAllowedIdentityService.add(this.id, identity).then( () => {}, (error) => {
                    console.log("Failed to add allowed identity!");
                    Arrays.remove(this.allowedIdentities, identity);
                })
            }
            else {
                clientAllowedIdentityService.remove(this.id, identity).then( () => {}, (error) => {
                    //we failed somehow, let's log and re-add
                    //TODO: Add some sort of page message
                    console.log("Failed to remove allowed identity!");
                    this.allowedIdentities.push(identity);
                })
            }
        },
        addUri() {
            system.events.$emit("client-add-uri-modal::open");
        },
        uriAdded(uri) {
            this.uris.push(uri);
        },
        deleteUri(uri) {
            clientUriService.delete(this.id, uri.id).then(res => {
                Arrays.remove(this.uris, uri);
            },
            error => {
                console.log("Failed to remove URI!");
            })
        },
        activate() {
            clientService.activate(this.id).then(() => {
                this.active = true;
            },
            error => {
                console.log("Failed to activate client!");
            });
        },
        deactivate() {
            clientService.deactivate(this.id).then(() => {
                this.active = false;
            },
            error => {
                console.log("Failed to deactivate client!");
            });
        }
    },
    created() {
        if (this.id) {
            this.fetch();
        }
    }
}
</script>

<style scoped>

    .field-text {
        -moz-appearance:none;
        -webkit-appearance:none;
        align-items:center;
        border:1px solid transparent;
        border-radius:4px;
        box-shadow:none;
        display:inline-flex;
        font-size:1rem;
        height:2.5em;
        justify-content:flex-start;
        line-height:1.5;
        padding-bottom:calc(.5em - 1px);
        padding-left:calc(.75em - 1px);
        padding-right:calc(.75em - 1px);
        padding-top:calc(.5em - 1px);
        position:relative;
        vertical-align:top
    }

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