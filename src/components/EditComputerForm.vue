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

// const emit = defineEmits(['hideEditComputerForm', 'showResponsibleForm']);
const submitted = ref(false);
const filteredResponsibles = ref();
const toast = useToast();
const responsibleStore = useResponsibleStore();
const computerStore = useComputerStore();
const dialogStore = useDialogStore();
const { responsibles } = storeToRefs(responsibleStore);
const { displayEditComputerForm } = storeToRefs(dialogStore);
const { showResponsibleForm, hideEditComputerForm } = dialogStore;
let selected_file = null;
const computer_types = ref([
  { name: 'Laptop', code: 'Laptop' },
  { name: 'Escritorio', code: 'Escritorio' },
  { name: 'All in one', code: 'All in one' },
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
});

const rules = {
  computer_type: { required },
  computer_status: { required },
  computer_brand: {},
  computer_model: {},
  serial_number: {},
  product_number: {},
  invoice_number: {},
  invoice_date: {},
  supplier: {},
  comments: {},
  responsible: { required },
}

const v$ = useVuelidate(rules, formState);

onMounted(() => {
  responsibleStore.getResponsibles();
})

// const hideEditComputerForm = () => emit('hideEditComputerForm');

// const showResponsibleForm = () => emit('showResponsibleForm');

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

  if(!res) {
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
  submitted.value = false;
  selected_file = null;
  hideEditComputerForm();
};
</script>

<template>
  <Dialog header="Editar Registro" v-model:visible="displayEditComputerForm" :breakpoints="{'960px': '75vw', '640px': '90vw'}"
    :style="{width: '50vw'}" @hide="hideEditComputerForm">
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="form-row form-column-1">
        <div class="field">
          <div class="p-inputgroup">
            <AutoComplete v-model="v$.responsible.$model" :suggestions="filteredResponsibles"
              @complete="searchResponsible($event)" optionLabel="employee_name" modelValue="id"
              placeholder="Buscar responsable" :class="{'p-invalid':v$.responsible.$invalid && submitted}" />
            <Button label="Nuevo responsable" @click="showResponsibleForm" />
          </div>
          <small v-if="(v$.responsible.$invalid && submitted) || v$.responsible.$pending.$response" class="p-error">
            {{v$.responsible.required.$message.replace('Value', 'Responsable')}}
          </small>
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <Dropdown class="w-full" v-model="v$.computer_type.$model" :options="computer_types" optionLabel="name"
            optionValue="code" placeholder="Tipo de equipo"
            :class="{'p-invalid':v$.computer_type.$invalid && submitted}" />
          <small v-if="(v$.computer_type.$invalid && submitted) || v$.computer_type.$pending.$response" class="p-error">
            {{v$.computer_type.required.$message.replace('Value', 'Tipo')}}
          </small>
        </div>
        <div class="field">
          <Dropdown class="w-full" v-model="v$.computer_status.$model" :options="computer_statuses" optionLabel="name"
            optionValue="code" placeholder="Estatus de equipo"
            :class="{'p-invalid':v$.computer_status.$invalid && submitted}" />
          <small v-if="(v$.computer_status.$invalid && submitted) || v$.computer_status.$pending.$response" class="p-error">
            {{v$.computer_status.required.$message.replace('Value', 'Estatus')}}
          </small>
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.computer_brand.$model" id="equipo_marca"
            placeholder="Marca del equipo" />
        </div>
        <div class="field">
          <InputText class="w-full" v-model="v$.computer_model.$model" id="equipo_model"
            placeholder="Modelo del equipo" />
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.serial_number.$model" id="numero_serie" placeholder="Número de serie" />
        </div>
        <div class="field">
          <InputText class="w-full" v-model="v$.product_number.$model" id="numero_producto"
            placeholder="Número de producto" />
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.invoice_number.$model" id="numero_factura"
            placeholder="Número de factura" />
        </div>
        <div class="field">
          <Calendar v-model="v$.invoice_date.$model" inputId="icon" autocomplete="off" :showIcon="true"
            placeholder="Fecha factura" />
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.supplier.$model" id="proveedor" placeholder="Proveedor" />
        </div>
        <div class="field">
          <FileUpload class="w-full" mode="basic" name="factura[]" accept="image/*,application/pdf"
            :maxFileSize="1000000" chooseLabel="Subir factura" @select="setFile" />
        </div>
      </div>
      <div class="form-row form-column-1">
        <div class="field">
          <InputText class="w-full" v-model="v$.comments.$model" id="comments" placeholder="Comentarios adicionales" />
        </div>
      </div>
    </form>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" type="button" @click="hideEditComputerForm" class="p-button-text" />
      <Button label="Guardar" icon="pi pi-save" @click="handleSubmit(!v$.$invalid)" />
    </template>
  </Dialog>
</template>