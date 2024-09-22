<template>
    <div class="container-xl pt-5">
        <base-card>
            <form @submit.prevent="submitUserMessage">
                <div class="mb-3">
                    <label class="form-label" for="email">Email</label>
                    <input class="form-control" type="email" id="email" name="email" placeholder="name@example.com" v-model.trim="email" />
                </div>
                <div class="mb-3">
                    <label class="form-label" for="meassage">Message</label>
                    <textarea class="form-control" id="meassage" name="message" v-model.trim="message" rows="5"></textarea>
                </div>

                <div class="mb-3" v-if="errors.length">
                    <div class="alert alert-danger">
                        <div v-for="(error, key) in errors" :key="key">{{ error }}</div>
                    </div>
                </div>

                <button class="btn btn-primary" type="submit">Send Message</button>
            </form>
        </base-card>
    </div>
</template>

<script>
    import {ref} from "vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    export default {
        props: ['id'],
        setup(props) {
            const email = ref('');
            const message = ref('');
            const errors = ref([]);
            const store = useStore();
            const router = useRouter();

            const validateForm = () => {
                let errors = [];

                if (email.value.length === 0 || !email.value.includes('@')) {
                    errors.push('Email is incorrect.');
                }

                if (message.value.length === 0) {
                    errors.push('Message is required.');
                }

                return errors;
            };

            const submitUserMessage = async () => {
                errors.value = validateForm();

                try {
                    await store.dispatch(
                        'messages/sendMessage',
                        {
                            userId: props.id,
                            email: email.value,
                            message: message.value
                        }
                    );

                    await router.replace({ name: 'home' });
                } catch (err) {
                    console.log(err);
                }
            };

            return {
                submitUserMessage,
                email,
                message,
                errors
            }
        }
    }
</script>
