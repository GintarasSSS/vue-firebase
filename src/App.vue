<template>
    <the-header></the-header>
    <router-view></router-view>
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
