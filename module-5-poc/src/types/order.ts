// all allowed statuses, the union type below is built from this list
export const orderStatuses = ['Pending', 'Processing', 'Completed', 'Cancelled'] as const
export type OrderStatus = (typeof orderStatuses)[number]
export interface Order {
  id: string
  customerName: string
  productName: string
  totalAmount: number
  status: OrderStatus
}
// checks a plain string at runtime, TypeScript cannot do this for us
export function isOrderStatus(value: string): value is OrderStatus {
  return (orderStatuses as readonly string[]).includes(value)
}
