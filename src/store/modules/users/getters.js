export default {
    getUsers(state) {
        return state.users;
    },
    isUserRegistered(state, getters, _, rootGetters) {
        const users = state.users;
        const userId = rootGetters["auth/userId"];

        return users.some(user => user.id === userId);
    }
};
