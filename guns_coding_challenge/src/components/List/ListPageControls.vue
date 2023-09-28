
<template>
    <tfoot>
        <tr>
            <th class="text-start" colspan="3">
                <span>
                    {{ rawData.length }} records
                    <span v-if="selectionCount > 0">&nbsp;({{ selectionCount }} selected)</span>
                </span>
            </th>
            <th class="text-center align-middle" colspan="4">
                <select ref="perPage" class="form-select" id="perPageSelect" @change="perPageChange">
                    <option value="10">10 Records</option>
                    <option selected value="20">20 Records</option>
                    <option value="50">50 Records</option>
                    <option value="100">100 Records</option>
                </select>
            </th>
            <th class="text-end align-middle" colspan="3">
                <nav class="justify-right" aria-label="List Paging">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" @click="navigateToPage(currentPage - 1)" :class="{disabled: currentPage === 1}">Previous</a></li>
                        <li 
                            v-for="i in pageCount"
                            :key="i"
                            class="page-item"
                            >
                            <a class="page-link" @click="navigateToPage(i)" :class="{disabled:currentPage === i}">{{ i }}</a>
                        </li>
                        <li class="page-item"><a class="page-link" @click="navigateToPage(currentPage + 1)" :class="{disabled: currentPage === pageCount}">Next</a></li>
                    </ul>
                </nav>
            </th>
        </tr>
    </tfoot>
</template>

<script>
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex";
import { CustomersStore } from "../../stores/customers.store";
import PageRequest from "../../models/PageRequest";

const { mapState, mapActions } = createNamespacedHelpers(CustomersStore);

export default defineComponent({
    name: "List Page Controls",
    computed: {
        ...mapState([ "rawData", "selections", "pagedData", "lastPageRequest" ]),
        currentPage() { return this.pagedData.page; },
        recordCount() { return this.rawData.length; },
        selectionCount() { return Object.keys(this.selections).length; },
        pageCount() { return this.pagedData.lastPage; },
    },
    methods: {
        ...mapActions([ "getPagedData" ]),
        perPage() { return Number.parseInt(this.$refs.perPage.value); },
        perPageChange() { this.getPagedData(new PageRequest(this.perPage(), this.currentPage)); },
        navigateToPage(page) { this.getPagedData(new PageRequest(this.perPage(), page)); }
    }
});
</script>

<style scoped lang="scss">

.page-item {
    cursor: pointer;
}

nav {
    display: flex;
    justify-content: right;
    transform: translateY(15%);
}

</style>