<script setup>
import { computed } from "vue";
import { useOrdersStore } from "../stores/orders";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const ordersStore = useOrdersStore();
const totalOrders = computed(() => ordersStore.orders.length);
const formatMoney = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
</script>

<template>
  <DefaultLayout>
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow"><span class="eyebrow-dot"></span> ORDER OPERATIONS WORKSPACE</div>
        <h1>Good work starts<br />with <span>clear visibility.</span></h1>
        <p>Track orders, review customer details, and keep every status moving from one simple workspace.</p>
        <div class="hero-actions">
          <RouterLink class="button button-primary" to="/orders">Open orders <span aria-hidden="true">→</span></RouterLink>
          <RouterLink class="button button-secondary" to="/products/wireless-mouse">Explore product demo</RouterLink>
        </div>
      </div>
      <div class="hero-visual" aria-label="Order summary illustration">
        <div class="visual-glow"></div>
        <div class="visual-card visual-card-back"><span class="mini-icon purple">↗</span><div><small>Order value</small><strong>{{ formatMoney(ordersStore.totalOrderValue) }}</strong></div><span class="trend">+12.8%</span></div>
        <div class="visual-card visual-card-main">
          <div class="visual-card-heading"><span>Recent activity</span><span class="live-pill">LIVE DEMO</span></div>
          <div class="activity-row"><span class="activity-icon blue">▣</span><div><strong>Order #1001</strong><small>Aarav Sharma · just now</small></div><span class="status status-pending">Pending</span></div>
          <div class="activity-row"><span class="activity-icon green">✓</span><div><strong>Order #1003</strong><small>Kavin Kumar · 2h ago</small></div><span class="status status-completed">Completed</span></div>
          <div class="activity-row"><span class="activity-icon orange">◷</span><div><strong>Order #1002</strong><small>Priya Raman · 4h ago</small></div><span class="status status-processing">Processing</span></div>
          <div class="visual-foot"><span class="foot-dot"></span> All systems running smoothly</div>
        </div>
        <div class="floating-sticker">✦ <span>One clear view</span></div>
      </div>
    </section>

    <section class="section-heading">
      <div><p class="eyebrow">AT A GLANCE</p><h2>Your workspace, summarized</h2></div>
      <span class="muted-text">Demo data · Updates in this session</span>
    </section>
    <section class="stats-grid">
      <article class="stat-card"><div class="stat-top"><span>Total orders</span><span class="stat-icon blue">▤</span></div><strong>{{ totalOrders }}</strong><small>Across all order statuses</small></article>
      <article class="stat-card"><div class="stat-top"><span>Pending review</span><span class="stat-icon orange">◷</span></div><strong>{{ ordersStore.pendingOrders.length }}</strong><small>Waiting for the next action</small></article>
      <article class="stat-card"><div class="stat-top"><span>Completed</span><span class="stat-icon green">✓</span></div><strong>{{ ordersStore.completedOrders.length }}</strong><small>Successfully fulfilled orders</small></article>
      <article class="stat-card"><div class="stat-top"><span>Total order value</span><span class="stat-icon purple">₹</span></div><strong class="stat-money">{{ formatMoney(ordersStore.totalOrderValue) }}</strong><small>Combined demo order value</small></article>
    </section>

    <section class="bottom-banner">
      <div><span class="banner-icon">✦</span><div><strong>Ready to review the queue?</strong><p>Open an order to view its items and update its status.</p></div></div>
      <RouterLink class="button button-dark" to="/orders">View all orders <span>→</span></RouterLink>
    </section>
  </DefaultLayout>
</template>