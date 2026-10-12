<!-- components/OrderDashboard.vue -->
<script setup>
import { reactive, ref, computed } from 'vue'
import OrderCard from './OrderCard.vue'

// --- STATE MANAGEMENT ---
// Using reactive() directly for an array/object structure.
// Analogy: The "haunted mirror image". No .value needed, but don't destructure it!
const ordersState = reactive([
  { id: 1, dish: 'Classic Cheeseburger', qty: 2, status: 'Pending' },
  { id: 2, dish: 'Spicy Pepperoni Pizza', qty: 1, status: 'Pending' },
  { id: 3, dish: 'Crunchy Caesar Salad', qty: 3, status: 'Pending' }
])

// A simple ref text value for adding a new dish
const newDishName = ref('')

// --- COMPUTED PROPERTY vs METHOD ---
// Analogy: The "sticky note invoice total". 
// This only recalculates if ordersState actually changes. Super efficient!
const totalPendingOrders = computed(() => {
  console.log('⚡ Computed property ran because an order status changed!')
  return ordersState.filter(order => order.status === 'Pending').length
})

// Analogy: The "manually running a calculator layout".
// This function runs every single time the template re-renders for any reason!
function checkTotalOrdersCount() {
  console.log('🔄 Method ran to count total orders array!')
  return ordersState.length
}

// --- LOGIC FUNCTIONS ---
function addNewOrder() {
  if (newDishName.value.trim() === '') return
  
  // Push directly into our reactive array structure
  ordersState.push({
    id: Date.now(), // generating unique id
    dish: newDishName.value,
    qty: 1,
    status: 'Pending'
  })
  
  // Clear out the input field wrapper box
  newDishName.value = ''
} 


// This function acts as the interceptor for the child's Emitted event
function handleOrderCompleted(orderId) {
  // Find the exact order inside our array
  const foundOrder = ordersState.find(order => order.id === orderId)
  if (foundOrder) {
    foundOrder.status = 'Completed' // Change state -> UI updates automatically!
  }
}
</script>

<template>
  <div class="dashboard-box">
    <h2>Active Kitchen Orders</h2>
    
    <!-- Add new order section -->
    <div class="add-order-form">
      <input v-model="newDishName" placeholder="Enter new dish name..." />
      <button @click="addNewOrder">Send to Kitchen</button>
    </div>

    <!-- Performance Check Metadata Display -->
    <div class="metrics">
      <p>Pending Tickets (Computed Caching): <strong>{{ totalPendingOrders }}</strong></p>
      <p>Total History Tickets (Method Calculation): <strong>{{ checkTotalOrdersCount() }}</strong></p>
    </div>

    <!-- LIST RENDERING ENGINE -->
    <div class="orders-list">
      <!-- We loop through each order object and pass them down into the child cards -->
      <!-- We bind props with ":" and listen to custom events with "@" -->
      <OrderCard 
        v-for="item in ordersState" 
        :key="item.id"
        :id="item.id"
        :dishName="item.dish"
        :quantity="item.qty"
        :currentStatus="item.status"
        @orderDoneEvent="handleOrderCompleted"
      >
        <!-- DEFAULT SLOT HOOK: Passing custom body content inside the child component frame -->
        <p class="chef-note">🔥 Cook on high-flame flat top grill.</p>

        <!-- NAMED SLOT HOOK: Passing content directly marked for the footer location -->
        <template #ticketStamp>
          <span class="stamp-text">SYSTEM LOGGED</span>
        </template>
      </OrderCard>
    </div>
  </div>
</template>

<style scoped>
.dashboard-box {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.add-order-form {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
input {
  flex: 1;
  padding: 8px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
}
.metrics {
  font-size: 13px;
  color: #4a5568;
  border-bottom: 2px dashed #e2e8f0;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.orders-list {
  display: grid;
  gap: 15px;
}
.chef-note {
  font-style: italic;
  font-size: 12px;
  color: #dd6b20;
}
.stamp-text {
  font-size: 10px;
  background-color: #edf2f7;
  padding: 2px 6px;
  border-radius: 4px;
  color: #718096;
}
</style>
