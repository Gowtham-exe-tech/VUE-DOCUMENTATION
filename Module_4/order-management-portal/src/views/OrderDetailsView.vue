<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useOrdersStore } from "../stores/orders";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const route = useRoute();
const ordersStore = useOrdersStore();
const order = computed(() => ordersStore.getOrderById(route.params.orderId));
const selectedStatus = ref(order.value?.status ?? "Pending");
const savedMessage = ref("");
const statusOptions = ["Pending", "Processing", "Completed", "Cancelled"];
const formatMoney = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(amount);
const statusClass = (status) => `status-${status.toLowerCase()}`;

watch(order, (newOrder) => {
  selectedStatus.value = newOrder?.status ?? "Pending";
  savedMessage.value = "";
});

function saveStatus() {
  if (!order.value) return;
  ordersStore.updateStatus(order.value.id, selectedStatus.value);
  savedMessage.value = `Status updated to ${selectedStatus.value}.`;
}
</script>

<template>
  <DefaultLayout>
    <div v-if="order">
      <RouterLink class="back-link page-back" to="/orders">← Back to orders</RouterLink>
      <section class="page-heading detail-heading">
        <div><p class="eyebrow">ORDER DETAILS</p><h1>{{ order.id }}</h1><p>Placed on {{ order.date }} · Customer order record</p></div>
        <span class="status status-large" :class="statusClass(order.status)">{{ order.status }}</span>
      </section>
      <div class="details-grid">
        <section class="panel detail-panel">
          <div class="panel-heading"><div><h2>Items in this order</h2><p>Review quantities and item totals.</p></div><span class="soft-tag">{{ order.items.length }} items</span></div>
          <div class="line-item" v-for="item in order.items" :key="item.name">
            <div class="product-thumb">{{ item.name.charAt(0) }}</div>
            <div class="line-item-name"><strong>{{ item.name }}</strong><small>Quantity: {{ item.quantity }}</small></div>
            <strong>{{ formatMoney(item.price * item.quantity) }}</strong>
          </div>
          <div class="order-total"><span>Order total</span><strong>{{ formatMoney(order.total) }}</strong></div>
        </section>
        <aside class="panel detail-panel">
          <div class="panel-heading"><div><h2>Customer</h2><p>Contact information</p></div><span class="stat-icon blue">♙</span></div>
          <div class="customer-block"><div class="customer-avatar">{{ order.customer.charAt(0) }}</div><div><strong>{{ order.customer }}</strong><small>{{ order.email }}</small></div></div>
          <div class="divider"></div>
          <h3 class="form-section-title">Update order status</h3>
          <label class="field-label" for="order-status">New status</label>
          <select id="order-status" v-model="selectedStatus" class="form-control">
            <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
          </select>
          <button class="button button-primary button-full status-save" @click="saveStatus">Save status</button>
          <p v-if="savedMessage" class="success-message">✓ {{ savedMessage }}</p>
          <p class="helper-text">Changes stay in Pinia memory and reset when the page reloads.</p>
        </aside>
      </div>
    </div>
    <section v-else class="not-found panel">
      <div class="not-found-icon">?</div><h1>Order not found</h1><p>There isn't an order with ID <strong>{{ route.params.orderId }}</strong>.</p><RouterLink class="button button-primary" to="/orders">Return to orders</RouterLink>
    </section>
  </DefaultLayout>
</template>