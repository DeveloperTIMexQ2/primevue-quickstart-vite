<script setup>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useResponsibleStore } from '../stores/responsible';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  display: Boolean,
});

const emit = defineEmits(['hideResponsibleForm']);
const submitted = ref(false);
const toast = useToast();
const store = useResponsibleStore();
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
  phone_number: {},
  employee_name: { required },
  employee_position: {},
  employee_email: {},
  employee_area: {},
  employee_branch: {},
}
const v$ = useVuelidate(rules, formState);

const hideResponsibleForm = () => emit('hideResponsibleForm');

const handleSubmit = async (isFormValid) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  const res = await store.addResponsible(formState);

  if(!res) {
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
  <Dialog header="Registro de nuevo responsable" v-model:visible="display"
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
          <InputMask class="w-full" v-model="v$.phone_number.$model" mask="999-999-9999" placeholder="# Télefono" />
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
          <InputText class="w-full" v-model="v$.employee_position.$model" placeholder="Puesto del trabajador" />
        </div>
        <div class="field">
          <InputText class="w-full" v-model="v$.employee_email.$model" placeholder="Correo eléctronico" />
        </div>
      </div>
      <div class="form-row form-column-2">
        <div class="field">
          <InputText class="w-full" v-model="v$.employee_branch.$model" placeholder="Sucursal del trabajador" />
        </div>
        <div class="field">
          <InputText class="w-full" v-model="v$.employee_area.$model" placeholder="Planta / Departamento" />
        </div>
      </div>
    </form>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" type="button" @click="display = !display" class="p-button-text" />
      <Button label="Guardar" icon="pi pi-save" @click="handleSubmit(!v$.$invalid)" />
    </template>
  </Dialog>
</template>