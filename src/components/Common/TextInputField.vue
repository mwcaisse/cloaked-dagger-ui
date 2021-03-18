<template>
    <div>
        <div
            class="control"
            :class="{'has-icons-right': hasError, 'has-icons-left': hasIcon}"
        >
            <input
                v-if="isTextField"
                v-model="value"
                class="input"
                :class="{'is-danger': hasError}"
                :type="type"
                :placeholder="name"
                :readonly="readonly"
                @blur="validate"
                @keyup.enter="$emit('enter_pressed')"
            >
            <textarea
                v-if="isTextArea"
                v-model="value"
                class="textarea"
                :placeholder="name"
                :rows="height"
                :readonly="readonly"
            />
            <div
                v-if="isConstantPicker"
                class="select"
            >
                <select v-model="value">
                    <option
                        v-for="option in options"
                        :value="option"
                    >
                        {{ option | friendlyConstant(friendlyConstant) }}
                    </option>
                </select>
            </div>
            <span
                v-if="hasIcon"
                class="icon is-left"
            >
                <app-icon :icon="icon" />
            </span>
            <span
                v-if="hasError"
                class="icon is-right has-text-danger"
            >
                <app-icon icon="exclamation-triangle" />
            </span>
        </div>
        <p
            v-for="error in errors"
            :key="error"
            class="help is-danger"
        >
            {{ error }}
        </p>
    </div>
</template>

<script>
    import * as Constants from "@app/services/Constants";

    import Icon from "@app/components/Common/Icon.vue";
    import TextInputFieldMixin from "@app/components/Common/TextInputFieldMixin";

    export default {
        name: "TextInputField",
        components: {
            "app-icon": Icon
        },
        mixins: [TextInputFieldMixin],
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
                return Boolean(this.icon);
            },
            isTextField() {
                return this.fieldType === "text";
            },
            isTextArea() {
                return this.fieldType === "textarea";
            },
            isConstantPicker() {
                return this.fieldType === "constantPicker";
            },
            options() {
                if (!this.isConstantPicker) {
                    return [];
                }
                return Constants[this.constant];
            }
        },
        watch: {
            value(newValue) {
                this.$emit("input", newValue);

                //If we've lost focus already, we mind as well revalidate as typing
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