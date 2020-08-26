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
                    <tr v-for="uri in redirectUris" :key="uri.uri">
                        <td class="has-text-weight-bold">{{ uri.type | friendlyConstant("CLIENT_URI_TYPE")}}</td>
                        <td>{{ uri.uri }}</td>
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

            <div class="pt-3"></div>

            <div class="box">
                <h3 class="subtitle is-3">
                    Allowed Grant Types
                    <span class="is-pulled-right is-size-5">
                        <app-icon
                            icon="plus"
                            :action="true"
                        />
                    </span>

                </h3>
                <span>
                    The Grant types that are allowed for this client
                </span>
                <div class="content">
                    <ul>
                        <li><span class="has-text-weight-bold">Authorization Code</span>: Allows the application to request a token on behalf of a user via a login flow.</li>
                        <li><span class="has-text-weight-bold">Client Credentials</span>: Allows the application to request client credentials for app to app communication.</li>
                    </ul>
                </div>

                <div class="pt-3"></div>
                <table class="table is-fullwidth is-striped is-hoverable is-bordered-outer">
                    <tbody>
                    <tr v-for="grantType in allowedGrantTypes" :key="grantType">
                        <td>{{ grantType | friendlyConstant("CLIENT_GRANT_TYPE") }}</td>
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
                            <span class="is-pulled-right is-size-5">
                                <app-icon
                                    icon="plus"
                                    :action="true"
                                />
                            </span>

                        </h3>
                        <span>
                            The OpenID Identities that this application is allowed to request. In other
                            words the pieces of the user's profile the application is allowed access to.
                        </span>
                        <div class="pt-3"></div>
                        <table class="table is-fullwidth is-striped is-hoverable is-bordered-outer">
                            <tbody>
                            <tr v-for="identity in allowedIdentities" :key="identity">
                                <td>{{ identity | friendlyConstant("IDENTITY")}}</td>
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
            </div>
        </div>
    </div>
</template>

<script>
import TextField from "@app/components/Common/TextField.vue"
import Icon from "@app/components/Common/Icon.vue"

import { ClientService } from "@app/services/ApplicationProxy";

const clientService = new ClientService();

export default {
    components: {
        "app-text-field": TextField,
        "app-icon": Icon
    },
    data: function () {
        return {
            name: "",
            description: "",
            uriType: 2,
            allowedScopes: [
                "das-cookbook.read",
                "das-cookbook.write"
            ],
            allowedIdentities: [
                1,
                2,
                3
            ],
            allowedGrantTypes: [
                1,
                2
            ],
            redirectUris: [
                {
                    "uri": "http://localhost:3000",
                    "type": 1
                },
                {
                    "uri": "https://google.com/",
                    "type": 1
                },
                {
                    "uri": "http://localhost:3000",
                    "type": 2
                }
            ]
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
        },
        addAllowedScope() {
            this.allowedScopes.push("new scope 1");
        },
        clearSecret() {
            this.secret = null;
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