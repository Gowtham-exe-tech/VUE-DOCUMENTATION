<script setup>
import { computed, provide, ref } from "vue";
import NotificationCenter from "./components/NotificationCenter.vue";

// This value controls the theme used by the notification components.
const theme = ref("light");

// Child components can access this value using inject().
provide("notificationTheme", theme);

const currentUser = ref("Gowtham");

const themeLabel = computed(() => {
  return theme.value === "light" ? "Dark mode" : "Light mode";
});

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<template>
  <main class="app-shell" :class="`theme-${theme}`">
    <header class="topbar">
      <a class="brand" href="#">
        <span class="brand-mark">P</span>
        <span>pulse<span class="brand-dot">.</span></span>
      </a>

      <div class="topbar-right">
        <span>Hi, {{ currentUser }}</span>
        <button class="theme-button" type="button" @click="toggleTheme">
          {{ themeLabel }}
        </button>
      </div>
    </header>

    <section class="page-heading">
      <div>
        <p class="eyebrow">YOUR WORKSPACE</p>
        <h1>Notification center</h1>
        <p class="page-description">
          Keep track of updates that need your attention.
        </p>
      </div>
    </section>

    <NotificationCenter />
  </main>
</template>