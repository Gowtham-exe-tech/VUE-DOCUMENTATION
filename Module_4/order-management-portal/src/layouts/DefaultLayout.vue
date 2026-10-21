<script setup>
import AppHeader from "../components/AppHeader.vue";
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page-wrap">
      <slot />
    </main>
    <footer class="footer">Orderly Portal <span>•</span> Vue 3 + Pinia learning project</footer>
  </div>
</template>