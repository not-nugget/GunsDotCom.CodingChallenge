<template>
    <div class="align-middle text-center table-responsive-xxl">
        <table class="table table-dark table-striped">
            <caption class="caption-top">Customers</caption>
            <slot />
        </table>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "List Container"
});
</script>