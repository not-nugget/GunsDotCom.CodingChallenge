/* eslint-disable no-unused-vars */

/** @typedef {`${String}-${String}-${String}-${String}-${String}`} UUID A universally unique identifier as a string */

import Firearm from "./Firearm";
import Customer from "./Customer.js";

/** Represents the purchase of a firearm by a customer */
export default class Purchase {
    /** The unique identifier of this transaction
     *  @type {UUID} */
    id
    /** The firearm which was purchased
     *  @type {Firearm} */
    firearm;
    /** The customer who purchased the firearm
     *  @type {Customer} */
    customer;
    /** The date the transaction occurred
     *  @type {Date} */
    purchaseDate;

    /** Creates a new firearm transaction based on the provieded parameters
     *  @param {Firearm} firearm The firearm which was purchased
     *  @param {Customer} customer The customer who purchased the firearm
     *  @param {Date} customPurchaseDate The date the transaction occurred */
    constructor(firearm, customer, customPurchaseDate = new Date()) {
        this.id = self.crypto.randomUUID();
        this.firearm = firearm;
        this.customer = customer;
        this.purchaseDate = customPurchaseDate;
    }
}