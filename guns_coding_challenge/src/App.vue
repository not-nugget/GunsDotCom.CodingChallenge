<script setup>
import List from './components/List/List.vue';
import CustomerFormModal from './components/Modal/CustomerFormModal.vue';
</script>

<template>
  <List />
  <CustomerFormModal id="modal-customer-create"/>
</template>

<style scoped>
#modals {
  position: absolute;
  pointer-events: none;
}

header {
  line-height: 1.5;
  font-size: larger;
  color: white;
  font-family: 'Roboto', sans-serif;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
