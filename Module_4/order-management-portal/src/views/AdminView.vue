<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { useOrdersStore } from "../stores/orders";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const authStore = useAuthStore();
const ordersStore = useOrdersStore();
const formatMoney = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
const statusSummary = computed(() => ["Pending", "Processing", "Completed", "Cancelled"].map((status) => ({
  status,
  count: ordersStore.orders.filter((order) => order.status === status).length
})));
</script>

<template>
  <DefaultLayout>
    <section class="page-heading">
      <div><p class="eyebrow">MANAGER WORKSPACE</p><h1>Admin overview</h1><p>Review order activity and high-level operational metrics.</p></div>
      <span class="role-badge">♙ Manager access</span>
    </section>
    <div class="admin-welcome"><div class="admin-welcome-icon">✦</div><div><strong>Welcome, {{ authStore.user.name }}</strong><p>This page is available to the manager demo role only.</p></div></div>
    <section class="stats-grid admin-stats">
      <article class="stat-card"><div class="stat-top"><span>Orders in system</span><span class="stat-icon blue">▤</span></div><strong>{{ ordersStore.orders.length }}</strong><small>All recorded demo orders</small></article>
      <article class="stat-card"><div class="stat-top"><span>Pending orders</span><span class="stat-icon orange">◷</span></div><strong>{{ ordersStore.pendingOrders.length }}</strong><small>Need review or processing</small></article>
      <article class="stat-card"><div class="stat-top"><span>Completed orders</span><span class="stat-icon green">✓</span></div><strong>{{ ordersStore.completedOrders.length }}</strong><small>Successfully completed</small></article>
      <article class="stat-card"><div class="stat-top"><span>Total order value</span><span class="stat-icon purple">₹</span></div><strong class="stat-money">{{ formatMoney(ordersStore.totalOrderValue) }}</strong><small>Combined order value</small></article>
    </section>
    <section class="panel admin-panel">
      <div class="panel-heading"><div><h2>Orders by status</h2><p>A quick breakdown of the current order queue.</p></div><RouterLink class="button button-secondary button-small" to="/orders">Manage orders →</RouterLink></div>
      <div class="status-breakdown">
        <div v-for="item in statusSummary" :key="item.status" class="breakdown-row">
          <span class="status" :class="`status-${item.status.toLowerCase()}`">{{ item.status }}</span>
          <div class="bar-track"><div class="bar-fill" :style="{ width: `${ordersStore.orders.length ? item.count / ordersStore.orders.length * 100 : 0}%` }"></div></div>
          <strong>{{ item.count }}</strong>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>