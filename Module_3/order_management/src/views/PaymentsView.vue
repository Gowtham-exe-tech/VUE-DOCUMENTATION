<script setup>
import { computed, ref } from 'vue'


const createdAt = ref(new Date().toLocaleTimeString())

// Simulate loading the payment audit workspace.
await new Promise((resolve) => setTimeout(resolve, 1000))

const selectedPeriod = ref('Today')

const transactions = ref([
  { id: 'PAY-8804', orderId: 'ORD-1048', method: 'UPI', amount: 4280, status: 'Captured', time: '10:42 AM' },
  { id: 'PAY-8803', orderId: 'ORD-1047', method: 'Card', amount: 1299, status: 'Captured', time: '10:16 AM' },
  { id: 'PAY-8802', orderId: 'ORD-1046', method: 'Net banking', amount: 8720, status: 'Under review', time: '09:58 AM' },
  { id: 'PAY-8801', orderId: 'ORD-1045', method: 'UPI', amount: 2490, status: 'Refunded', time: '09:20 AM' }
])

const capturedValue = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.status === 'Captured')
    .reduce((total, transaction) => total + transaction.amount, 0)
})

const reviewCount = computed(() => {
  return transactions.value.filter((transaction) => transaction.status === 'Under review').length
})

const refundCount = computed(() => {
  return transactions.value.filter((transaction) => transaction.status === 'Refunded').length
})

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}
</script>

<template>
  <section class="workspace">
    <div class="section-heading">
      <div>
        <h2>Payment Audit</h2>
        <p class="section-description">Review payment outcomes</p>
        <p class="section-description">
          Instance created at: <span style="color: var(--primary); font-weight: bold;">{{ createdAt }}</span>
        </p>
      </div>

      <label class="period-select">
        <span class="sr-only">Reporting period</span>
        <select v-model="selectedPeriod">
          <option>Today</option>
          <option>This week</option>
          <option>This month</option>
        </select>
      </label>
    </div>

    <div class="stats-grid">
      <article class="stat-card">
        <span class="stat-label">Captured Value</span>
        <strong>{{ formatCurrency(capturedValue) }}</strong>
        <span class="stat-footnote">{{ selectedPeriod }} - data</span>
      </article>

      <article class="stat-card">
        <span class="stat-label">Needs Review</span>
        <strong>{{ reviewCount }}</strong>
      
      </article>

      <article class="stat-card">
        <span class="stat-label">Refunds</span>
        <strong>{{ refundCount }}</strong>
      </article>
    </div>

    <section class="panel">
      <div class="panel-toolbar">
        <div>
          <h3>Recent Transactions</h3>
        </div>

      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Method</th>
              <th>Time</th>
              <th>Status</th>
              <th class="align-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td><span class="order-id">{{ transaction.id }}</span></td>
              <td>{{ transaction.orderId }}</td>
              <td>{{ transaction.method }}</td>
              <td>{{ transaction.time }}</td>
              <td>
                <span
                  class="status-pill"
                  :class="transaction.status === 'Captured' ? 'status-paid' : transaction.status === 'Refunded' ? 'status-review' : 'status-processing'"
                >
                  {{ transaction.status }}
                </span>
              </td>
              <td class="align-right amount-cell">{{ formatCurrency(transaction.amount) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>
