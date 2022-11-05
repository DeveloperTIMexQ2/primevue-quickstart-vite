<script setup>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useResponsibleStore } from '../stores/responsible';
import { useToast } from 'primevue/usetoast';
import { useDialogStore } from '../stores/dialog';
import { storeToRefs } from 'pinia';

// const props = defineProps({
//   display: Boolean,
// });

// const emit = defineEmits(['hideResponsibleForm']);
const submitted = ref(false);
const toast = useToast();
const store = useResponsibleStore();
const dialogStore = useDialogStore();
const { displayResponsibleForm } = storeToRefs(dialogStore);
const { hideResponsibleForm } = dialogStore;
const formState = reactive({
  employee_number: "",
  phone_number: "",
  employee_name: "",
  employee_position: "",
  employee_email: "",
  employee_area: "",
  employee_branch: "",
});
const rules = {
  employee_number: { required, minLength: minLength(5) },
  phone_number: { required },
  employee_name: { required },
  employee_position: { required },
  employee_email: { required },
  employee_area: { required },
  employee_branch: { required },
}
const v$ = useVuelidate(rules, formState);

// const hideResponsibleForm = () => emit('hideResponsibleForm');

const handleSubmit = async (isFormValid) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  const res = await store.addResponsible(formState);

  if (!res) {
    toast.add({ severity: 'success', summary: 'Exito!', detail: 'responsable agregado', life: 3000 });
  }

  formState.employee_number = '';
  formState.phone_number = '';
  formState.employee_name = '';
  formState.employee_position = '';
  formState.employee_email = '';
  formState.employee_area = '';
  formState.employee_branch = '';
  submitted.value = false;
  hideResponsibleForm();
};
</script>

<template>
  <Dialog header="Registro de nuevo responsable" v-model:visible="displayResponsibleForm"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '45vw' }" @hide="hideResponsibleForm">
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="form-row form-column-2">
        <div class="field">
          <InputMask class="w-full" v-model="v$.employee_number.$model" mask="99999" placeholder="# Nomina"
            :class="{ 'p-invalid': v$.employee_number.$invalid && submitted }" />
          <small v-if="(v$.employee_number.$invalid && submitted) || v$.employee_number.$pending.$response"
            class="p-error">
            {{ v$.employee_number.required.$message.replace('Value', '# Nomina') }}
          </small>
        </div>
        <div class="field">
          <InputMask class="w-full" v-model="v$.phone_number.$model" mask="999-999-9999" placeholder="# Télefono"
            :class="{ 'p-invalid': v$.phone_number.$invalid && submitted }" />
          <small v-if="(v$.phone_number.$invalid && submitted) || v$.phone_number.$pending.$response" class="p-error">
            {{ v$.phone_number.required.$message.replace('Value', '# Télefono') }}
          </small>
        </div>
      </div>
      <div class="form-row form-column-1">
        <div class="field">
          <InputText class="w-full" v-model="v$.employee_name.$model" placeholder="Nombre del trabajador"
            :class="{ 'p-invalid': v$.employee_name.$invalid && submitted }" />
          <small v-if="(v$.employee_name.$invalid && submitted) || v$.employee_name.$pending.$response" class="p-error">
            {{ v$.employee_name.required.$message.replace('Value', 'Nombre') }}
          </small>
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.employee_position.$model" placeholder="Puesto del trabajador"
            :class="{ 'p-invalid': v$.employee_position.$invalid && submitted }" />
          <small v-if="(v$.employee_position.$invalid && submitted) || v$.employee_position.$pending.$response" class="p-error">
            {{ v$.employee_position.required.$message.replace('Value', 'Puesto') }}
          </small>
        </div>
        <div class="field">
          <InputText class="w-full" v-model="v$.employee_email.$model" placeholder="Correo eléctronico"
            :class="{ 'p-invalid': v$.employee_email.$invalid && submitted }" />
          <small v-if="(v$.employee_email.$invalid && submitted) || v$.employee_email.$pending.$response" class="p-error">
            {{ v$.employee_email.required.$message.replace('Value', 'Correo') }}
          </small>
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.employee_branch.$model" placeholder="Sucursal del trabajador"
            :class="{ 'p-invalid': v$.employee_branch.$invalid && submitted }" />
          <small v-if="(v$.employee_branch.$invalid && submitted) || v$.employee_branch.$pending.$response" class="p-error">
            {{ v$.employee_branch.required.$message.replace('Value', 'Sucursal') }}
          </small>
        </div>
        <div class="field">
          <InputText class="w-full" v-model="v$.employee_area.$model" placeholder="Planta / Departamento"
            :class="{ 'p-invalid': v$.employee_area.$invalid && submitted }" />
          <small v-if="(v$.employee_area.$invalid && submitted) || v$.employee_area.$pending.$response" class="p-error">
            {{ v$.employee_area.required.$message.replace('Value', 'Planta / Departamento') }}
          </small>
        </div>
      </div>
    </form>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" type="button" @click="hideResponsibleForm" class="p-button-text" />
      <Button label="Guardar" icon="pi pi-save" @click="handleSubmit(!v$.$invalid)" />
    </template>
  </Dialog>
</template>