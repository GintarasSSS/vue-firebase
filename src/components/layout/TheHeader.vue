<template>
    <header class="bg-primary text-white pt-3 pb-3">
        <nav class="container-xl d-flex flex-row justify-content-between">
            <router-link :to="{ name: 'home' }" class="btn btn-outline-light">Home</router-link>

            <ul class="list-unstyled row mb-0">
                <li class="col" v-if="isLoggedIn">
                    <router-link class="btn btn-light text-nowrap" :to="{ name: 'messages' }">All Messages</router-link>
                </li>
                <li class="col" v-if="!isLoggedIn">
                    <router-link class="btn btn-light" :to="{ name: 'auth' }">Login</router-link>
                </li>
                <li class="col" v-else>
                    <router-link class="btn btn-danger" to="/" @click.prevent="logout">Logout</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    import { computed } from "vue";
    import { useStore } from "vuex";

    export default {
        setup() {
            const store = useStore();

            const isLoggedIn = computed(() => {
                return store.getters['auth/isAuthenticated'];
            })

            const logout = () => {
                store.dispatch('auth/logout');
            };

            return {
                logout,
                isLoggedIn
            }
        }
    }
</script>
