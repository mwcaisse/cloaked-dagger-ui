<template>
    <div class="container">
        <div class="columns">
            <div class="column is-one-fifth">
                <div class="box">
                    <aside class="menu">
                        <p class="menu-label">
                            Administration
                        </p>
                        <ul class="menu-list">
                            <li>
                                <router-link :to="{ name: 'admin'}">
                                    Home
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'admin-client-create'}">
                                    Register Client
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'admin-clients'}">
                                    Clients
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'admin-resources'}">
                                    Resources
                                </router-link>
                            </li>
                            <li><a>Users</a></li>
                            <li>
                                <router-link :to="{ name: 'admin-user-registration-keys'}">
                                    User Registration Keys
                                </router-link>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
            <div class="column">
                <app-breadcrumbs />
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from "@app/components/Admin/Breadcrumbs.vue";

    export default {
        components: {
            "app-breadcrumbs": Breadcrumbs
        }
    }
</script>
