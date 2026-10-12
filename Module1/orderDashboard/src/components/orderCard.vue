<!-- src/components/OrderCard.vue -->
<script setup>
import { inject } from 'vue'

// 1. PROPS: The read-only worker contract from the parent
defineProps({
  id: Number,
  dishName: String,
  quantity: Number,
  currentStatus: String
})

// 2. EMITS: The email trigger channel to alert the parent manager
const emit = defineEmits(['orderDoneEvent'])

function markAsFinished(targetId) {
  emit('orderDoneEvent', targetId)
}

// 3. INJECT: Tuning our radio to the Grandparent's broadcast frequency
const sharedKitchenPace = inject('globalKitchenStatus')
</script>

<template>
  <div class="card-item" :class="{ 'done': currentStatus === 'Completed' }">
    <div class="card-header">
      <h3>{{ dishName }} (x{{ quantity }})</h3>
      <span class="pace-badge">Pace: {{ sharedKitchenPace }}</span>
    </div>

    <!-- DEFAULT SLOT HOOK: Gap for custom parent markup -->
    <div class="card-content-slot">
      <slot>
        <p class="fallback-txt">No special chef instructions added.</p>
      </slot>
    </div>

    <div class="card-footer">
      <!-- NAMED SLOT HOOK: For specific stamped content -->
      <slot name="ticketStamp"></slot>

      <button 
        v-if="currentStatus === 'Pending'" 
        @click="markAsFinished(id)"
        class="complete-btn"
      >
        Mark Complete ✓
      </button>
      <span v-else class="success-label">Ready for Pickup 🛍️</span>
    </div>
  </div>
</template>

<style scoped>
.card-item {
  border: 1px solid #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  background-color: #fff;
  transition: all 0.2s ease;
  margin-bottom: 10px;
}
.card-item.done {
  border-color: #c6f6d5;
  background-color: #f0fff4;
  opacity: 0.8;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3 { margin: 0; color: #2d3748; }
.pace-badge {
  font-size: 11px;
  background-color: #fffaf0;
  border: 1px solid #feebc8;
  color: #dd6b20;
  padding: 2px 6px;
  border-radius: 20px;
}
.card-content-slot { margin: 10px 0; }
.fallback-txt { font-size: 12px; color: #a0aec0; }
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.complete-btn {
  background-color: #48bb78;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.complete-btn:hover { background-color: #38a169; }
.success-label { color: #38a169; font-weight: bold; font-size: 13px; }
</style>
