<script setup>
import { computed } from 'vue';
import OrderStats from '../components/OrderStats.vue';
import OrdersTable from '../components/OrdersTable.vue';
import { useOrders } from '../composables/useOrders';

const {
  orders,
  searchText,
  filters,
  requestOptions,
  chartSnapshot,
  isLoading,
  errorMessage,
  selectedOrder,
  filteredOrders,
  paginatedOrders,
  pageCount,
  totalRevenue,
  completedCount,
  pendingCount,
  processingCount,
  filteredAmount,
  loadOrders,
  setPage,
  addSampleOrder,
  clearFilters
} = useOrders();

const totalOrders = computed(() => orders.value.length);

const maxChartCount = computed(() => {
  return Math.max(1, ...chartSnapshot.value.map((item) => item.count));
});

function showOrder(order) {
  selectedOrder.value = order;
}

function closeOrderDetails() {
  selectedOrder.value = null;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
</script>

<template>
  <main class="app-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Orderly home">
        <span class="brand-mark">O</span>
        <span>orderly<span class="brand-dot">.</span></span>
      </a>

      <div class="topbar-right">
        <span class="live-dot"></span>
        <span>Operations workspace</span>
        <div class="avatar">G</div>
      </div>
    </header>

    <div class="page-content">
      <section class="page-heading">
        <div>
          <p class="eyebrow">OVERVIEW / ORDERS</p>
          <h1>Orders analytics</h1>
          <p class="page-description">
            Track order activity, revenue and fulfilment at a glance.
          </p>
        </div>

        <button class="primary-button" @click="addSampleOrder">
          ＋ Add sample order
        </button>
      </section>

      <OrderStats
        :total-orders="totalOrders"
        :total-revenue="totalRevenue"
        :completed-count="completedCount"
        :pending-count="pendingCount"
        :processing-count="processingCount"
      />

      <section class="panel chart-panel">
        <div class="panel-heading">
          <div>
            <h2>Order status breakdown</h2>
            <p>Live summary based on the loaded order data.</p>
          </div>

          <span class="small-badge">LIVE SUMMARY</span>
        </div>

        <div class="chart-list">
          <div v-for="item in chartSnapshot" :key="item.status" class="chart-row">
            <span class="chart-label">{{ item.status }}</span>

            <div class="chart-track">
              <div
                class="chart-bar"
                :class="item.status.toLowerCase()"
                :style="{ width: `${(item.count / maxChartCount) * 100}%` }"
              ></div>
            </div>

            <strong class="chart-count">{{ item.count }}</strong>
          </div>
        </div>
      </section>

      <section class="panel orders-panel">
        <div class="panel-heading orders-panel-heading">
          <div>
            <h2>Recent orders</h2>
            <p>Search, filter and inspect individual orders.</p>
          </div>

          <button class="secondary-button" :disabled="isLoading" @click="loadOrders">
            {{ isLoading ? 'Refreshing…' : '↻ Refresh' }}
          </button>
        </div>

        <div class="filter-bar">
          <label class="search-field">
            <span class="sr-only">Search orders</span>
            <span class="search-icon">⌕</span>
            <input
              v-model="searchText"
              type="search"
              placeholder="Search order, customer or email…"
            >
          </label>

          <label class="filter-field">
            <span>Status</span>
            <select v-model="filters.status">
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Cancelled</option>
            </select>
          </label>

          <label class="filter-field">
            <span>From</span>
            <input v-model="filters.startDate" type="date" :max="filters.endDate || undefined">
          </label>

          <label class="filter-field">
            <span>To</span>
            <input v-model="filters.endDate" type="date" :min="filters.startDate || undefined">
          </label>

          <button class="clear-button" @click="clearFilters">Clear</button>
        </div>

        <div v-if="errorMessage" class="error-banner" role="alert">
          <span>{{ errorMessage }}</span>
          <button class="text-button" @click="loadOrders">Try again</button>
        </div>

        <OrdersTable
          :orders="paginatedOrders"
          :is-loading="isLoading"
          @view-order="showOrder"
        />

        <footer class="table-footer">
          <span>
            Showing
            <strong>
              {{ filteredOrders.length ? (requestOptions.page - 1) * requestOptions.pageSize + 1 : 0 }}–{{ Math.min(requestOptions.page * requestOptions.pageSize, filteredOrders.length) }}
            </strong>
            of <strong>{{ filteredOrders.length }}</strong> matching orders
          </span>

          <div class="pagination">
            <button
              :disabled="requestOptions.page <= 1"
              @click="setPage(requestOptions.page - 1)"
            >
              Previous
            </button>

            <span>Page {{ requestOptions.page }} of {{ pageCount }}</span>

            <button
              :disabled="requestOptions.page >= pageCount"
              @click="setPage(requestOptions.page + 1)"
            >
              Next
            </button>
          </div>
        </footer>

        <div class="filtered-total">
          <span>Amount of currently matching orders</span>
          <strong>{{ formatCurrency(filteredAmount) }}</strong>
        </div>
      </section>

      <p class="demo-note">
        Demo project · API calls are simulated locally in
        <code>ordersApi.js</code>.
      </p>
    </div>

    <div
      v-if="selectedOrder"
      class="modal-backdrop"
      @click.self="closeOrderDetails"
    >
      <section
        class="detail-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="`Details for ${selectedOrder.id}`"
      >
        <div class="modal-heading">
          <div>
            <p class="eyebrow">ORDER DETAILS</p>
            <h2>{{ selectedOrder.id }}</h2>
          </div>

          <button class="icon-button" aria-label="Close order details" @click="closeOrderDetails">
            ×
          </button>
        </div>

        <div class="detail-list">
          <div><span>Customer</span><strong>{{ selectedOrder.customer }}</strong></div>
          <div><span>Email</span><strong>{{ selectedOrder.email }}</strong></div>
          <div><span>Order date</span><strong>{{ selectedOrder.date }}</strong></div>
          <div><span>Items</span><strong>{{ selectedOrder.items }}</strong></div>
          <div><span>Amount</span><strong>{{ formatCurrency(selectedOrder.amount) }}</strong></div>
          <div><span>Status</span><strong>{{ selectedOrder.status }}</strong></div>
        </div>

        <button class="primary-button modal-close" @click="closeOrderDetails">
          Done
        </button>
      </section>
    </div>
  </main>
</template>