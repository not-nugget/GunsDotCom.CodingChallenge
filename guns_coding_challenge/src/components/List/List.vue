<template>
    <ListContainer>
        <ListHeading/>
        <tbody class="text-center align-middle table-group-divider">
            <template v-if="data">
                <CustomerRow 
                    v-for="customer of data"
                    :key="customer.id"
                    :customer="customer"
                />
            </template>
        </tbody>
        <ListPageControls/>
    </ListContainer>
</template>

<script>
import { defineComponent } from 'vue';
import { createNamespacedHelpers } from 'vuex';
import ListContainer from './ListContainer.vue';
import ListHeading from './ListHeading.vue';
import CustomerRow from './CustomerRow.vue';
import ListPageControls from './ListPageControls.vue';
import { CustomersStore } from '../../stores/customers.store';
import PageRequest from '../../models/PageRequest';

const { mapState, mapActions } = createNamespacedHelpers(CustomersStore);

export default defineComponent({
    name: "List",
    components: { ListContainer, ListHeading, CustomerRow, ListPageControls },
    computed: {
        ...mapState([ "rawData", "pagedData", "selections" ]),
        data() { return this.pagedData?.data ?? []; }
    },
    methods: { ...mapActions([ "getPagedData" ]), },
    mounted() { this.getPagedData(new PageRequest(20, 1)); }
});
</script>