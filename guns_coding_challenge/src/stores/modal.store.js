
/** The namespace of the purchases store */
export const ModalStore = "modal";

export default {
    namespaced: true,
    state: {
        title: "",
        content: "",
        buttons: [],
    },
    actions: {
        updateModal: ({ commit }, options) => commit("UPDATE_MODAL", options)
    },
    mutations: {
        UDATE_MODAL: (state, { title, content, buttons }) => {
            state.title = title;
            state.content = content;
            state.buttons = buttons;
        }
    },
};