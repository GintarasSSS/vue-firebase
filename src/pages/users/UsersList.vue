<template>
    <div class="container-xl pt-5">
        <base-card class="mb-5">
            <user-filter @change-filter="setFilter"></user-filter>
        </base-card>

        <base-card class="mb-5">
            <base-card class="mb-3">
                <div class="d-flex flex-nowrap justify-content-between">
                    <button type="button" class="btn btn-secondary" @click="loadUsers">Refresh</button>

                    <div>
                        <router-link :to="{ name: 'auth'}" class="btn btn-outline-primary" v-if="!isLoggedIn">Login to Register as User</router-link>
                        <router-link :to="{ name: 'register' }" class="btn btn-primary" v-if="isLoggedIn && !isUserRegistered">Register as User</router-link>
                    </div>
                </div>
            </base-card>

            <div v-if="filteredUsers.length">
                <base-card v-for="user in filteredUsers" :key="user.id" class="mb-1" :class="getBorderColor(user.color)">
                    <div class="d-flex flex-nowrap justify-content-between align-items-center">
                        <h5 class="card-title mb-0">{{ user.name }} {{ user.surname }}</h5>
                        <router-link :to="{ name: 'contact', params: { id: user.id } }" class="btn" :class="getButtonColor(user.color)">Write a Message</router-link>
                    </div>
                </base-card>
            </div>
            <base-card v-else class="text-center">
                Registered User List is empty....
            </base-card>
        </base-card>
    </div>
</template>

<script>
    import {computed, reactive} from "vue";
    import {useStore} from "vuex";

    import UserFilter from "@/pages/users/UserFilter.vue";

    export default {
        components: {
            UserFilter
        },
        setup() {
            const store = useStore();

            const filters = reactive({
                primary: true,
                danger: true,
                dark: true
            });

            const isLoggedIn = computed(() => {
                return store.getters['auth/isAuthenticated'];
            });

            const isUserRegistered = computed(() => {
                return store.getters['users/isUserRegistered'];
            });

            const filteredUsers = computed(() => {
                const users = store.getters['users/getUsers'];

                return users.filter((user) => {
                    return filters[user.color];
                });
            });

            const getBorderColor = (color) => {
                return 'border-' + color;
            };

            const getButtonColor = (color) => {
                return 'btn-' + color;
            };

            const setFilter = (_filters) => {
                for (const key in _filters) {
                    filters[key] = _filters[key];
                }
            };

            const loadUsers = () => {
                store.dispatch('users/loadUsers');
            };

            store.dispatch('users/loadUsers');

            return {
                loadUsers,
                getBorderColor,
                getButtonColor,
                setFilter,
                isUserRegistered,
                isLoggedIn,
                filteredUsers
            }
        }
    }
</script>
