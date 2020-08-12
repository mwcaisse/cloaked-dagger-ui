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
                            <li><a>Register Client</a></li>
                            <li><a>Resources</a></li>
                            <li><a>Scopes</a></li>
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