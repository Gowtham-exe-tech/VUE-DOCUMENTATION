<script setup>
import { computed, defineAsyncComponent, ref } from "vue";
import DeleteOrderModal from "./components/DeleteOrderModal.vue";

// Load each dashboard view only when it is needed.
const OrdersView = defineAsyncComponent({
  loader: () => import("./views/OrdersView.vue"),
  suspensible: true,
});

const CustomersView = defineAsyncComponent({
  loader: () => import("./views/CustomersView.vue"),
  suspensible: true,
});

const PaymentsView = defineAsyncComponent({
  loader: () => import("./views/PaymentsView.vue"),
  suspensible: true,
});

const activeTab = ref("orders");
const isDeleteModalOpen = ref(false);
const selectedOrder = ref(null);

const dashboardViews = {
  orders: OrdersView,
  customers: CustomersView,
  payments: PaymentsView,
};

const activeViewName = computed(() => {
  const names = {
    orders: "Orders Workspace",
    customers: "Customer Insights",
    payments: "Payment Audit",
  };

  return names[activeTab.value];
});

function openDeleteModal(order) {
  selectedOrder.value = order;
  isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
  isDeleteModalOpen.value = false;
  selectedOrder.value = null;
}

function handleOrderDeleted(orderId) {
  // Notify the Orders view that the order was deleted.
  window.dispatchEvent(
    new CustomEvent("order-deleted", {
      detail: { orderId },
    }),
  );

  closeDeleteModal();
}
</script>

<template>
  <main class="app-shell">
    <header class="topbar">
      <div class="brand-mark">OM</div>

      <div class="brand-copy">
        <!-- <p class="eyebrow">OPERATIONS CONSOLE</p> -->
        <h1>Order Management</h1>
      </div>

    </header>

    <section class="welcome-row">
      <div>
        <h2>Keep the work moving.</h2>
        <p class="welcome-copy">
          Manage orders, customers, and payments from one workspace.
        </p>
      </div>

      <div class="welcome-metric">
        <span class="metric-label">ACTIVE WORKSPACE</span>
        <strong>{{ activeViewName }}</strong>
      </div>
    </section>

    <nav class="tab-bar" aria-label="Dashboard sections">
      <button
        :class="{ active: activeTab === 'orders' }"
        @click="activeTab = 'orders'"
      >
        Orders
      </button>

      <button
        :class="{ active: activeTab === 'customers' }"
        @click="activeTab = 'customers'"
      >
        Customers
      </button>

      <button
        :class="{ active: activeTab === 'payments' }"
        @click="activeTab = 'payments'"
      >
        Payment Audit
      </button>
    </nav>

    <!-- KeepAlive caches the workspace components when switching tabs. -->

    <KeepAlive :max="3">
      <Suspense :timeout="0">
        <template #default>
          <component
            :is="dashboardViews[activeTab]"
            :key="activeTab"
            @request-delete="openDeleteModal"
          />
        </template>

        <template #fallback>
          <div class="suspense-fallback">
            <h2>Preparing your workspace...</h2>
            <div class="loading-progress">
              <div class="loading-progress-bar"></div>
            </div>
          </div>
        </template>
      </Suspense>
    </KeepAlive>

    <!-- Teleport renders the modal under body. -->

    
    <DeleteOrderModal
      v-if="isDeleteModalOpen && selectedOrder"
      :order="selectedOrder"
      @close="closeDeleteModal"
      @deleted="handleOrderDeleted"
    />

    <footer class="app-footer">
      <span>Dynamic Component - KeepAlive - Teleport - Suspense</span>
    </footer>
  </main>
</template>
