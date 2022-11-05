<script setup>
import ResponsibleForm from '../components/ResponsibleForm.vue';
import ResponsibleDetail from '../components/ResponsibleDetail.vue';
import ComputerForm from '../components/ComputerForm.vue';
import ComputerTable from '../components/ComputerTable.vue';
import EditComputerForm from '../components/EditComputerForm.vue';
import { useDialogStore } from '../stores/dialog';
import { useComputerStore } from '../stores/computer';
import { storeToRefs } from 'pinia';

const { showComputerForm } = useDialogStore();
const computerStore = useComputerStore();
const { current_computer } = storeToRefs(computerStore);

</script>

<template>
  <div style="margin-top: 50px; margin-left: 10px; margin-right: 10px;">
    <h1>Computadoras</h1>
    <Button label="Nueva" icon="pi pi-plus" @click="showComputerForm" />

    <ComputerTable />
  </div>

  <ComputerForm />
  <ResponsibleForm />
  <ResponsibleDetail />
  <EditComputerForm v-if="current_computer" />
</template>