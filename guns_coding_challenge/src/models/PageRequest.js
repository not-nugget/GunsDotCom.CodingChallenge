
export default class PageRequest {
    /** Number of records per page to retrieve
     *  @type {Number} */
    records;
    /** The specific page to retrieve records for 
     *  @type {Number} */
    page;

    /** 
     *  @param {Number} records Number of records to retrieve
     *  @param {Number} page Page to retrieve records for */
    constructor(records, page) {
        this.records = records;
        this.page = page;
    }
}