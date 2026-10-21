import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

const savedUser = localStorage.getItem("demo-user");

export const useAuthStore = defineStore("auth", () => {
  const user = ref(savedUser ? JSON.parse(savedUser) : null);
  const isAuthenticated = computed(() => Boolean(user.value));
  const isManager = computed(() => user.value?.role === "manager");

  function login(role) {
    user.value = {
      name: role === "manager" ? "Morgan Manager" : "Evan Employee",
      role
    };
  }

  function logout() {
    user.value = null;
  }

  watch(user, (newUser) => {
    if (newUser) {
      localStorage.setItem("demo-user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("demo-user");
    }
  }, { deep: true });

  return { user, isAuthenticated, isManager, login, logout };
});