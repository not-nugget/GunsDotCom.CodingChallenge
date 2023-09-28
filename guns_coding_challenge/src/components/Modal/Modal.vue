<template>
    <Teleport to="#modals">
        <div v-bind="$attrs" ref="modal" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><slot name="title"></slot></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>
                            <slot name="body"></slot>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "Modal",
    inheritAttrs: false,
});
</script>