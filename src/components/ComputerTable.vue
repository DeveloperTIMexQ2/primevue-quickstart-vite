<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useComputerStore } from '../stores/computer';
import { useResponsibleStore } from '../stores/responsible';

const emit = defineEmits(['showResponsibleDetail']);
const store = useComputerStore();
const responsibleStore = useResponsibleStore();
const { computers } = storeToRefs(store);

onMounted(() => {
  store.getComputers();
})

const selectResponsible = async (id) => {
  await responsibleStore.setResponsible(id);
  emit('showResponsibleDetail');
}

const formatDate = (timesamp) => {
  if (timesamp) return new Intl.DateTimeFormat(['ban', 'id']).format(timesamp.toDate());

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
  </DataTable>
</template>

<style scoped>
.button-icon-table {
  height: 2rem !important;
  width: 2rem !important;
}
</style>