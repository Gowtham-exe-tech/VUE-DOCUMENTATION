<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

// Simulate asynchronous setup so Suspense can display its fallback.
await new Promise((resolve) => setTimeout(resolve, 2000))

const emit = defineEmits(['request-delete'])

const orders = ref([
  { id: 'ORD-1048', customer: 'Maya Raman', amount: 4280, status: 'Processing', date: '2026-10-18', channel: 'Web' },
  { id: 'ORD-1047', customer: 'Arun Kumar', amount: 1299, status: 'Paid', date: '2026-10-18', channel: 'Mobile' },
  { id: 'ORD-1046', customer: 'Nila Joseph', amount: 8720, status: 'Review', date: '2026-10-17', channel: 'Web' },
  { id: 'ORD-1045', customer: 'Kavin Raj', amount: 2490, status: 'Shipped', date: '2026-10-16', channel: 'Partner' },
  { id: 'ORD-1044', customer: 'Divya S', amount: 560, status: 'Paid', date: '2026-10-16', channel: 'Mobile' },
  { id: 'ORD-1043', customer: 'Rohan Das', amount: 6450, status: 'Processing', date: '2026-10-15', channel: 'Web' }
])

const searchText = ref('')
const statusFilter = ref('All statuses')
const currentPage = ref(1)
const pageSize = 4
const isRefreshing = ref(false)
const lastRefreshed = ref('Just now')

const filteredOrders = computed(() => {
  const search = searchText.value.trim().toLowerCase()

  return orders.value.filter((order) => {
    const matchesSearch = !search || `${order.id} ${order.customer}`.toLowerCase().includes(search)
    const matchesStatus = statusFilter.value === 'All statuses' || order.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredOrders.value.length / pageSize)))

const visibleOrders = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize

  return filteredOrders.value.slice(startIndex, startIndex + pageSize)
})

const totalValue = computed(() => {
  return filteredOrders.value.reduce((total, order) => total + order.amount, 0)
})

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

function refreshOrders() {
  isRefreshing.value = true

  setTimeout(() => {
    lastRefreshed.value = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })

    isRefreshing.value = false
  }, 600)
}

function removeDeletedOrder(event) {
  orders.value = orders.value.filter((order) => order.id !== event.detail.orderId)

  // A deletion can reduce the number of pages.
  if (currentPage.value > pageCount.value) {
    currentPage.value = pageCount.value
  }
}

onMounted(() => {
  window.addEventListener('order-deleted', removeDeletedOrder)
})

onUnmounted(() => {
  window.removeEventListener('order-deleted', removeDeletedOrder)
})
</script>

<template>
  <section class="workspace">
    <div class="section-heading">
      <div>
        <p class="eyebrow">ORDER OPERATIONS</p>
        <h2>Orders Workspace</h2>
        <p class="section-description">Search, review, and manage incoming orders.</p>
      </div>

      <button class="button button-secondary" :disabled="isRefreshing" @click="refreshOrders">
        {{ isRefreshing ? 'Refreshing...' : 'Refresh Data' }}
      </button>
    </div>

    <div class="stats-grid">
      <article class="stat-card">
        <span class="stat-label">Matching Orders</span>
        <strong>{{ filteredOrders.length }}</strong>
        <span class="stat-footnote">Based on current filters</span>
      </article>

      <article class="stat-card">
        <span class="stat-label">Matching Order Value</span>
        <strong>{{ formatCurrency(totalValue) }}</strong>
        <span class="stat-footnote">INR · filtered results</span>
      </article>

      <article class="stat-card">
        <span class="stat-label">Last Refreshed</span>
        <strong class="refresh-value">{{ lastRefreshed }}</strong>
        <span class="stat-footnote">Demo refresh status</span>
      </article>
    </div>

    <section class="panel">
      <div class="panel-toolbar">
        <div>
          <h3>Order Register</h3>
          <p class="muted-copy">Search and filter state should remain when switching tabs.</p>
        </div>

        <div class="filters">
          <label class="search-field">
            <span class="sr-only">Search orders</span>
            <input v-model="searchText" type="search" placeholder="Search ID or customer..." />
          </label>

          <label>
            <span class="sr-only">Filter by status</span>
            <select v-model="statusFilter">
              <option>All statuses</option>
              <option>Paid</option>
              <option>Processing</option>
              <option>Review</option>
              <option>Shipped</option>
            </select>
          </label>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Channel</th>
              <th>Status</th>
              <th class="align-right">Amount</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="order in visibleOrders" :key="order.id">
              <td><span class="order-id">{{ order.id }}</span></td>
              <td>{{ order.customer }}</td>
              <td>{{ order.date }}</td>
              <td>{{ order.channel }}</td>
              <td>
                <span class="status-pill" :class="`status-${order.status.toLowerCase()}`">
                  {{ order.status }}
                </span>
              </td>
              <td class="align-right amount-cell">{{ formatCurrency(order.amount) }}</td>
              <td class="align-right">
                <button class="small-action" @click="emit('request-delete', order)">
                  Manage
                </button>
              </td>
            </tr>

            <tr v-if="visibleOrders.length === 0">
              <td colspan="7" class="empty-state">No orders match the current filters.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <span class="muted-copy">Page {{ currentPage }} of {{ pageCount }}</span>

        <div class="pagination">
          <button class="button button-secondary button-small" :disabled="currentPage <= 1" @click="currentPage--">
            Previous
          </button>

          <button class="button button-secondary button-small" :disabled="currentPage >= pageCount" @click="currentPage++">
            Next
          </button>
        </div>
      </div>
    </section>
  </section>
</template>