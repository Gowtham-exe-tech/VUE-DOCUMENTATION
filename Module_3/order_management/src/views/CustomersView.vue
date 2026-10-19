<script setup>
import { computed, ref } from 'vue'

console.log("Customers setup started");

await new Promise((resolve) => setTimeout(resolve, 2000));

console.log("Customers setup finished");

const searchText = ref('');

const customers = ref([
  { id: 'CUS-208', name: 'Maya Raman', orders: 8, spend: 28400, tier: 'Gold', lastOrder: '2026-10-18' },
  { id: 'CUS-207', name: 'Arun Kumar', orders: 3, spend: 6700, tier: 'Standard', lastOrder: '2026-10-18' },
  { id: 'CUS-206', name: 'Nila Joseph', orders: 12, spend: 58300, tier: 'Platinum', lastOrder: '2026-10-17' },
  { id: 'CUS-205', name: 'Kavin Raj', orders: 5, spend: 14900, tier: 'Gold', lastOrder: '2026-10-16' },
  { id: 'CUS-204', name: 'Divya S', orders: 2, spend: 1850, tier: 'Standard', lastOrder: '2026-10-16' }
]);

const filteredCustomers = computed(() => {
  const search = searchText.value.trim().toLowerCase()

  return customers.value.filter((customer) => {
    return `${customer.id} ${customer.name}`.toLowerCase().includes(search)
  })
});

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
};
</script>

<template>
  <section class="workspace">
    <div class="section-heading">
      <div>
        <p class="eyebrow">CUSTOMER INTELLIGENCE</p>
        <h2>Customer Insights</h2>
        <p class="section-description">Review customer value and recent activity.</p>
      </div>

      <div class="view-chip">5 Sample Customers</div>
    </div>

    <section class="panel">
      <div class="panel-toolbar">
        <div>
          <h3>Customer Directory</h3>
          <p class="muted-copy">Try searching, then switch tabs and return.</p>
        </div>

        <label class="search-field">
          <span class="sr-only">Search customers</span>
          <input v-model="searchText" type="search" placeholder="Search customer..." />
        </label>
      </div>

      <div class="customer-grid">
        <article v-for="customer in filteredCustomers" :key="customer.id" class="customer-card">
          <div class="customer-card-top">
            <div class="avatar">
              {{ customer.name.split(' ').map((part) => part[0]).slice(0, 2).join('') }}
            </div>

            <span class="tier-pill" :class="`tier-${customer.tier.toLowerCase()}`">
              {{ customer.tier }}
            </span>
          </div>

          <p class="customer-id">{{ customer.id }}</p>
          <h3>{{ customer.name }}</h3>

          <div class="customer-details">
            <div>
              <span>Orders</span>
              <strong>{{ customer.orders }}</strong>
            </div>

            <div>
              <span>Total Spend</span>
              <strong>{{ formatCurrency(customer.spend) }}</strong>
            </div>
          </div>

          <p class="customer-last-order">Last order: {{ customer.lastOrder }}</p>
        </article>

        <p v-if="filteredCustomers.length === 0" class="empty-state">No customers found.</p>
      </div>
    </section>
  </section>
</template>