import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useOrdersStore } from '@/stores/orders'
describe('orders store', () => {
  // a brand new Pinia before every test so one test cannot affect another
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('loads the initial sample data', () => {
    const ordersStore = useOrdersStore()
    expect(ordersStore.orders).toHaveLength(8)
    expect(ordersStore.orders[0]).toEqual({ id: 'ORD-1001', customerName: 'Priya Sharma', productName: 'Wireless Keyboard', totalAmount: 2499, status: 'Pending' })
  })
  it('counts the pending orders', () => {
    const ordersStore = useOrdersStore()
    expect(ordersStore.pendingCount).toBe(3)
  })
  it('updates the status of an existing order', () => {
    const ordersStore = useOrdersStore()
    const wasUpdated = ordersStore.updateOrderStatus('ORD-1001', 'Completed')
    expect(wasUpdated).toBe(true)
    expect(ordersStore.orders.find((order) => order.id === 'ORD-1001')?.status).toBe('Completed')
  })
  it('changes the pending count when a status changes', () => {
    const ordersStore = useOrdersStore()
    ordersStore.updateOrderStatus('ORD-1001', 'Completed')
    expect(ordersStore.pendingCount).toBe(2)
    ordersStore.updateOrderStatus('ORD-1002', 'Pending')
    expect(ordersStore.pendingCount).toBe(3)
  })
  it('returns false and changes nothing for an unknown order', () => {
    const ordersStore = useOrdersStore()
    const wasUpdated = ordersStore.updateOrderStatus('ORD-9999', 'Completed')
    expect(wasUpdated).toBe(false)
    expect(ordersStore.pendingCount).toBe(3)
  })
  it('searches by id, customer and product', () => {
    const ordersStore = useOrdersStore()
    expect(ordersStore.searchOrders('ord-1003')).toHaveLength(1)
    expect(ordersStore.searchOrders('priya')[0].id).toBe('ORD-1001')
    expect(ordersStore.searchOrders('monitor')[0].id).toBe('ORD-1002')
    expect(ordersStore.searchOrders('nothing matches this')).toHaveLength(0)
  })
  it('catches an invalid status at compile time', () => {
    const ordersStore = useOrdersStore()
    // never called, it only exists so vue-tsc must report the error below
    const invalidCall = () => {
      // @ts-expect-error 'Shipped' is not an OrderStatus
      ordersStore.updateOrderStatus('ORD-1001', 'Shipped')
    }
    expect(typeof invalidCall).toBe('function')
  })
})
