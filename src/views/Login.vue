<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useToast } from "primevue/usetoast";

const userStore = useUserStore();
const toast = useToast();

const formState = reactive({
  // email: "mexqdev@hackademy.mx",
  email: "",
  password: "",
});
const submitted = ref(false);

const rules = {
  email: { required, email },
  password: { required },
}

const v$ = useVuelidate(rules, formState)

const handleSubmit = async (isFormValid) => {
  console.log("🚀 ~ file: Login.vue ~ line 23 ~ handleSubmit ~ isFormValid", isFormValid)
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  console.log("Success:", isFormValid);
  const res = await userStore.loginUser(formState.email, formState.password);
  if (res === "auth/wrong-password") {
    console.log("🚀 ~ file: Login.vue ~ line 35 ~ handleSubmit ~ res", res);
    toast.add({ severity: 'error', summary: 'Error', detail: 'credenciales no válidas', life: 3000 });
  }
};
</script>

<template>
  <section class="background">
    <div class="row" v-for="num in 20">
      <div>
        <i class="pi pi-home"></i>
        <i class="pi pi-desktop"></i>
        <i class="pi pi-tablet"></i>
        <i class="pi pi-print"></i>
        <i class="pi pi-history"></i>
        <i class="pi pi-envelope"></i>
        <i class="pi pi-sign-out"></i>
        <i class="pi pi-home"></i>
        <i class="pi pi-desktop"></i>
        <i class="pi pi-tablet"></i>
        <i class="pi pi-print"></i>
        <i class="pi pi-history"></i>
        <i class="pi pi-envelope"></i>
        <i class="pi pi-sign-out"></i>
        <i class="pi pi-home"></i>
        <i class="pi pi-desktop"></i>
        <i class="pi pi-tablet"></i>
        <i class="pi pi-print"></i>
        <i class="pi pi-history"></i>
        <i class="pi pi-envelope"></i>
      </div>
      <div>
        <i class="pi pi-home"></i>
        <i class="pi pi-desktop"></i>
        <i class="pi pi-tablet"></i>
        <i class="pi pi-print"></i>
        <i class="pi pi-history"></i>
        <i class="pi pi-envelope"></i>
        <i class="pi pi-sign-out"></i>
        <i class="pi pi-home"></i>
        <i class="pi pi-desktop"></i>
        <i class="pi pi-tablet"></i>
        <i class="pi pi-print"></i>
        <i class="pi pi-history"></i>
        <i class="pi pi-envelope"></i>
        <i class="pi pi-sign-out"></i>
        <i class="pi pi-home"></i>
        <i class="pi pi-desktop"></i>
        <i class="pi pi-tablet"></i>
        <i class="pi pi-print"></i>
        <i class="pi pi-history"></i>
        <i class="pi pi-envelope"></i>
      </div>
    </div>
  </section>
  <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="max-width:80%;z-index: 1;">
      <div class="col-12"
        style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4"
          style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <img src="../assets/img/mexq.png" alt="Image" height="100" class="mb-3">
            <div class="text-900 text-3xl font-medium mb-3">Welcome, to the resguardeishon</div>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="email" v-model="v$.email.$model"
                    :class="{'p-invalid':v$.email.$invalid && submitted}" />
                  <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Correo</label>
                </div>
                <span v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response">
                  <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                    <small class="p-error">{{error.$message.replace('Value', 'Correo')}}</small>
                  </span>
                </span>
              </div>

              <div class="field">
                <div class="p-float-label">
                  <InputText type="password" id="password" v-model="v$.password.$model"
                    :class="{'p-invalid':v$.password.$invalid && submitted}" />
                  <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Contraseña</label>
                </div>
                <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">
                  {{v$.password.required.$message.replace('Value', 'Contraseña')}}
                </small>
              </div>
              <Button type="submit" label="Entrar" class="w-full p-3 text-xl"></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

section.background {
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #111;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

section.background .row {
  position: relative;
  top: -50%;
  width: 100%;
  display: flex;
  padding: 10px 0;
  white-space: nowrap;
  transform: rotate(-30deg);
}

section.background i {
  color: rgba(0, 0, 0, 0.5);
  font-size: 64px;
  transition: 1s;
  padding: 0 5px;
  user-select: none;
  cursor: default;
}

section.background i:hover {
  transition: 0s;
  color: var(--primary-color);
  text-shadow: 0 0 120px var(--primary-color-text);
}

section.background .row  div {
  animation: animate1 80s linear infinite;
  animation-delay: -80s;
}

section.background .row  div:nth-child(2) {
  animation: animate2 80s linear infinite;
  animation-delay: -40s;
}

@keyframes animate1 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes animate2 {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-200%);
  }
}

section.background .row:nth-child(even)  div {
  animation: animate3 80s linear infinite;
  animation-delay: -80s;
}

section.background .row:nth-child(even)  div:nth-child(2) {
  animation: animate4 80s linear infinite;
  animation-delay: -40s;
}

@keyframes animate3 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes animate4 {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>