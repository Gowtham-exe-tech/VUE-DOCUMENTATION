<script setup lang="ts">
import { apiBaseUrl } from '@/services/apiConfig'
</script>
<template>
  <h1>Order Management Portal</h1>
  <p>A small practice project for Vite, Pinia, Vue Router, TypeScript, Vitest, Vue Test Utils and Playwright.</p>
  <p>API base URL: <code data-testid="apiBaseUrl">{{ apiBaseUrl }}</code></p>
  <p><RouterLink to="/orders">Go to Orders</RouterLink></p>
</template>
