import axios from "axios";

export default {
    async registerUser(context, payload) {
        const userId = context.rootGetters['auth/userId'];
        const token = context.rootGetters['auth/token'];
        const url = `https://vue-firebase-1c169-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${token}`;

        try {
            await axios.put(url, {
                body: payload
            });

            context.commit(
                'registerUser',
                {
                    ...payload,
                    id: userId
                }
            );
        } catch (err) {
            const message = err.response.data.message || 'Registration Failed.';

            throw new Error(message);
        }
    },
    async loadUsers(context) {
        const url = `https://vue-firebase-1c169-default-rtdb.europe-west1.firebasedatabase.app/users.json`;

        const users = [];

        try {
            const usersList = await axios.get(url);

            if (usersList.data && Object.keys(usersList.data).length > 0) {
                for (const key in usersList.data) {
                    users.push({
                        id: key,
                        ...usersList.data[key].body
                    });
                }
            }
        } catch (err) {
            const message = err.response.data.message || 'Failed load users.';

            throw new Error(message);
        }

        context.commit('setUsers', users);
    }
};
