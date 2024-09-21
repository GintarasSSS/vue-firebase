<template>
    <div class="d-flex flex-row align-items-center">
        <h6 class="mb-0 me-3">User Color Filter</h6>

        <ul class="list-unstyled mb-0 d-flex">
            <li class="form-check mb-0">
                <input class="form-check-input" type="checkbox" value="primary" id="color1" checked @change="setFilter"/>
                <label class="form-check-label text-primary" for="color1">
                    Blue
                </label>
            </li>
            <li class="form-check mb-0 ms-3">
                <input class="form-check-input" type="checkbox" value="danger" id="color2" checked @change="setFilter"/>
                <label class="form-check-label text-danger" for="color2">
                    Red
                </label>
            </li>
            <li class="form-check mb-0 ms-3">
                <input class="form-check-input" type="checkbox" value="dark" id="color3" checked @change="setFilter"/>
                <label class="form-check-label text-dark" for="color3">
                    Black
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
    import {reactive} from "vue";

    export default {
        emits: ['change-filter'],
        setup(props, context) {
            const filters = reactive({
                primary: true,
                danger: true,
                dark: true
            });

            const setFilter = (event) => {
                filters[event.target.value] = event.target.checked;

                context.emit('change-filter', filters);
            };

            return {
                setFilter
            }
        }
    }
</script>
