<template>
    <div class="container-xl pt-5">
        <base-card class="mb-5">
            <div v-if="messagesReceived.length">
                <base-card v-for="message in messagesReceived" :key="message.id" class="mb-1">
                    <h5 class="card-title mb-2">{{ message.email }}</h5>

                    {{ message.message }}
                </base-card>
            </div>

            <base-card v-else class="text-center">
                Messages List is empty....
            </base-card>
        </base-card>
    </div>
</template>

<script>
    import {computed} from "vue";
    import {useStore} from "vuex";

    export default {
        setup() {
            const store = useStore();

            const messagesReceived = computed(() => {
                return store.getters['messages/getMessages'];
            });

            store.dispatch('messages/loadMessages');

            return {
                messagesReceived
            }
        }
    }
</script>
