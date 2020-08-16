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
                            <li><router-link :to="{ name: 'admin'}">Home</router-link></li>
                            <li><router-link :to="{ name: 'admin-create-client'}">Register Client</router-link></li>
                            <li><a>Clients</a></li>
                            <li><router-link :to="{ name: 'admin-resources'}">Resources</router-link></li>
                            <li><a>Users</a></li>
                        </ul>
                    </aside>
                </div>
            </div>
            <div class="column">
                <slot />
            </div>
        </div>
    </div>
</template>