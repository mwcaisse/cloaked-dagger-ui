<template>
    <div class="box">
        <h1 class="title">
            User Registration Keys
        </h1>

        <app-create-user-registration-key />
        <table class="table is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th />
                    <th>Key</th>
                    <th>Uses Remaining</th>
                    <th>Active</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="key in registrationKeys"
                    :key="key.id"
                >
                    <td>
                        <app-icon
                            v-if="key.active"
                            icon="toggle-off"
                            :action="true"
                            @click.native="deactivateKey(key)"
                        />
                        <app-icon
                            v-if="!key.active"
                            icon="toggle-on"
                            :action="true"
                            @click.native="activateKey(key)"
                        />
                    </td>
                    <td>{{ key.key }}</td>
                    <td>{{ key.usesRemaining }}</td>
                    <td>{{ key.active ? "Yes" : "No" }}</td>
                    <td>{{ key.createDate | formatDateTime }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {DateTime} from "luxon";

    import {UserRegistrationKeyService} from "@app/services/ApplicationProxy.js";

    import CreateUserRegistrationKey from "@app/components/Admin/CreateUserRegistrationKey.vue";
    import Icon from "@app/components/Common/Icon.vue";

    const userRegistrationService = new UserRegistrationKeyService();

    export default {
        components: {
            "app-icon": Icon,
            "app-create-user-registration-key": CreateUserRegistrationKey
        },
        data: function() {
            return {
                registrationKeys: []
            }
        },
        created() {
            this.fetchKeys();
        },
        methods: {
            fetchKeys() {
                userRegistrationService.getAll().then(
                    res => {
                        this.registrationKeys = res.map(k => this.transformKey(k));
                    },
                    err => {
                        console.log("Error fetching keys :(");
                    }
                )
            },
            transformKey(key) {
                key.createDate = DateTime.fromMillis(key.createDate);

                return key;
            },
            activateKey(key) {
                userRegistrationService.activate(key.id).then(
                    () => {
                        key.active = true;
                    },
                    () => {
                        console.log("Error activating key");
                    }
                );
            },
            deactivateKey(key) {
                userRegistrationService.deactivate(key.id).then(
                    () => {
                        key.active = false;
                    },
                    () => {
                        console.log("Error deactivating key");
                    }
                );
            }
        }
    }
</script>
