<script setup lang="ts">
import { isOrderStatus, orderStatuses, type OrderStatus } from '@/types/order'
// typed props: a wrong status string fails the type check
const props = defineProps<{ status: OrderStatus; orderId: string }>()
// typed event: the parent always receives a valid OrderStatus
const emit = defineEmits<{ statusChange: [newStatus: OrderStatus] }>()
function handleChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value
  // the DOM only gives a string so check it before emitting
  if (isOrderStatus(selectedValue)) emit('statusChange', selectedValue)
}
</script>
<template>
  <select :value="props.status" :aria-label="`Status for ${props.orderId}`" @change="handleChange">
    <option v-for="statusOption in orderStatuses" :key="statusOption" :value="statusOption">{{ statusOption }}</option>
  </select>
</template>
