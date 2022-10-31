<script setup>
import { ref } from 'vue';
import ResponsibleForm from '../components/ResponsibleForm.vue';
import ResponsibleDetail from '../components/ResponsibleDetail.vue';
import ComputerForm from '../components/ComputerForm.vue';
import ComputerTable from '../components/ComputerTable.vue';

const displayComputerForm = ref(false);
const displayResponsibleForm = ref(false);
const displayResponsibleDetail = ref(false);

const showComputerForm = () => displayComputerForm.value = true;

const hideComputerForm = () => displayComputerForm.value = false;

const showResponsibleForm = () => displayResponsibleForm.value = true;

const hideResponsibleForm = () => displayResponsibleForm.value = false;

const showResponsibleDetail = () => displayResponsibleDetail.value = true;

const hideResponsibleDetail = () => displayResponsibleDetail.value = false;
</script>

<template>
  <div style="margin-top: 50px; margin-left: 10px; margin-right: 10px;">
    <h1>Computadoras</h1>
    <Button label="Nueva" icon="pi pi-plus" @click="showComputerForm" />

    <ComputerTable @showResponsibleDetail="showResponsibleDetail" />
  </div>

  <ComputerForm :display="displayComputerForm" @hideComputerForm="hideComputerForm"
    @showResponsibleForm="showResponsibleForm" />
  <ResponsibleForm :display="displayResponsibleForm" @hideResponsibleForm="hideResponsibleForm" />
  <ResponsibleDetail :display="displayResponsibleDetail" @hideResponsibleDetail="hideResponsibleDetail" />

  <!-- <div class="form-row form-column-1">
    <div class="field">
      <Calendar class="w-full" inputId="icon" autocomplete="off" :showIcon="true"
        placeholder="Fecha de entrega" />
    </div>
  </div> -->
</template>