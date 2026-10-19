import { computed, reactive, ref, shallowReactive, shallowRef, watch, watchEffect } from 'vue';
import { getOrders } from '../services/ordersApi';

export function useOrders() {
  // Store order data and individual UI values.
  const orders = ref([]);
  const searchText = ref('');
  const isLoading = ref(false);
  const errorMessage = ref('');
  const selectedOrder = ref(null);

  // Keep related filter values together.
  const filters = reactive({
    status: 'All',
    startDate: '',
    endDate: ''
  });

  // Only the top-level properties need to be reactive here.
  const requestOptions = shallowReactive({
    page: 1,
    pageSize: 5
  });

  // Store a summary snapshot that gets replaced as a whole.
  const chartSnapshot = shallowRef([]);

  let latestRequestId = 0;

  async function loadOrders() {
    const requestId = ++latestRequestId;

    isLoading.value = true;
    errorMessage.value = '';

    try {
      const result = await getOrders({
        startDate: filters.startDate,
        endDate: filters.endDate
      });

      // Ignore older responses if a newer request has started.
      if (requestId === latestRequestId) {
        orders.value = result;
      }
    } catch (error) {
      if (requestId === latestRequestId) {
        errorMessage.value = 'Orders could not be loaded. Please try again.';
      }
    } finally {
      if (requestId === latestRequestId) {
        isLoading.value = false;
      }
    }
  }

  // Derive the visible orders from the current search and status.
  const filteredOrders = computed(() => {
    const search = searchText.value.trim().toLowerCase();

    return orders.value.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search) ||
        order.customer.toLowerCase().includes(search) ||
        order.email.toLowerCase().includes(search);

      const matchesStatus =
        filters.status === 'All' || order.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  });

  // Calculate revenue without including cancelled orders.
  const totalRevenue = computed(() => {
    return orders.value
      .filter((order) => order.status !== 'Cancelled')
      .reduce((total, order) => total + order.amount, 0);
  });

  const completedCount = computed(() => {
    return orders.value.filter((order) => order.status === 'Completed').length;
  });

  const pendingCount = computed(() => {
    return orders.value.filter((order) => order.status === 'Pending').length;
  });

  const processingCount = computed(() => {
    return orders.value.filter((order) => order.status === 'Processing').length;
  });

  const filteredAmount = computed(() => {
    return filteredOrders.value.reduce((total, order) => total + order.amount, 0);
  });

  const pageCount = computed(() => {
    return Math.max(1, Math.ceil(filteredOrders.value.length / requestOptions.pageSize));
  });

  const paginatedOrders = computed(() => {
    const startIndex = (requestOptions.page - 1) * requestOptions.pageSize;

    return filteredOrders.value.slice(startIndex, startIndex + requestOptions.pageSize);
  });

  function setPage(page) {
    requestOptions.page = Math.min(Math.max(1, page), pageCount.value);
  }

  function addSampleOrder() {
    const orderNumbers = orders.value.map((order) => Number(order.id.slice(4)));
    const nextNumber = Math.max(1000, ...orderNumbers) + 1;

    orders.value.unshift({
      id: `ORD-${nextNumber}`,
      customer: 'New Customer',
      email: 'new.customer@example.com',
      amount: 2000,
      status: 'Pending',
      date: new Date().toISOString().slice(0, 10),
      items: 1
    });

    requestOptions.page = 1;
  }

  function clearFilters() {
    searchText.value = '';
    filters.status = 'All';
    filters.startDate = '';
    filters.endDate = '';
  }

  // Fetch new data when the date range changes.
  watch(
    [() => filters.startDate, () => filters.endDate],
    () => {
      requestOptions.page = 1;
      loadOrders();
    },
    { immediate: true }
  );

  // Reset pagination when search or status changes.
  watch([searchText, () => filters.status], () => {
    requestOptions.page = 1;
  });

  // Automatically track orders.value and rebuild the summary.
  watchEffect(() => {
    const statuses = ['Completed', 'Pending', 'Processing', 'Cancelled'];

    chartSnapshot.value = statuses.map((status) => ({
      status,
      count: orders.value.filter((order) => order.status === status).length
    }));
  });

  return {
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
  };
}