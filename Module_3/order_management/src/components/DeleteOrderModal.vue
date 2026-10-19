<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'deleted'])

const isDeleting = ref(false)
const errorMessage = ref('')
let previousActiveElement = null

function handleKeydown(event) {
  if (event.key === 'Escape' && !isDeleting.value) {
    emit('close')
  }
}

async function confirmDelete() {
  isDeleting.value = true
  errorMessage.value = ''

  try {
    // Simulate waiting for a backend response.
    await new Promise((resolve) => setTimeout(resolve, 650))

    emit('deleted', props.order.id)
  } catch {
    errorMessage.value = 'Unable to delete this order. Please try again.'
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  previousActiveElement = document.activeElement
  window.addEventListener('keydown', handleKeydown)
  document.body.classList.add('modal-open')
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('modal-open')
  previousActiveElement?.focus?.()
})
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click.self="!isDeleting && emit('close')">
      <section
        class="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div class="modal-icon">!</div>
        <p class="eyebrow">DESTRUCTIVE ACTION</p>

        <h2 id="delete-modal-title">Delete {{ order.id }}?</h2>

        <p id="delete-modal-description" class="modal-description">
          This will remove <strong>{{ order.customer }}</strong>'s order from this demo workspace.
        </p>

        <p v-if="errorMessage" class="notice notice-error" role="alert">
          {{ errorMessage }}
        </p>

        <div class="modal-actions">
          <button class="button button-secondary" :disabled="isDeleting" @click="emit('close')">
            Cancel
          </button>

          <button class="button button-danger" :disabled="isDeleting" @click="confirmDelete">
            {{ isDeleting ? 'Deleting...' : 'Delete Order' }}
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>