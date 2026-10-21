import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Order, OrderStatus } from '@/types/order'
// returns a fresh array each time so tests never share data
function createSampleOrders(): Order[] {
  return [
    { id: 'ORD-1001', customerName: 'Priya Sharma', productName: 'Wireless Keyboard', totalAmount: 2499, status: 'Pending' },
    { id: 'ORD-1002', customerName: 'Arun Kumar', productName: '27-inch Monitor', totalAmount: 15999, status: 'Processing' },
    { id: 'ORD-1003', customerName: 'Meena Iyer', productName: 'USB-C Hub', totalAmount: 1899, status: 'Completed' },
    { id: 'ORD-1004', customerName: 'Karthik Raja', productName: 'Laptop Stand', totalAmount: 1299, status: 'Pending' },
    { id: 'ORD-1005', customerName: 'Divya Nair', productName: 'Noise Cancelling Headphones', totalAmount: 8999, status: 'Cancelled' },
    { id: 'ORD-1006', customerName: 'Suresh Babu', productName: 'Webcam 1080p', totalAmount: 3499, status: 'Completed' },
    { id: 'ORD-1007', customerName: 'Lakshmi Devi', productName: 'Mechanical Mouse', totalAmount: 1599, status: 'Pending' },
    { id: 'ORD-1008', customerName: 'Vignesh Selvam', productName: 'External SSD 1TB', totalAmount: 7499, status: 'Processing' },
  ]
}
export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>(createSampleOrders())
  // recalculates by itself whenever a status changes
  const pendingCount = computed(() => orders.value.filter((order) => order.status === 'Pending').length)
  // returns true when the order was found and updated, false when the id does not exist
  function updateOrderStatus(orderId: string, newStatus: OrderStatus): boolean {
    const foundOrder = orders.value.find((order) => order.id === orderId)
    if (!foundOrder) return false
    foundOrder.status = newStatus
    return true
  }
  // matches the search text against id, customer and product (ignores upper/lower case)
  function searchOrders(searchText: string): Order[] {
    const cleanText = searchText.trim().toLowerCase()
    if (cleanText === '') return orders.value
    return orders.value.filter((order) => [order.id, order.customerName, order.productName].some((field) => field.toLowerCase().includes(cleanText)))
  }
  return { orders, pendingCount, updateOrderStatus, searchOrders }
})
