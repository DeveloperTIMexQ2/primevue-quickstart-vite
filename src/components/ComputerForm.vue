<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useToast } from 'primevue/usetoast';
import { useResponsibleStore } from '../stores/responsible';
import { useComputerStore } from '../stores/computer';
import { storeToRefs } from 'pinia';
import { useDialogStore } from '../stores/dialog';

// const props = defineProps({
//   display: Boolean
// });

// const emit = defineEmits(['showResponsibleForm', 'hideResponsibleForm', 'hideComputerForm']);
const submitted = ref(false);
const filteredResponsibles = ref();
const toast = useToast();
const responsibleStore = useResponsibleStore();
const computerStore = useComputerStore();
const dialogStore = useDialogStore();
const { responsibles } = storeToRefs(responsibleStore);
const { displayComputerForm } = storeToRefs(dialogStore);
const { hideComputerForm, showResponsibleForm } = dialogStore;
let selected_file = null;
const computer_types = ref([
  { name: 'Laptop', code: 'MQ' },
  { name: 'Escritorio', code: 'PC' },
  { name: 'All in one', code: 'MQ' },
]);
const computer_statuses = ref([
  { name: 'Activo', code: 'Activo' },
  { name: 'Baja', code: 'Baja' },
  { name: 'En soporte', code: 'En soporte' },
]);
const formState = reactive({
  computer_type: "",
  computer_status: "",
  computer_brand: "",
  computer_model: "",
  serial_number: "",
  product_number: "",
  invoice_number: "",
  invoice_date: "",
  supplier: "",
  comments: "",
  responsible: "",
  purchase_date: "",
  delivery_date: "",
});

const rules = {
  computer_type: { required },
  computer_status: { required },
  computer_brand: { required },
  computer_model: { required },
  serial_number: { required },
  product_number: { required },
  invoice_number: { required },
  invoice_date: { required },
  supplier: { required },
  comments: { required },
  responsible: { required },
  purchase_date: { required },
  delivery_date: { required },
}

const v$ = useVuelidate(rules, formState);

onMounted(() => {
  responsibleStore.getResponsibles();
})

// const showResponsibleForm = () => emit('showResponsibleForm');

// const hideComputerForm = () => emit('hideComputerForm');

const searchResponsible = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredResponsibles.value = [...responsibles.value];
    }
    else {
      filteredResponsibles.value = responsibles.value.filter((responsible) => {
        return responsible.employee_name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};

const setFile = (event) => selected_file = event.files[0];

const handleSubmit = async (isFormValid) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  const res = await computerStore.addComputer(formState, selected_file);

  if (!res) {
    toast.add({ severity: 'success', summary: 'Exito!', detail: 'computadora agregada', life: 3000 });
  }

  formState.computer_type = '';
  formState.computer_status = '';
  formState.computer_brand = '';
  formState.computer_model = '';
  formState.serial_number = '';
  formState.product_number = '';
  formState.invoice_number = '';
  formState.invoice_date = '';
  formState.supplier = '';
  formState.comments = '';
  formState.responsible = '';
  formState.purchase_date = '';
  formState.delivery_date = '';
  submitted.value = false;
  selected_file = null;
  hideComputerForm();
};
</script>

<template>
  <Dialog header="Nuevo Registro" v-model:visible="displayComputerForm"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }" @hide="hideComputerForm">
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="form-row form-column-1">
        <div class="field">
          <div class="p-inputgroup">
            <AutoComplete v-model="v$.responsible.$model" :suggestions="filteredResponsibles"
              @complete="searchResponsible($event)" optionLabel="employee_name" modelValue="id"
              placeholder="Buscar responsable" :class="{ 'p-invalid': v$.responsible.$invalid && submitted }" />
            <Button label="Nuevo responsable" @click="showResponsibleForm" />
          </div>
          <small v-if="(v$.responsible.$invalid && submitted) || v$.responsible.$pending.$response" class="p-error">
            {{ v$.responsible.required.$message.replace('Value', 'Responsable') }}
          </small>
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <Dropdown class="w-full" v-model="v$.computer_type.$model" :options="computer_types" optionLabel="name"
            optionValue="code" placeholder="Tipo de equipo"
            :class="{ 'p-invalid': v$.computer_type.$invalid && submitted }" />
          <small v-if="(v$.computer_type.$invalid && submitted) || v$.computer_type.$pending.$response" class="p-error">
            {{ v$.computer_type.required.$message.replace('Value', 'Tipo') }}
          </small>
        </div>
        <div class="field">
          <Dropdown class="w-full" v-model="v$.computer_status.$model" :options="computer_statuses" optionLabel="name"
            optionValue="code" placeholder="Estatus de equipo"
            :class="{ 'p-invalid': v$.computer_status.$invalid && submitted }" />
          <small v-if="(v$.computer_status.$invalid && submitted) || v$.computer_status.$pending.$response"
            class="p-error">
            {{ v$.computer_status.required.$message.replace('Value', 'Estatus') }}
          </small>
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.computer_brand.$model" id="equipo_marca" placeholder="Marca del equipo"
            :class="{ 'p-invalid': v$.computer_brand.$invalid && submitted }" />
          <small v-if="(v$.computer_brand.$invalid && submitted) || v$.computer_brand.$pending.$response"
            class="p-error">
            {{ v$.computer_brand.required.$message.replace('Value', 'Marca') }}
          </small>
        </div>
        <div class="field">
          <InputText class="w-full" v-model="v$.computer_model.$model" id="equipo_model" placeholder="Modelo del equipo"
            :class="{ 'p-invalid': v$.computer_model.$invalid && submitted }" />
          <small v-if="(v$.computer_model.$invalid && submitted) || v$.computer_model.$pending.$response"
            class="p-error">
            {{ v$.computer_model.required.$message.replace('Value', 'Modelo') }}
          </small>
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.serial_number.$model" id="numero_serie" placeholder="Número de serie"
            :class="{ 'p-invalid': v$.serial_number.$invalid && submitted }" />
          <small v-if="(v$.serial_number.$invalid && submitted) || v$.serial_number.$pending.$response" class="p-error">
            {{ v$.serial_number.required.$message.replace('Value', 'Número de serie') }}
          </small>
        </div>
        <div class="field">
          <InputText class="w-full" v-model="v$.product_number.$model" id="numero_producto"
            placeholder="Número de producto" :class="{ 'p-invalid': v$.product_number.$invalid && submitted }" />
          <small v-if="(v$.product_number.$invalid && submitted) || v$.product_number.$pending.$response"
            class="p-error">
            {{ v$.product_number.required.$message.replace('Value', 'Número de producto') }}
          </small>
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.invoice_number.$model" id="numero_factura"
            placeholder="Número de factura" :class="{ 'p-invalid': v$.invoice_number.$invalid && submitted }" />
          <small v-if="(v$.invoice_number.$invalid && submitted) || v$.invoice_number.$pending.$response"
            class="p-error">
            {{ v$.invoice_number.required.$message.replace('Value', 'Número de factura') }}
          </small>
        </div>
        <div class="field">
          <Calendar class="w-full" v-model="v$.invoice_date.$model" inputId="icon" autocomplete="off" :showIcon="true"
            placeholder="Fecha factura" :class="{ 'p-invalid': v$.invoice_date.$invalid && submitted }" />
          <small v-if="(v$.invoice_date.$invalid && submitted) || v$.invoice_date.$pending.$response" class="p-error">
            {{ v$.invoice_date.required.$message.replace('Value', 'Fecha factura') }}
          </small>
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.supplier.$model" id="proveedor" placeholder="Proveedor"
            :class="{ 'p-invalid': v$.supplier.$invalid && submitted }" />
          <small v-if="(v$.supplier.$invalid && submitted) || v$.supplier.$pending.$response" class="p-error">
            {{ v$.supplier.required.$message.replace('Value', 'Proveedor') }}
          </small>
        </div>
        <div class="field">
          <FileUpload class="w-full" mode="basic" name="factura[]" accept="image/*,application/pdf"
            :maxFileSize="1000000" chooseLabel="Subir factura" @select="setFile" />
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <Calendar class="w-full" v-model="v$.purchase_date.$model" inputId="icon" autocomplete="off" :showIcon="true"
            placeholder="Fecha de compra" :class="{ 'p-invalid': v$.purchase_date.$invalid && submitted }" />
          <small v-if="(v$.purchase_date.$invalid && submitted) || v$.purchase_date.$pending.$response" class="p-error">
            {{ v$.purchase_date.required.$message.replace('Value', 'Fecha compra') }}
          </small>
        </div>
        <div class="field">
          <Calendar class="w-full" v-model="v$.delivery_date.$model" inputId="icon" autocomplete="off" :showIcon="true"
            placeholder="Fecha de entrega" :class="{ 'p-invalid': v$.delivery_date.$invalid && submitted }" />
          <small v-if="(v$.delivery_date.$invalid && submitted) || v$.delivery_date.$pending.$response" class="p-error">
            {{ v$.delivery_date.required.$message.replace('Value', 'Fecha entrega') }}
          </small>
        </div>
      </div>
      <div class="form-row form-column-1">
        <div class="field">
          <InputText class="w-full" v-model="v$.comments.$model" id="comments" placeholder="Comentarios adicionales"
            :class="{ 'p-invalid': v$.comments.$invalid && submitted }" />
          <small v-if="(v$.comments.$invalid && submitted) || v$.comments.$pending.$response" class="p-error">
            {{ v$.comments.required.$message.replace('Value', 'Comentarios') }}
          </small>
        </div>
      </div>
    </form>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" type="button" @click="hideComputerForm" class="p-button-text" />
      <Button label="Guardar" icon="pi pi-save" @click="handleSubmit(!v$.$invalid)" />
    </template>
  </Dialog>
</template>