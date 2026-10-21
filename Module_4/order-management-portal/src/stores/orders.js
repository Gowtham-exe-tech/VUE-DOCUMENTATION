import { computed, ref } from "vue";
import { defineStore } from "pinia";

const initialOrders = [
  { id: "ORD-1001", customer: "Aarav Sharma", email: "aarav@example.com", date: "2026-10-20", status: "Pending", total: 1250.00, items: [{ name: "Wireless Mouse", quantity: 1, price: 650 }, { name: "USB-C Cable", quantity: 2, price: 300 }] },
  { id: "ORD-1002", customer: "Priya Raman", email: "priya@example.com", date: "2026-10-19", status: "Processing", total: 2499.00, items: [{ name: "Mechanical Keyboard", quantity: 1, price: 2499 }] },
  { id: "ORD-1003", customer: "Kavin Kumar", email: "kavin@example.com", date: "2026-10-18", status: "Completed", total: 899.00, items: [{ name: "Laptop Stand", quantity: 1, price: 899 }] },
  { id: "ORD-1004", customer: "Nila Devi", email: "nila@example.com", date: "2026-10-17", status: "Cancelled", total: 1599.00, items: [{ name: "Headphones", quantity: 1, price: 1599 }] },
  { id: "ORD-1005", customer: "Rahul Das", email: "rahul@example.com", date: "2026-10-16", status: "Pending", total: 3299.00, items: [{ name: "Webcam", quantity: 1, price: 3299 }] }
];

export const useOrdersStore = defineStore("orders", () => {
  const orders = ref(initialOrders.map((order) => ({ ...order, items: order.items.map((item) => ({ ...item })) })));
  const pendingOrders = computed(() => orders.value.filter((order) => order.status === "Pending"));
  const totalOrderValue = computed(() => orders.value.reduce((sum, order) => sum + order.total, 0));
  const completedOrders = computed(() => orders.value.filter((order) => order.status === "Completed"));

  function getOrderById(orderId) {
    return orders.value.find((order) => order.id === orderId);
  }

  function updateStatus(orderId, status) {
    const order = getOrderById(orderId);
    if (!order) return false;
    order.status = status;
    return true;
  }

  return { orders, pendingOrders, totalOrderValue, completedOrders, getOrderById, updateStatus };
});