<template>
    <tr>
        <th scope="row" class="select form-check-input align-middle"><input @click="toggleSelect" type="checkbox" :checked="isSelected(customer)"/></th>
        <td>{{ customer.name }}</td>
        <td>{{ customer.email }}</td>
        <td>{{ customer.phone }}</td>
        <td>{{ address.line1 }}</td>
        <td>{{ address.line2 }}</td>
        <td>{{ address.city }}</td>
        <td>{{ address.state }}</td>
        <td>{{ address.zip }}</td>
        <td class="actions">
            <button :data-bs-target="`#${modifyModalId}`" data-bs-toggle="modal" class="btn btn-primary">Modify</button>&nbsp;
            <button :data-bs-target="`#${deleteModalId}`" data-bs-toggle="modal" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button>
        </td>
    </tr>
    <CustomerFormModal :editModel="customer" :id="modifyModalId" />
    <Modal :id="deleteModalId">
        <template #title>Delete "{{ customer.name }}"?</template>
        <template #body>Are you sure you want to delete "{{ customer.name }}"? All data associated with this customer will be irrevocably lost.</template>
        <template #footer>
            <ModalButton class="btn-secondary" dismiss>Cancel Delete</ModalButton>
            <ModalButton
                @click="confirmCustomerDelete"
                class="btn-danger"
                dismiss>
                Delete Customer
            </ModalButton>
        </template>
    </Modal>
</template>

<script>
import { defineComponent } from 'vue';
import { createNamespacedHelpers } from 'vuex';
import { CustomersStore } from '../../stores/customers.store';
import Customer from "../../models/Customer.js";
import CustomerFormModal from '../Modal/CustomerFormModal.vue';
import Modal from '../Modal/Modal.vue';
import ModalButton from '../Modal/ModalButton.vue';

const { mapActions, mapGetters } = createNamespacedHelpers(CustomersStore);

export default defineComponent({
    name: "Customer Column",
    components: { Modal, ModalButton, CustomerFormModal },
    props: {
        /** The Customer to display. Required
         *  @type {Customer} */
        customer: { type: Customer, required: true },
    },
    computed: {
        address() { return this.customer.address; },
        customerId() { return this.customer.id; },
        deleteModalId() { return `modal-delete-${this.customer.id}`; },
        modifyModalId() { return `modal-modify-${this.customer.id}`; }
    },
    methods: {
        ...mapGetters([ "isSelected" ]),
        ...mapActions(["toggleSelection", "deleteCustomer",]),
        toggleSelect() { this.toggleSelection(this.customer); },
        confirmCustomerDelete() { this.deleteCustomer(this.customerId); },
        modifyCustomer() { console.log("nyi"); },
        isSelected(customer) { return this.$store.getters[`${CustomersStore}/isSelected`](customer); }
    },
});
</script>