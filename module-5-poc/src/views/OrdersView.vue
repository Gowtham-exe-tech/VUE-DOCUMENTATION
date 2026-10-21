<script setup lang="ts">
import { computed, ref } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import OrderStatusSelect from '@/components/OrderStatusSelect.vue'
import type { OrderStatus } from '@/types/order'
const ordersStore = useOrdersStore()
const searchText = ref('')
// the table always shows the result of the store search
const visibleOrders = computed(() => ordersStore.searchOrders(searchText.value))
function handleStatusChange(orderId: string, newStatus: OrderStatus) {
  ordersStore.updateOrderStatus(orderId, newStatus)
}
</script>
<template>
  <h1>Orders</h1>
  <p>Pending orders: <strong data-testid="pendingCount">{{ ordersStore.pendingCount }}</strong></p>
  <p>
    <label for="searchOrders">Search orders</label>
    <input id="searchOrders" v-model="searchText" type="text" placeholder="ID, customer or product" />
  </p>
  <p v-if="visibleOrders.length === 0" data-testid="noResults">No orders match your search.</p>
  <div v-else class="tableWrapper">
    <table>
      <thead>
        <tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Total (INR)</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr v-for="order in visibleOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.productName }}</td>
          <td>{{ order.totalAmount.toFixed(2) }}</td>
          <td><OrderStatusSelect :status="order.status" :order-id="order.id" @status-change="(newStatus) => handleStatusChange(order.id, newStatus)" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
