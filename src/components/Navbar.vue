<script setup>
</script>

<template>
  <nav class="p-2 mt-0 fixed w-full z-10 top-0">
    <ul class="menu menu-horizontal bg-base-100 rounded-box">
      <li>
        <router-link :to="{name: 'Home'}">
          <i class="pi pi-home"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'Computers'}">
          <i class="pi pi-desktop"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'Smartphones'}">
          <i class="pi pi-tablet"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'Printers'}">
          <i class="pi pi-print"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'History'}">
          <i class="pi pi-history"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'Emails'}">
          <i class="pi pi-envelope"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/authors">
          <i class="pi pi-sign-out"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
a {
  text-decoration: none;
  font-weight: bold;
}
</style>