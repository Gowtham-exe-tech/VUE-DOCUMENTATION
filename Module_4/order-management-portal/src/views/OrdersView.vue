<script setup>
import { computed, ref } from "vue";
import { useOrdersStore } from "../stores/orders";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const ordersStore = useOrdersStore();
const searchText = ref("");
const selectedStatus = ref("All statuses");
const statuses = ["All statuses", "Pending", "Processing", "Completed", "Cancelled"];
const filteredOrders = computed(() => {
  const query = searchText.value.trim().toLowerCase();
  return ordersStore.orders.filter((order) => {
    const matchesQuery = !query || [order.id, order.customer, order.email].some((value) => value.toLowerCase().includes(query));
    const matchesStatus = selectedStatus.value === "All statuses" || order.status === selectedStatus.value;
    return matchesQuery && matchesStatus;
  });
});
const formatMoney = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(amount);
const statusClass = (status) => `status-${status.toLowerCase()}`;
</script>

<template>
  <DefaultLayout>
    <section class="page-heading">
      <div><p class="eyebrow">ORDER OPERATIONS</p><h1>Orders</h1><p>Search, review, and manage customer orders.</p></div>
      <div class="heading-count"><strong>{{ ordersStore.orders.length }}</strong><span>total orders</span></div>
    </section>

    <section class="panel">
      <div class="toolbar">
        <label class="search-box"><span>⌕</span><input v-model="searchText" type="search" placeholder="Search by order, customer, or email..." /></label>
        <select v-model="selectedStatus" class="form-control filter-select" aria-label="Filter by status">
          <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ORDER</th><th>CUSTOMER</th><th>DATE</th><th>STATUS</th><th class="align-right">TOTAL</th><th></th></tr></thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td><RouterLink class="order-link" :to="`/orders/${order.id}`">{{ order.id }}</RouterLink><small class="table-subtext">{{ order.items.length }} line item(s)</small></td>
              <td><strong class="table-primary">{{ order.customer }}</strong><small class="table-subtext">{{ order.email }}</small></td>
              <td>{{ order.date }}</td>
              <td><span class="status" :class="statusClass(order.status)">{{ order.status }}</span></td>
              <td class="align-right amount">{{ formatMoney(order.total) }}</td>
              <td><RouterLink class="row-action" :to="`/orders/${order.id}`" :aria-label="`View ${order.id}`">↗</RouterLink></td>
            </tr>
            <tr v-if="filteredOrders.length === 0"><td colspan="6" class="empty-state">No orders match your search. Try another keyword or status.</td></tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">Showing <strong>{{ filteredOrders.length }}</strong> of <strong>{{ ordersStore.orders.length }}</strong> orders <span>Mock data for learning</span></div>
    </section>
  </DefaultLayout>
</template>