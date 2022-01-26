<template>
    <nav
        class="breadcrumb has-arrow-separator is-medium"
        aria-label="breadcrumbs"
    >
        <ul>
            <li
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="breadcrumb.id"
                :class="{'is-active': breadcrumb.clickable === false || index === breadcrumbs.length - 1 }"
            >
                <router-link :to="{ name: breadcrumb.id }">
                    {{ breadcrumb.name }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    const BREADCRUMBS_MAP = {
        "admin-base": [
            {
                id: "admin",
                name: "Admin"
            }
        ]
    };

    let createBreadcrumb = function (base, breadcrumb) {
        let arr = BREADCRUMBS_MAP[base].slice();
        arr.push(breadcrumb)
        return arr;
    }

    BREADCRUMBS_MAP.admin = createBreadcrumb("admin-base", {
        id: "admin",
        name: "Home",
        clickable: false
    });

    BREADCRUMBS_MAP["admin-clients"] = createBreadcrumb("admin-base", {
        id: "admin-clients",
        name: "Clients"
    });

    BREADCRUMBS_MAP["admin-client-create"] = createBreadcrumb("admin-clients", {
        id: "admin-client-create",
        name: "Create Client"
    });

    BREADCRUMBS_MAP["admin-client-edit"] = createBreadcrumb("admin-clients", {
        id: "admin-client-edit",
        name: "Edit Client"
    });

    BREADCRUMBS_MAP["admin-resources"] = createBreadcrumb("admin-base", {
        id: "admin-resources",
        name: "Resources"
    });

    BREADCRUMBS_MAP["admin-resource-create"] = createBreadcrumb("admin-resources", {
        id: "admin-resource-create",
        name: "Create Resource"
    });

    BREADCRUMBS_MAP["admin-resource-edit"] = createBreadcrumb("admin-resources", {
        id: "admin-resource-edit",
        name: "Edit Resource"
    });

    BREADCRUMBS_MAP["admin-user-registration-keys"] = createBreadcrumb("admin-base", {
        id: "admin-user-registration-keys",
        name: "User Registration Keys"
    });

    export default {
        computed: {
            breadcrumbs: function () {
                let routeName = this.$route.name;
                if (BREADCRUMBS_MAP.hasOwnProperty(routeName)) {
                    return BREADCRUMBS_MAP[routeName];
                }
                //default to admin
                return BREADCRUMBS_MAP.admin;
            }
        }
    }
</script>

<style scoped>
    .breadcrumb {
        padding-top: 1.25rem;
        padding-right: 1.25rem;
        /*padding-left: 1.25rem;*/
    }
</style>
