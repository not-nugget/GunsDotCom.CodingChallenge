
import { faker } from "@faker-js/faker";

import Address from "./Address.js";

/** Represents a customer who has purchased a firearm */
export default class Customer {
    /** Uniqie identifier assigned to this customer when created
     *  @type {UUID} */
    id;
    /** Name of the customer
     *  @type {String} */
    name;
    /** The customer's email
     *  @type {String} */
    email;
    /** The customer's phone number
     *  @type {String} */
    phone;
    /** The customer's address
     *  @type {Address} */
    address;

    /** Creates a customer represented by the given parameters
     *  @param {String} name 
     *  @param {String} email 
     *  @param {String} phone 
     *  @param {Address} address */
    constructor(name, email, phone, address) {
        this.id = faker.string.uuid();
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;   
    }

    /** Generates a runtime random fake customer
     *  @returns {Customer} */
    static generateFake() {
        const [fName, lName] = [faker.person.firstName(), faker.person.lastName()];
        const fullName = `${fName} ${lName}`;
        const email = `${fName}.${lName}@mail.com`;
        const phone = faker.phone.number();
        const address = Address.generateFake();
        return new Customer(fullName, email, phone, address);
    }
}
