<template>
    <the-header></the-header>
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";
import { useStore } from "vuex";

export default {
    components: {
        TheHeader
    },
    setup() {
        const store = useStore();

        store.dispatch('auth/tryLogin');
    }
}
</script>

<style>
    .route-enter-from {
        opacity: 0;
        transform: translateY(-30px);
    }

    .route-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

    .route-enter-active {
        transition: all 0.3s ease-out;
    }

    .route-leave-active {
        transition: all 0.3s ease-in;
    }

    .route-enter-to,
    .route-leave-from {
        opacity: 1;
        transform: translateY(0);
    }
</style>
