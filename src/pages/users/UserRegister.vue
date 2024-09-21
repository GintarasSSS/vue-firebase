<template>
    <div class="container-xl pt-5">
        <base-card>
            <form @submit.prevent="submitRegistrationForm">
                <div class="mb-3">
                    <label class="form-label" for="name">First Name</label>
                    <input class="form-control" type="text" id="name" name="name" placeholder="Name" v-model.trim="name"/>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="surname">Surname</label>
                    <input class="form-control" type="text" id="surname" name="surname" v-model.trim="surname"/>
                </div>

                <fieldset class="mb-3">
                    <legend>Colors</legend>

                    <div class="form-check">
                        <input class="form-check-input" value="primary" type="radio" name="color" id="color1" v-model.trim="color"/>
                        <label class="form-check-label" for="color1">
                            Blue
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" value="danger" type="radio" name="color" id="color2" v-model.trim="color"/>
                        <label class="form-check-label" for="color2">
                            Red
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" value="dark" type="radio" name="color" id="color3" v-model.trim="color"/>
                        <label class="form-check-label" for="color3">
                            Black
                        </label>
                    </div>
                </fieldset>

                <div class="mb-3" v-if="errors.length">
                    <div class="alert alert-danger">
                        <div v-for="(error, key)  in errors" :key="key">{{ error }}</div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        </base-card>
    </div>
</template>

<script>
    import {useStore} from "vuex";
    import BaseCard from "@/components/ui/BaseCard.vue";
    import {ref} from "vue";
    import {useRouter} from "vue-router";

    export default {
        components: {BaseCard},
        setup() {
            const name = ref('');
            const surname = ref('');
            const color = ref('');
            const errors = ref([]);

            const store = useStore();
            const router = useRouter();

            const validateForm = () => {
                let errors = [];

                if (name.value.length === 0 || surname.value.length === 0 || color.value.length === 0) {
                    errors.push('All fields are required');
                }

                return errors;
            };

            const submitRegistrationForm = async () => {
                errors.value = validateForm();

                if (errors.value.length > 0) {
                    return false;
                }

                try {
                    await store.dispatch('users/registerUser', {
                        name: name.value,
                        surname: surname.value,
                        color: color.value,
                    });

                    await router.replace({name: 'users'});
                } catch (err) {
                    console.log(err);
                }
            };

            return {
                submitRegistrationForm,
                name,
                surname,
                color,
                errors
            }
        }
    }
</script>
