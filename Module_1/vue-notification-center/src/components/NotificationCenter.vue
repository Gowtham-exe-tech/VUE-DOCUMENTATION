<script setup>
import { computed, ref, inject } from "vue";
import NotificationItem from "./NotificationItem.vue";

// Sample data for developing the notification UI.
const notifications = ref([
  {
    id: 1,
    type: "approval",
    title: "Expense report needs approval",
    message: "Priya submitted an expense report for ₹8,450.",
    time: "5 min ago",
    read: false,
    actor: "P",
    actorName: "Priya",
    actionLabel: "Review report"
  },
  {
    id: 2,
    type: "comment",
    title: "New comment on your task",
    message: "Arun mentioned you in the onboarding checklist.",
    time: "24 min ago",
    read: false,
    actor: "A",
    actorName: "Arun",
    actionLabel: "View comment"
  },
  {
    id: 3,
    type: "success",
    title: "Weekly report is ready",
    message: "Your team's weekly activity report is ready.",
    time: "1 hour ago",
    read: true,
    actor: "✓",
    actorName: "Pulse",
    actionLabel: "Open report"
  },
  {
    id: 4,
    type: "security",
    title: "New sign-in detected",
    message: "A sign-in was detected from Chrome on Windows.",
    time: "Yesterday",
    read: true,
    actor: "!",
    actorName: "Security",
    actionLabel: "Check activity"
  }
]);

const activeFilter = ref("all");
const searchText = ref("");
const notificationTheme = inject("notificationTheme", ref("light"));

// Count only notifications that have not been read.
const unreadCount = computed(() => {
  return notifications.value.filter((item) => !item.read).length;
});

// Apply the selected filter and search text.
const visibleNotifications = computed(() => {
  const search = searchText.value.trim().toLowerCase();

  return notifications.value.filter((item) => {
    const matchesFilter =
      activeFilter.value === "all" ||
      (activeFilter.value === "unread" && !item.read) ||
      (activeFilter.value === "read" && item.read);

    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search) ||
      item.message.toLowerCase().includes(search) ||
      item.actorName.toLowerCase().includes(search);

    return matchesFilter && matchesSearch;
  });
});

function markAsRead(notificationId) {
  const notification = notifications.value.find((item) => {
    return item.id === notificationId;
  });

  if (notification) {
    notification.read = true;
  }
}

function markAllAsRead() {
  notifications.value.forEach((item) => {
    item.read = true;
  });
}

function dismissNotification(notificationId) {
  notifications.value = notifications.value.filter((item) => {
    return item.id !== notificationId;
  });
}

function handleNotificationAction(notification) {
  // A real application could navigate to the related page here.
  window.alert(`Demo action: ${notification.actionLabel}`);
}
</script>

<template>
  <section class="notification-panel" :class="`panel-${notificationTheme}`">
    <div class="panel-header">
      <div>
        <div class="panel-title-row">
          <h2>Notifications</h2>
          <span class="count-pill">{{ unreadCount }} unread</span>
        </div>

        <p class="panel-subtitle">
          Updates from your team and workspace.
        </p>
      </div>

      <button
        class="text-button"
        type="button"
        :disabled="unreadCount === 0"
        @click="markAllAsRead"
      >
        Mark all as read
      </button>
    </div>

    <div class="toolbar">
      <label class="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          v-model="searchText"
          type="search"
          placeholder="Search notifications..."
          aria-label="Search notifications"
        />
      </label>

      <div class="filter-tabs">
        <button
          type="button"
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
        >
          All
        </button>

        <button
          type="button"
          :class="{ active: activeFilter === 'unread' }"
          @click="activeFilter = 'unread'"
        >
          Unread
        </button>

        <button
          type="button"
          :class="{ active: activeFilter === 'read' }"
          @click="activeFilter = 'read'"
        >
          Read
        </button>
      </div>
    </div>

    <div v-if="visibleNotifications.length" class="notification-list">
      <NotificationItem
        v-for="notification in visibleNotifications"
        :key="notification.id"
        :notification="notification"
        @mark-read="markAsRead"
        @dismiss="dismissNotification"
        @open="handleNotificationAction"
      >
        <template #actions="{ item, markRead }">
          <button
            v-if="!item.read"
            class="item-link-button"
            type="button"
            @click="markRead(item.id)"
          >
            Mark read
          </button>

          <button
            class="item-action-button"
            type="button"
            @click="handleNotificationAction(item)"
          >
            {{ item.actionLabel }}
          </button>
        </template>
      </NotificationItem>
    </div>

    <div v-else class="empty-state">
      <h3>No notifications found</h3>
      <p>Try another filter or search for a different keyword.</p>

      <button
        class="text-button"
        type="button"
        @click="activeFilter = 'all'; searchText = ''"
      >
        Clear filters
      </button>
    </div>

    <div class="panel-footer">
      <span>
        Showing {{ visibleNotifications.length }} of
        {{ notifications.length }} notifications
      </span>

      <span>You're all caught up on important updates</span>
    </div>
  </section>
</template>