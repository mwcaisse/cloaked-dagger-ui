
/*
 * TODO: Revisit how we are allowing different types of fields.
 *   We could have a better name for this and probably a better way of defining all of these props?
 */
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
            required: false
        },
        fieldType: {
            type: String,
            required: false,
            default: "text"
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
                return []; //empty list means no validation errors, populate list with validation errors
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
        },
        constant: {
            type: String,
            required: false,
            default: null
        },
        //required because this is actually different from constant
        friendlyConstant: {
            type: String,
            required: false,
            default: null
        }
    }
}