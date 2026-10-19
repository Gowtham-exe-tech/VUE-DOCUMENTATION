<script setup>
defineProps({
  orders: { type: Array, required: true },
  isLoading: { type: Boolean, default: false }
});

const emit = defineEmits(['view-order']);

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
</script>

<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Order</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Items</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="isLoading">
          <td colspan="7" class="table-message">Loading orders…</td>
        </tr>

        <tr v-else-if="orders.length === 0">
          <td colspan="7" class="table-message">
            No matching orders found. Try changing the filters.
          </td>
        </tr>

        <tr v-for="order in orders" v-else :key="order.id">
          <td class="order-id">{{ order.id }}</td>

          <td>
            <div class="customer-name">{{ order.customer }}</div>
            <div class="customer-email">{{ order.email }}</div>
          </td>

          <td>{{ order.date }}</td>
          <td>{{ order.items }}</td>
          <td class="amount">{{ formatCurrency(order.amount) }}</td>

          <td>
            <span class="status-pill" :class="order.status.toLowerCase()">
              {{ order.status }}
            </span>
          </td>

          <td>
            <button class="text-button" @click="emit('view-order', order)">
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>