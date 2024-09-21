import mutations from "@/store/modules/users/mutations";
import actions from "@/store/modules/users/actions";
import getters from "@/store/modules/users/getters";

export default {
    namespaced: true,
    state() {
        return {
            users: []
        }
    },
    mutations,
    actions,
    getters
}
