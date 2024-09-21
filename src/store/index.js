import { createStore } from 'vuex';

import authModule from '@/store/modules/auth/index';
import usersModule from '@/store/modules/users/index';

export default createStore({
    modules: {
      auth: authModule,
      users: usersModule
    }
});
