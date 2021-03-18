<template>
    <font-awesome-icon
        :icon="['fas', icon]"
        :class="{'action-icon': action }"
        :size="size"
        prefix="fas"
    />
</template>

<script>

    /*
     * Add all of the fontawesome icons
     * TODO: Figure out if I always want to load the icons
     *       or do it on a module by module basis, for now this works
     */
    import {library} from "@fortawesome/fontawesome-svg-core"
    import {fas} from "@fortawesome/free-solid-svg-icons"
    import {far} from "@fortawesome/free-regular-svg-icons"
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

    library.add(fas);
    library.add(far);

    export default {
        name: "AppIcon",
        components: {
            "font-awesome-icon": FontAwesomeIcon
        },
        props: {
            icon: {
                type: String,
                required: true
            },
            action: {
                type: Boolean,
                required: false,
                default: false
            },
            size: {
                type: String,
                required: false,
                default: "lg"
            }
        },
        data: function() {
            return { }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .action-icon:hover {
        transform: scale(1.5);
        cursor: pointer;
    }
</style>
