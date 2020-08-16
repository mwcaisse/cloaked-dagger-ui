
export default {
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
    }
}