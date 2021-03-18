<template>
    <div
        v-if="isHorizontal"
        class="field is-horizontal"
    >
        <div class="field-label is-normal">
            <label class="label">{{ name }}</label>
        </div>
        <div class="field-body">
            <div class="field">
                <app-text-input-field
                    v-model="value"
                    v-bind="$props"
                />
            </div>
        </div>
    </div>
    <div
        v-else
        class="field"
    >
        <label class="label">{{ name }}</label>
        <app-text-input-field
            v-model="value"
            v-bind="$props"
        />
    </div>
</template>

<script>

    import Icon from "@app/components/Common/Icon.vue"

    import TextInputField from "@app/components/Common/TextInputField.vue";
    import TextInputFieldMixin from "@app/components/Common/TextInputFieldMixin";

    export default {
        name: "TextField",
        components: {
            "app-icon": Icon,
            "app-text-input-field": TextInputField
        },
        mixins: [TextInputFieldMixin],
        props: {
            horizontal: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        computed: {
            isHorizontal() {
                return this.horizontal === true;
            }
        },
        watch: {
            value(newValue) {
                this.$emit("input", newValue);
            }
        }

    }
</script>
