/** Represents a firearm */
export default class Firearm {
    /** Weapon manufacturer
     *  @type {String} */
    manufacturer;
    /** Name of the weapon
     *  @type {String} */
    name;

    /** Creates a weapon represented by the given parameters
     *  @param {String} manufacturer Weapon manufacturer
     *  @param {String} name Name of the weapon */
    constructor(manufacturer, name) {
        this.manufacturer = manufacturer;
        this.name = name;
    }
}
