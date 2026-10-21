import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderStatusSelect from '@/components/OrderStatusSelect.vue'
import { orderStatuses } from '@/types/order'
describe('OrderStatusSelect', () => {
  it('shows the current status', () => {
    const wrapper = mount(OrderStatusSelect, { props: { status: 'Processing', orderId: 'ORD-1002' } })
    expect((wrapper.get('select').element as HTMLSelectElement).value).toBe('Processing')
  })
  it('renders every allowed status option', () => {
    const wrapper = mount(OrderStatusSelect, { props: { status: 'Pending', orderId: 'ORD-1001' } })
    const optionTexts = wrapper.findAll('option').map((option) => option.text())
    expect(optionTexts).toEqual([...orderStatuses])
  })
  it('emits statusChange with the selected value', async () => {
    const wrapper = mount(OrderStatusSelect, { props: { status: 'Pending', orderId: 'ORD-1001' } })
    await wrapper.get('select').setValue('Completed')
    expect(wrapper.emitted('statusChange')).toEqual([['Completed']])
  })
  it('receives typed props and uses the order id in the label', () => {
    const wrapper = mount(OrderStatusSelect, { props: { status: 'Cancelled', orderId: 'ORD-1005' } })
    expect(wrapper.props('status')).toBe('Cancelled')
    expect(wrapper.props('orderId')).toBe('ORD-1005')
    expect(wrapper.get('select').attributes('aria-label')).toBe('Status for ORD-1005')
  })
  it('rejects an invalid status at compile time', () => {
    // never called, vue-tsc must report the error on the status prop
    const invalidMount = () => {
      // @ts-expect-error 'Shipped' is not an OrderStatus
      mount(OrderStatusSelect, { props: { status: 'Shipped', orderId: 'ORD-1001' } })
    }
    expect(typeof invalidMount).toBe('function')
  })
})
