<template>
    <div class="box">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <span class="label">
                        Key
                    </span>
                    <div class="field has-addons">
                        <div class="control is-expanded has-icons-left">
                            <input
                                class="input"
                                type="text"
                                v-model="key"
                                placeholder="Key"
                            >
                            <span class="icon is-left">
                                <app-icon icon="key" />
                            </span>
                        </div>
                        <div class="control">
                            <a
                                class="button"
                                @click.prevent="generateKey"
                            >
                                <app-icon icon="cog" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-one-quarter">
                <span class="label">
                    Number of Uses
                </span>
                <div class="field">
                    <div class="control has-icons-left">
                        <input
                            class="input"
                            type="number"
                            v-model="numberOfUses"
                            placeholder="Number of Uses"
                        >
                        <span class="icon is-left">
                            <app-icon icon="coins" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <a
                    class="button"
                    @click.prevent="clear"
                >
                    Cancel
                </a>
            </div>
            <div class="control">
                <a class="button is-link" @click.prevent="create">
                    Create
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import {UserRegistrationKeyService} from "@app/services/ApplicationProxy.js";

    import Icon from "@app/components/Common/Icon.vue";

    const userRegistrationKeyService = new UserRegistrationKeyService();

    export default {
        components: {
            "app-icon": Icon
        },
        data() {
            return {
                key: "",
                numberOfUses: 1
            }
        },
        methods: {
            generateKey() {
                this.key = crypto.randomUUID();
            },
            clear() {
                this.key = "";
                this.numberOfUses = 1;
            },
            create() {
                const vm = this.toViewModel();
                userRegistrationKeyService.create(vm).then(
                    res => {
                        this.clear()
                        this.$emit("user-registration-key-created", res);
                    },
                    () => {
                        console.log("omg it didn't work");
                    }
                )
            },
            toViewModel() {
                return {
                    key: this.key,
                    uses: this.numberOfUses
                }
            }
        }
    }
</script>


