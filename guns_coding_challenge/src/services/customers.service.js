
import Customer from '../models/Customer';

export const CustomerService = {
    getCustomers,
    addCustomer,
    editCustomer,
    deleteCustomer,
    bulkDeleteCustomers,
    deleteAllCustomers
};

let customers = {};

/** Gets the raw cutomers collection */
function getCustomers() { 
    console.log("customers:", customers);
    if(Object.keys(customers).length === 0) {
        for (let i = 0; i < 64; i++) 
        {
            const customer = Customer.generateFake()
            customers[customer.id] = customer;
        }
        
    }
    console.log("customers:", Object.values(customers));
    return Object.values(customers); 
}

/** Adds a customer to the collection */
function addCustomer(customer) {
    customers[customer.id] = customer;
    return customer;
}

/** Edits a single customer */
function editCustomer(customerId, newCustomer) {
    customers[customerId] = newCustomer;
    return newCustomer;
}

/** Deletes a single customer */
function deleteCustomer(customerId) {
    const deleted = customers[customerId];
    delete customers[customerId];
    return deleted;
}

/** Deletes an arbitrary number of customers */
function bulkDeleteCustomers(customerIds) {
    const deleted = [];
    customerIds.forEach(id => {
        deleted.push(customers[id]);
        delete customers[id];
    });
    return deleted;
}

/** Deletes every customer */
function deleteAllCustomers() {
    const deleted = customers;
    customers = {};
    return deleted;
}