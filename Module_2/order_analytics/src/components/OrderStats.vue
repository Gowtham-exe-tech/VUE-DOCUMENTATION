<script setup>
defineProps({
  totalOrders: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
  completedCount: { type: Number, required: true },
  pendingCount: { type: Number, required: true },
  processingCount: { type: Number, required: true }
});

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
</script>

<template>
  <section class="stats-grid">
    <article class="stat-card">
      <span class="stat-label">Total orders</span>
      <strong class="stat-value">{{ totalOrders }}</strong>
      <span class="stat-note">Orders in selected date range</span>
    </article>

    <article class="stat-card">
      <span class="stat-label">Revenue</span>
      <strong class="stat-value">{{ formatCurrency(totalRevenue) }}</strong>
      <span class="stat-note">Excludes cancelled orders</span>
    </article>

    <article class="stat-card">
      <span class="stat-label">Completed</span>
      <strong class="stat-value">{{ completedCount }}</strong>
      <span class="stat-note">Successfully fulfilled</span>
    </article>

    <article class="stat-card">
      <span class="stat-label">Needs attention</span>
      <strong class="stat-value">{{ pendingCount + processingCount }}</strong>
      <span class="stat-note">{{ pendingCount }} pending · {{ processingCount }} processing</span>
    </article>
  </section>
</template>