<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useComputerStore } from '../stores/computer';
import { useResponsibleStore } from '../stores/responsible';
import { useDialogStore } from '../stores/dialog';

// const emit = defineEmits(['showResponsibleDetail', 'showEditComputerForm']);
const store = useComputerStore();
const responsibleStore = useResponsibleStore();
const { showResponsibleDetail, showEditComputerForm } = useDialogStore();
const { computers } = storeToRefs(store);

onMounted(() => {
  store.getComputers();
})

const selectResponsible = async (id) => {
  await responsibleStore.setResponsible(id);
  // emit('showResponsibleDetail');
  showResponsibleDetail();
}

const selectComputer = async (id) => {
  await store.setComputer(id);
  // emit('showEditComputerForm');
  showEditComputerForm();
}

const formatDate = (timestamp) => {
  if (timestamp) return new Intl.DateTimeFormat(['ban', 'id']).format(timestamp.toDate());

  return 'Sin fecha';
}
</script>

<template>
  <DataTable :value="computers" responsiveLayout="scroll">
    <Column field="code" header="Código"></Column>
    <Column field="responsible_name" header="Nombre">
      <template #body="slotProps">
        <Button icon="pi pi-user" class="p-button-rounded p-button-info button-icon-table"
          @click="selectResponsible(slotProps.data.responsible)" />
        {{ slotProps.data.responsible_name }}
      </template>
    </Column>
    <Column field="computer_brand" header="Marca"></Column>
    <Column field="computer_model" header="Modelo"></Column>
    <Column field="serial_number" header="# Serie"></Column>
    <Column field="invoice_date" header="Fecha Factura">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.invoice_date) }}
      </template>
    </Column>
    <Column field="invoice_number" header="# Factura"></Column>
    <Column field="supplier" header="Proveedor"></Column>
    <Column field="computer_status" header="Estatus"></Column>
    <Column headerStyle="width: 4rem; text-align: center"
      bodyStyle="text-align: center; overflow: visible; display: flex;">
      <template #body="slotProps">
        <Button type="button" icon="pi pi-info-circle" class="p-button-rounded m-1 button-icon-table"
          title="Detalle registro"></Button>
        <Button type="button" icon="pi pi-pencil" class="p-button-rounded p-button-info m-1 button-icon-table"
          title="Editar registro" @click="selectComputer(slotProps.data.id)"></Button>
        <Button type="button" icon="pi pi-file-pdf" class="p-button-rounded p-button-secondary m-1 button-icon-table"
          title="Carta responsiva"></Button>
        <Button type="button" icon="pi pi-trash" class="p-button-rounded p-button-danger m-1 button-icon-table"
          title="Eliminar registro"></Button>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>
.button-icon-table {
  height: 2rem !important;
  width: 2rem !important;
}
</style>