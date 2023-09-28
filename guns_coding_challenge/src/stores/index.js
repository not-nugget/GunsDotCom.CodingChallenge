
import Vuex from "vuex";
import customers, { CustomersStore } from "./customers.store";
import toaster, { ToasterStore } from "./toaster.store";
import modal, { ModalStore } from "./modal.store";

export default new Vuex.Store({
    modules: {
        [CustomersStore]: customers,
        [ToasterStore]: toaster,
        [ModalStore]: modal,
    }
});