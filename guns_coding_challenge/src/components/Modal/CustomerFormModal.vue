<template>
    <Teleport to="#modals">
        <div v-bind="$attrs" ref="modal" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEdit ? "Edit": "Create" }} Customer</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="name" class="form-label">Full Name</label>
                                <input ref="name" type="text" id="name" class="form-control" placeholder="John Doe" :value="editModel?.name">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input ref="email" type="email" id="email" class="form-control" placeholder="john.doe@mail.com" :value="editModel?.email">
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone Number</label>
                                <input ref="phone" type="phone" id="phone" class="form-control" placeholder="+1 555 555 5555" :value="editModel?.phone">
                            </div>
                            <div class="mb-3">
                                <label for="addressLine1" class="form-label">Address Line 1</label>
                                <input ref="addressLine1" type="text" id="addressLine1" class="form-control" placeholder="123 Street Ln" :value="editModel?.address.line1">
                            </div>
                            <div class="mb-3">
                                <label for="addressLine2" class="form-label">Address Line 2</label>
                                <input ref="addressLine2" type="text" id="addressLine2" class="form-control" placeholder="Suite 15" :value="editModel?.address.line2">
                            </div>
                            <div class="mb-3">
                                <label for="city" class="form-label">City</label>
                                <input ref="city" type="text" id="city" class="form-control" placeholder="City" :value="editModel?.address.city">
                            </div>
                            <div class="mb-3">
                                <label for="state" class="form-label">State</label>
                                <select ref="state" class="form-select" id="select" :value="editModel?.address.state">
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="zip" class="form-label">ZIP</label>
                                <input ref="zip" type="number" id="zip" class="form-control" placeholder="ZIP" :value="editModel?.address.zip">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <ModalButton class="btn-danger" dismiss>Discard Changes</ModalButton>
                        <ModalButton
                            @click="submitCustomer"
                            class="btn-primary"
                            dismiss>
                            {{ isEdit ? "Edit" : "Create" }} Customer
                        </ModalButton>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script>
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex";
import { CustomersStore } from "../../stores/customers.store";
import Customer from "../../models/Customer";
import Address from "../../models/Address";
import ModalButton from "./ModalButton.vue";

const { mapActions } = createNamespacedHelpers(CustomersStore);

export default defineComponent({
    name: "Customer Form Modal",
    components: { ModalButton },
    props: {
        /** Optionally provided customer which is being edited
         *  @type {Customer} Customer to edit */
        editModel: { type: Customer, required: false, default: null }
    },
    computed: { 
        isEdit() { return !!this.editModel; },
    },
    methods: {
        ...mapActions(["createCustomer", "modifyCustomer"]),
        editName() { return this.$refs.name?.value ?? "Customer"; },
        submitCustomer() {
            const refs = this.$refs;
            const address = new Address(refs.addressLine1.value, refs.addressLine2.value, refs.city.value, refs.state.value, refs.zip.value);
            const customer = new Customer(refs.name.value, refs.email.value, refs.phone.value, address);

            if(this.isEdit) {
                customer.id = this.editModel.id;
                this.modifyCustomer(customer);
                return;
            }
            
            this.createCustomer(customer);
        }
    },
    mounted() {
        if(!this.isEdit) return;
        let i = 0;
        const options = this.$refs.state.options;
        for (const option of options) {
            if(option.innerHTML !== this.editModel.address.state) {
                i++;
                continue;
            }
            this.$refs.state.selectedIndex = i;
            return;
        }
    }
});

</script>