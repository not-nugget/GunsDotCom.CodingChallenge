
export default class Page {
    /** The data within this page
     *  @type {Array} */
    data;

    /** The page which the data is a part of
     *  @type {Number} */
    page;

    /** The largest page value that contains data for the given page size
     *  @type {Number} */
    lastPage;

    /** Create a page response containing the requested information
     *  @param {Array} data The data within this page
     *  @param {Number} page The page which the data is a part of
     *  @param {Number} lastPage The largest page value that contains data for the given page size */
    constructor(data, page, lastPage) {
        this.data = data;
        this.page = page;
        this.lastPage = lastPage;
    }
}
