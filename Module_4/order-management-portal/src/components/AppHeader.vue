<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const currentPath = computed(() => route.path);

function signOut() {
  authStore.logout();
  router.push("/");
}
</script>

<template>
  <header class="topbar">
    <RouterLink class="brand" to="/">
      <span class="brand-mark">O</span>
      <span>Orderly<span class="brand-light"> / Portal</span></span>
    </RouterLink>

    <nav class="main-nav">
      <RouterLink to="/" :class="{ active: currentPath === '/' }">Overview</RouterLink>
      <RouterLink v-if="authStore.isAuthenticated" to="/orders" :class="{ active: currentPath.startsWith('/orders') }">Orders</RouterLink>
      <RouterLink v-if="authStore.isManager" to="/admin" :class="{ active: currentPath === '/admin' }">Admin</RouterLink>
      <RouterLink to="/products/wireless-mouse" :class="{ active: currentPath.startsWith('/products') }">Product demo</RouterLink>
    </nav>

    <div class="topbar-actions">
      <template v-if="authStore.isAuthenticated">
        <div class="user-chip">
          <span class="avatar">{{ authStore.user.name.charAt(0) }}</span>
          <span class="user-label">{{ authStore.user.name }}<small>{{ authStore.user.role }}</small></span>
        </div>
        <button class="button button-quiet button-small" @click="signOut">Sign out</button>
      </template>
      <RouterLink v-else class="button button-primary button-small" to="/login">Sign in</RouterLink>
    </div>
  </header>
</template>