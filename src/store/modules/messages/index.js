import mutations from "@/store/modules/messages/mutations";
import actions from "@/store/modules/messages/actions";
import getters from "@/store/modules/messages/getters";

export default {
    namespaced: true,
    state() {
        return {
            messages: []
        }
    },
    mutations,
    actions,
    getters
}
