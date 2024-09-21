<template>
    <teleport to="body">
        <div
            class="modal"
            tabindex="-1"
            v-show="show"
        >
            <transition name="dialog">
                <div class="modal-dialog modal-dialog-centered" v-show="show">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">{{ title }}</h1>
                            <button type="button" class="btn-close" aria-label="Close" @click="dialogClose"></button>
                        </div>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="dialogClose">Close</button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script>
    export default {
        props: ['title', 'show'],
        emits: ['close'],
        setup(props, context) {
            const dialogClose = () => {
                context.emit("close");
            };

            return {
                dialogClose,
            }
        }
    }
</script>

<style scoped>
    .modal {
        display: block;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .dialog-enter-from,
    .dialog-leave-to {
        opacity: 0;
        transform: scale(0.8);
    }

    .dialog-enter-active {
        transition: all 0.3s ease-out;
    }

    .dialog-leave-active {
        transition: all 0.3s ease-in;
    }

    .dialog-enter-to,
    .dialog-leave-from {
        opacity: 1;
        transform: scale(1);
    }
</style>
