<template>
    <thead>
        <tr>
            <th scope="col" class="select text-center form-check-input align-bottom"><input @click="toggleSelectAll" type="checkbox" ref="masterCheck"/></th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone #</th>
            <th scope="col">Address Line 1</th>
            <th scope="col">Address Line 2</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Zip</th>
            <th scope="col" class="actions">
                <button class="btn btn-primary" data-bs-target="#modal-customer-create" data-bs-toggle="modal">Add Customer</button>&nbsp;
                <button :class="{disabled: !hasSelections}" class="btn btn-danger" data-bs-target="#modal-selections-delete" data-bs-toggle="modal">Delete Selected</button>
            </th>
        </tr>
    </thead>
    <Modal id="modal-selections-delete">
        <template #title>Delete {{ customersString }}?</template>
        <template #body>Are you sure you want to delete {{ customersString }}? All data associated with {{ selectionCount === 1 ? "this": "these" }} customer{{ selectionCount === 1 ? "" : "s" }} will be irrevocably lost.</template>
        <template #footer>
            <ModalButton class="btn-secondary" dismiss>Cancel Delete</ModalButton>
            <ModalButton
                @click="deleteSelectedCustomers"
                class="btn-danger"
                dismiss>
                Delete {{ selectionCount }} Customers
            </ModalButton>
        </template>
    </Modal>
</template>

<script>
import { defineComponent } from 'vue';
import { createNamespacedHelpers }from "vuex";
import { CustomersStore } from '../../stores/customers.store';
import Modal from '../Modal/Modal.vue';
import ModalButton from '../Modal/ModalButton.vue';

const { mapState, mapActions } = createNamespacedHelpers(CustomersStore);

export default defineComponent({
    name: "List Heading",
    components: { Modal, ModalButton },
    computed: {
        ...mapState([ "selections", "lastPageRequest" ]),
        selectionCount() { return Object.keys(this.selections).length; },
        hasSelections() { return  this.selectionCount > 0; },
        customersString() {return this.selectionCount === 1 ? `"${Object.values(this.selections)[0].name}"` : `${this.selectionCount} customers`; }
    },
    methods: {
        ...mapActions([
            "toggleSelectAll",
            "deleteAll",
            "deleteSelectedCustomers"
        ]),
        confirmDelete() { this.deleteSelectedCustomers(); }
    },
    watch: {
        selections(newVal) {
            const count = Object.keys(newVal).length;
            const ref = this.$refs.masterCheck;
            if(count === this.lastPageRequest.records) {
                ref.indeterminate = false;
                ref.checked = true;
                return;
            }
            if(count < this.lastPageRequest.records && count > 0) {
                ref.indeterminate = true;
                ref.checked = false;
                return;
            }
            ref.indeterminate = false;
            ref.checked = false;
        },
    }
});
</script>

<style scoped lang="scss">

button {
    display: inline;
}

</style>