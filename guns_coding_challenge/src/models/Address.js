import { faker } from "@faker-js/faker";

/** Represents an address */
export default class Address {

    /** The first line of an address
     *  @type {String} */
    line1;
    /** The second line of an address
     *  @type {String} */
    line2;
    /** The city of an address
     *  @type {String} */
    city;
    /** The state of an address
     *  @type {String} */
    state;
    /** The 5-digit zip code of an address
     *  @type {Number} */
    zip;

    /** Creates an addres with that matches the given parameters
     *  @param {String} line1 The first line of an address
     *  @param {String} line2 The second line of an address
     *  @param {String} city The city of an address
     *  @param {String} state The state of an address
     *  @param {Number} zip The 5-digit zip code of an address */
    constructor(line1, line2, city, state, zip) {
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    /** Generates a runtime random fake address
     *  @returns {Address} */
    static generateFake() {
        const number = faker.location.buildingNumber();
        const street = faker.location.street();
        const city = faker.location.city();
        const state = faker.location.state();
        const zip = faker.location.zipCode();
        const line1 = `${number} ${street}`;
        const line2 = Math.random() > 0.625 ? "" : faker.location.secondaryAddress();
        return new Address(line1, line2, city, state, zip);
    }
}
