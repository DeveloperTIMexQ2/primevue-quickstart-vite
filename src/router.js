import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loading = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loading = false;
};

const routes = [
  {
    path: "/",
    name: 'Home',
    component: () => import('./views/Home.vue'),
    beforeEnter: requireAuth
  },
  {
    path: "/login",
    name: 'Login',
    component: () => import('./views/Login.vue')
  },
  {
    path: "/register",
    name: 'Register',
    component: () => import('./views/Register.vue'),
    beforeEnter: requireAuth
  },
  {
    path: "/computadoras",
    name: 'Computers',
    component: () => import('./views/Computers.vue'),
    beforeEnter: requireAuth
  },
  {
    path: "/telefonos",
    name: 'Smartphones',
    component: () => import('./views/Smartphones.vue'),
    beforeEnter: requireAuth
  },
  {
    path: "/impresoras",
    name: 'Printers',
    component: () => import('./views/Printers.vue'),
    beforeEnter: requireAuth
  },
  {
    path: "/historial",
    name: 'History',
    component: () => import('./views/History.vue'),
    beforeEnter: requireAuth
  },
  {
    path: "/correos",
    name: 'Emails',
    component: () => import('./views/Emails.vue'),
    beforeEnter: requireAuth
  },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;