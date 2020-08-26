<template>
    <div>
        <div class="control" :class="{'has-icons-right': hasError, 'has-icons-left': hasIcon}">
            <input class="input"
                   :class="{'is-danger': hasError}"
                   :type="type"
                   :placeholder="name"
                   :readonly="readonly"
                   v-model="value"
                   v-on:blur="validate"
                   v-on:keyup.enter="$emit('enter_pressed')"
                   v-if="isTextField"
            >
            <textarea class="textarea"
                      :placeholder="name"
                      :rows="height"
                      :readonly="readonly"
                      v-if="isTextArea"
                      v-model="value"
            >
            </textarea>
            <div class="select" v-if="isConstantPicker">
                <select v-model="value">
                    <option v-for="option in options" :value="option">
                        {{ option | friendlyConstant(friendlyConstant)}}
                    </option>

                </select>
            </div>
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
    import * as Constants from "@app/services/Constants";

    import Icon from "@app/components/Common/Icon.vue";
    import TextInputFieldMixin from "@app/components/Common/TextInputFieldMixin";

    export default {
        name: "TextInputField",
        mixins: [
            TextInputFieldMixin
        ],
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