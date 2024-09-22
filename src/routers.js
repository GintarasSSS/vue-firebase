import { createRouter, createWebHistory } from 'vue-router';

import UserAuth from './pages/auth/UserAuth.vue';
import store from './store';
import TheUsers from "@/pages/users/UsersList.vue";
import UserRegister from "@/pages/users/UserRegister.vue";
import MessageUser from "@/pages/messages/MessageUser.vue";
import MessagesReceived from "@/pages/messages/MessagesReceived.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'home', path: '/', redirect: '/users' },
        { name: 'users', path: '/users', component: TheUsers },
        { name: 'register', path: '/register', component: UserRegister, meta: { requireAuth: true } },
        { name: 'contact', path: '/user/:id/contact', component: MessageUser, props: true },
        { name: 'messages', path: '/messages', component: MessagesReceived, meta: { requireAuth: true } },
        { name: 'auth', path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
        { name: 'notfound', path: '/:notFound(.*)', component: {} }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !store.getters["auth/isAuthenticated"]) {
        next({ name: 'auth' });
    } else if (to.meta.requiresUnAuth && store.getters["auth/isAuthenticated"]) {
        next({ name: 'users' });
    } else {
        next();
    }
});

export default router;
