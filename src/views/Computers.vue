<script setup>
import ResponsibleForm from '../components/ResponsibleForm.vue';
import ResponsibleDetail from '../components/ResponsibleDetail.vue';
import ComputerForm from '../components/ComputerForm.vue';
import ComputerTable from '../components/ComputerTable.vue';
import EditComputerForm from '../components/EditComputerForm.vue';
import { useDialogStore } from '../stores/dialog';

const { showComputerForm } = useDialogStore();

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
  <EditComputerForm />

  <!-- <div class="form-row form-column-1">
    <div class="field">
      <Calendar class="w-full" inputId="icon" autocomplete="off" :showIcon="true"
        placeholder="Fecha de entrega" />
    </div>
  </div> -->
</template>