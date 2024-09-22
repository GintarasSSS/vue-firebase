import axios from "axios";

export default {
    async sendMessage(context, payload) {
        const userId = payload.userId;
        const url = `https://vue-firebase-1c169-default-rtdb.europe-west1.firebasedatabase.app/messages/${userId}.json`;

        try {
            await axios.post(url, payload);

            context.commit(
                'addMessage',
                payload
            );
        } catch (err) {
            const message = err.response.data.message || 'Registration Failed.';

            throw new Error(message);
        }
    },
    async loadMessages(context) {
        const userId = context.rootGetters['auth/userId'];
        const token = context.rootGetters['auth/token'];
        const url = `https://vue-firebase-1c169-default-rtdb.europe-west1.firebasedatabase.app/messages/${userId}.json?auth=${token}`;

        const messages = [];

        try {
            const messagesList = await axios.get(url);

            if (messagesList.data && Object.keys(messagesList.data).length > 0) {
                for (const key in messagesList.data) {
                     messages.push({
                         id: key,
                         ...messagesList.data[key]
                     });
                }
            }
        } catch (err) {
            const message = err.response.data.message || 'Failed to fetch messages.';

            throw new Error(message);
        }

        context.commit('setMessages', messages);
    }
};
