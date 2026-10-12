<!-- src/App.vue -->
<script setup>
import { ref, provide } from 'vue'
import OrderDashboard from './components/OrderDashboard.vue' // Import the dashboard panel!

const kitchenStatus = ref('Normal Flow')

// PROVIDE: Broadcasting our status state down the complete layout hierarchy
provide('globalKitchenStatus', kitchenStatus)

function toggleKitchenStatus() {
  if (kitchenStatus.value === 'Normal Flow') {
    kitchenStatus.value = 'RUSH HOUR RUSH!'
  } else {
    kitchenStatus.value = 'Normal Flow'
  }
}
</script>

<template>
  <div class="app-root">
    <h1>🍳 Intern Kitchen Dashboards Co.</h1>
    
    <div class="status-panel">
      <p>Current System Status: <strong>{{ kitchenStatus }}</strong></p>
      <button @click="toggleKitchenStatus">Change Kitchen Pace Mode</button>
    </div>

    <!-- Invoking the Dashboard layer -->
    <OrderDashboard />
  </div>
</template>

<style scoped>
.app-root {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 40px auto;
  background-color: #f7fafc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.status-panel {
  background-color: #e2e8f0;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-panel p { margin: 0; }
button {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
button:hover { background-color: #2b6cb0; }
</style>
