<template>
<button v-if="!dismiss" type="button" class="btn" data-bs-target="modal"><slot></slot></button>
<button v-else type="button" class="btn" data-bs-target="modal" data-bs-dismiss="modal"><slot></slot></button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "Modal Button",
    props: {
        /** Indicate that this button, when clicked, should dismiss the modal it is within
         *  @type {Boolean} */
        dismiss: { type: Boolean, default: false }
    }
});
</script>