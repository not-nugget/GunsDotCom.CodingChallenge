/* eslint-disable no-unused-vars */

import { CustomerService } from "../services/customers.service";

import PageRequest from "../models/PageRequest";
import Page from "../models/Page";

/** The namespace of the Customers store */
export const CustomersStore = "customers";

export default {
    namespaced: true,
    state: {
        rawData: [],
        pagedData: new Page([], 20, 1),
        lastPageRequest: null,
        selections: {},
    },
    actions: {
        createCustomer: ({ commit, dispatch }, customer) =>{
            const created = CustomerService.addCustomer(customer);
            commit("CREATE_CUSTOMER", created) 
            dispatch("getPagedData", null);
        },
        modifyCustomer: ({ commit, dispatch }, customer) => { 
            const updated = CustomerService.editCustomer(customer.id, customer);
            commit("MODIFY_CUSTOMER", updated) 
            dispatch("getPagedData", null);
        },
        deleteCustomer: ({ commit, dispatch }, customerId) => {
            const deleted = CustomerService.deleteCustomer(customerId);
            commit("DELETE_CUSTOMER", deleted);
            dispatch("getPagedData", null);
        },
        
        toggleSelectAll: ({ commit }) => commit("TOGGLE_SELECT_ALL"),
        toggleSelection: ({ commit }, customer) => commit("TOGGLE_SELECTION", customer),
        deleteSelectedCustomers: ({ commit, dispatch, state }) => {
            CustomerService.bulkDeleteCustomers(Object.keys(state.selections));
            commit("DELETE_SELECTED_CUSTOMERS");
            dispatch("getPagedData", null);
        },

        deleteAllCustomers: ({ commit, dispatch }) => {
            CustomerService.deleteAllCustomers();
            commit("DELETE_ALL_CUSTOMERS");
            dispatch("getPagedData", null);
        },

        getPagedData: ({ commit }, pageRequest) => {
            commit("SET_RAW_DATA", CustomerService.getCustomers());
            commit("GET_PAGED_DATA", pageRequest); 
        },
    },
    mutations: {
        // eslint-disable-next-line no-self-assign
        CREATE_CUSTOMER: (state, customer) => { state.rawData.push(customer); state.rawData = state.rawData; }, //Self-assign will kick in reactivity that .push will not
        MODIFY_CUSTOMER: (state, customer) => { 
            for(let i = 0; i < state.rawData.length; i++) {
                if(state.rawData.id !== customer.id) continue;
                
                state.rawData[i] = customer;
                state.rawData = [ ...state.rawData ];
                return;
            } 
        },
        DELETE_CUSTOMER: (state, customerId) => state.rawData = state.rawData.filter(x => x.id !== customerId),

        TOGGLE_SELECT_ALL : (state) => {
            if(Object.keys(state.selections).length !== 0) {
                state.selections = {};
                return;
            }
            state.pagedData.data.forEach(data => state.selections[data.id] = data);
            state.selections = { ...state.selections };
        },
        TOGGLE_SELECTION: (state, customer) => {
            if (customer.id in state.selections) {
                delete state.selections[customer.id];
                state.selections = { ...state.selections };
                return;
            }
            state.selections = { ...state.selections, [customer.id]: customer };
        },
        DELETE_SELECTED_CUSTOMERS: (state) => {
            state.rawData = state.rawData.filter(x => !(x.id in state.selections));
            state.selections = {};
        },

        DELETE_ALL_CUSTOMERS: (state) => {
            state.rawData = [];
            state.pagedData = new Page([], state.pagedData.records, 1);
        },

        SET_RAW_DATA: (state, rawData) => { state.rawData = rawData; },
        /** Updates the store with the paged data that matches pageRequest
         *  @param {PageRequest} pageRequest */
        GET_PAGED_DATA: (state, pageRequest) => {
            if(!pageRequest) pageRequest = state.lastPageRequest;

            const index = (pageRequest.page - 1) * pageRequest.records;
            const count = index + pageRequest.records;
            const lastPage = Math.ceil(state.rawData.length / pageRequest.records); 
            const data = state.rawData.slice(index, count);
            state.pagedData = new Page(data, pageRequest.page, lastPage);
            state.lastPageRequest = pageRequest;
        }
    },
    getters: {
        isSelected: (state) => (customer) => customer.id in state.selections,
    },
};