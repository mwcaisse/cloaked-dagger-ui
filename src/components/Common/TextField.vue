<template>
    <div class="field">
        <label class="label">{{ name }}</label>
        <div class="control has-icons-left" :class="{'has-icons-right': hasError}">
            <input class="input is-large"
                   :class="{'is-danger': hasError}"
                   :type="type"
                   :placeholder="name"
                   v-model="value"
                   v-on:blur="validate"
            >
            <span class="icon is-left">
                <app-icon :icon="icon" />
            </span>
            <span class="icon is-right has-text-danger" v-if="hasError">
                <app-icon icon="exclamation-triangle" />
            </span>
        </div>
        <p class="help is-danger" v-for="error in errors" :key="error">
            {{ error }}
        </p>
    </div>
</template>

<script>

    import Icon from "@app/components/Common/Icon.vue"

    export default {
        name: "TextField",
        components: {
            "app-icon": Icon
        },
        data: function () {
            return {
                hasLostFocus: false,
                errors: []
            }
        },
        computed: {
            hasError: function () {
                return this.errors && this.errors.length > 0;
            }
        },
        props: {
            value: {
                 required: false
            },
            name: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: false,
                default: "text"
            },
            validator: {
                type: Function,
                required: false,
                default: function (val, name) {
                    return []; // empty list means no validation errors, populate list with validation errors
                }
            }
        },
        watch: {
            value (newValue) {
                this.$emit("input", newValue);

                // If we've lost focus already, we mind as well revalidate as typing
                if (this.hasLostFocus) {
                    this.validate();
                }
            }
        },
        methods: {
            validate() {
                this.hasLostFocus = true;
                this.errors = this.validator(this.value, this.name);
            }
        }

    }
</script>

<style scoped>

</style>