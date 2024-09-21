import axios from "axios";

let timer;

export default {
    async authenticate(context, payload) {
        const key = 'AIzaSyBYjmoKzXa6hcQPCuccLUmQTSilWGxmlpU';
        const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        const signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

        const url = (payload.mode === 'login' ? loginUrl : signupUrl) + key;

        try {
            const response = await axios.post(url, {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            });

            const expiresIn = +response.data.expiresIn * 1000;
            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('tokenExpiration', expirationDate);

            timer = setTimeout(() => {
                context.dispatch('autoLogout');
            }, expiresIn);

            context.commit(
                'setUser',
                {
                    userId: response.data.localId,
                    token: response.data.idToken
                }
            );
        } catch (err) {
            let message = err.response.data.error.message || 'Failed to authenticate. Check your login data.';

            if (err.response.data.error.message && err.response.data.error.message === 'EMAIL_EXISTS') {
                message = `Email "${payload.email}" already exists.`;
            }

            if (err.response.data.error.message && err.response.data.error.message === 'INVALID_LOGIN_CREDENTIALS') {
                message = `You have entered an invalid email or password`;
            }

            throw new Error(message);
        }
    },
    tryLogin (context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                userId: userId,
                token: token
            });
        }
    },
    logout (context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            userId: null,
            token: null
        });
    },
    autoLogout (context) {
        context.dispatch('logout');
    }
}
