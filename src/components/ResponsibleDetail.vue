<script setup>
import { ref, onMounted } from 'vue';
import { useResponsibleStore } from '../stores/responsible';
import { useToast } from 'primevue/usetoast';
import { storeToRefs } from 'pinia';

const props = defineProps({
  display: Boolean,
});

const emit = defineEmits(['hideResponsibleDetail']);
const toast = useToast();
const store = useResponsibleStore();
const { current_responsible } = storeToRefs(store);

const hideResponsibleDetail = () => emit('hideResponsibleDetail');

onMounted(async () => {
  // responsible.value = await store.getResponsible(props.id);
})

</script>

<template>
  <Dialog :header="current_responsible ? current_responsible.employee_name : 'No one'" v-model:visible="display"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '45vw' }" @hide="hideResponsibleDetail">
    
    <div class="form-row form-column-2">
      <div>
        <div class="label"># Nomina</div>
        {{ current_responsible.employee_number }}
      </div>
      <div>
        <div class="label"># Télefono</div>
        {{ current_responsible.phone_number }}
      </div>
    </div>
    <div class="form-row form-column-2">
      <div>
        <div class="label">Puesto</div>
        {{ current_responsible.employee_position }}
      </div>
      <div>
        <div class="label">Correo eléctronico</div>
        {{ current_responsible.employee_email }}
      </div>
    </div>
    <div class="form-row form-column-2">
      <div>
        <div class="label">Sucursal</div>
        {{ current_responsible.employee_branch }}
      </div>
      <div>
        <div class="label">Planta / Departamento</div>
        {{ current_responsible.employee_area }}
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.form-row {
  margin: 15px 0;
}

.label {
  font-size: 1.25rem;
  color: #888;
  font-style: italic;
}
</style>