<template>
    <div class="field is-horizontal" v-if="isHorizontal">
        <div class="field-label is-normal">
            <label class="label">{{ name }}</label>
        </div>
        <div class="field-body">
            <div class="field">
                <app-text-input-field v-model="value" v-bind="$props" />
            </div>
        </div>
    </div>
    <div class="field" v-else>
        <label class="label">{{ name }}</label>
        <app-text-input-field v-model="value" v-bind="$props" />
    </div>
</template>

<script>

    import Icon from "@app/components/Common/Icon.vue"

    import TextInputField from "@app/components/Common/TextInputField.vue";
    import TextInputFieldMixin from "@app/components/Common/TextInputFieldMixin";

    export default {
        name: "TextField",
        mixins: [
            TextInputFieldMixin
        ],
        components: {
            "app-icon": Icon,
            "app-text-input-field": TextInputField
        },
        computed: {
            isHorizontal() {
                return this.horizontal === true;
            }
        },
        props: {
            horizontal: {
                type: Boolean,
                default: false,
                required: false
            }
        }

    }
</script>
