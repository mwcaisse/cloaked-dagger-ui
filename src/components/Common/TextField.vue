<template>
    <div class="field">
        <label class="label">{{ name }}</label>
        <div class="control" :class="{'has-icons-right': hasError, 'has-icons-left': hasIcon}">
            <input class="input"
                   :class="{'is-danger': hasError}"
                   :type="type"
                   :placeholder="name"
                   :readonly="readonly"
                   v-model="value"
                   v-on:blur="validate"
                   v-on:keyup.enter="$emit('enter_pressed')"
                   v-if="!isTextArea"
            >
            <textarea class="textarea"
                      :rows="height"
                      :readonly="readonly"
                      v-if="isTextArea"
            >
            </textarea>
            <span class="icon is-left" v-if="hasIcon">
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
            },
            hasIcon() {
                return !!this.icon;
            },
            isTextArea() {
                return this.height > 1;
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
                required: false,
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
            },
            height: {
                type: Number,
                default: 1,
                required: false
            },
            readonly: {
                type: Boolean,
                default: false,
                required: false
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