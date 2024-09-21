<template>
    <div class="container-xl pt-5">
        <base-dialog :show="!!authError" title="An error occurred" @close="handleClose">
            <div>{{ authError }}</div>
        </base-dialog>

        <base-card>
            <form @submit.prevent="submitAuthForm">
                <div class="mb-3">
                    <label class="form-label" for="email">Email</label>
                    <input class="form-control" type="email" id="email" name="email" placeholder="name@example.com" v-model.trim="email" />
                </div>
                <div class="mb-3">
                    <label class="form-label" for="password">Password</label>
                    <input class="form-control" type="password" id="password" name="password" v-model.trim="password"/>
                </div>
                <div class="mb-3" v-if="isSignUpMode">
                    <label class="form-label" for="confirm-password">Confirm Password</label>
                    <input class="form-control" type="password" id="confirm-password" name="confirm-password" v-model.trim="confirmPassword"/>
                </div>

                <div class="mb-3" v-if="errors.length">
                    <div class="alert alert-danger">
                        <div v-for="(error, key)  in errors" :key="key">{{ error }}</div>
                    </div>
                </div>

                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">{{ submitButtonCaption }}</button>
                    <a href="#" class="ms-5 btn btn-outline-secondary" @click.prevent="switchAuthMode">{{ switchModeTitle }}</a>
                </div>
            </form>
        </base-card>
    </div>
</template>

<script>
    import { ref, computed } from "vue";
    import { useStore } from "vuex";
    import { useRouter} from "vue-router";

    export default {
        setup() {
            const mode = ref('login');
            const email = ref('');
            const password = ref('');
            const confirmPassword = ref('');
            const errors = ref([]);
            const authError = ref(null);
            const store = useStore();
            const router = useRouter();

            const switchAuthMode = () => {
                mode.value = mode.value === 'login' ? 'signup' : 'login';
            };

            const validateForm = () => {
                let errors = [];

                if (email.value.length === 0 || !email.value.includes('@')) {
                    errors.push('Email is incorrect.');
                }

                if (password.value.length < 6) {
                    errors.push('Password is less than 6 characters.');
                }

                if (isSignUpMode.value && password.value !== confirmPassword.value) {
                    errors.push('Passwords do not match');
                }

                return errors;
            };

            const submitAuthForm = async () => {
                errors.value = validateForm();

                if (errors.value.length > 0) {
                    return false;
                }

                try {
                    await store.dispatch('auth/authenticate', {
                        email: email.value,
                        password: password.value,
                        mode: mode.value,
                    });

                    await router.replace({ name: 'home' });
                } catch (err) {
                    authError.value = err.message;
                }
            };

            const handleClose = () => {
                authError.value = null;
            };

            const isSignUpMode = computed(() => {
                return mode.value !== 'login';
            });

            const switchModeTitle = computed(() => {
                return mode.value === 'login' ? 'Signup instead' : 'Login instead';
            });

            const submitButtonCaption = computed(() => {
                return mode.value === 'signup' ? 'Signup' : 'Login';
            });

            return {
                switchAuthMode,
                submitAuthForm,
                handleClose,
                switchModeTitle,
                submitButtonCaption,
                isSignUpMode,
                errors,
                password,
                email,
                confirmPassword,
                authError
            }
        }
    }
</script>
