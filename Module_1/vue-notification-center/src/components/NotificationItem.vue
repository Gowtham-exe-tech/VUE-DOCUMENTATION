<script setup>
import { inject } from "vue";

const props = defineProps({
  notification: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["mark-read", "dismiss", "open"]);

const notificationTheme = inject("notificationTheme", "light");

const typeLabels = {
  approval: "Approval",
  comment: "Comment",
  success: "Completed",
  security: "Security"
};

function markRead(id) {
  emit("mark-read", id);
}

function openNotification() {
  emit("open", props.notification);
}
</script>

<template>
  <article
    class="notification-item"
    :class="[
      { unread: !notification.read },
      `type-${notification.type}`,
      `item-${notificationTheme}`
    ]"
  >
    <div class="notification-avatar" aria-hidden="true">
      {{ notification.actor }}
    </div>

    <div class="notification-content">
      <div class="notification-meta">
        <span>{{ typeLabels[notification.type] }}</span>
        <span>·</span>
        <time>{{ notification.time }}</time>
        <span v-if="!notification.read" class="unread-dot" aria-label="Unread"></span>
      </div>

      <h3>{{ notification.title }}</h3>
      <p>{{ notification.message }}</p>

      <div class="notification-actions">
        <slot
          name="actions"
          :item="notification"
          :mark-read="markRead"
        >
          <button
            class="item-action-button"
            type="button"
            @click="openNotification"
          >
            {{ notification.actionLabel }}
          </button>
        </slot>
      </div>
    </div>

    <div class="item-controls">
      <button
        class="icon-button"
        type="button"
        aria-label="Open notification"
        @click="openNotification"
      >
        ↗
      </button>

      <button
        class="icon-button"
        type="button"
        aria-label="Dismiss notification"
        @click="emit('dismiss', notification.id)"
      >
        ×
      </button>
    </div>
  </article>
</template>