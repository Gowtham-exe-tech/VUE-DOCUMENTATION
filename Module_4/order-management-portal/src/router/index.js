import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import OrdersView from "../views/OrdersView.vue";
import OrderDetailsView from "../views/OrderDetailsView.vue";
import AdminView from "../views/AdminView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/login", name: "login", component: LoginView },
    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
      meta: { requiresAuth: true }
    },
    {
      path: "/orders/:orderId",
      name: "order-details",
      component: OrderDetailsView,
      meta: { requiresAuth: true }
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      meta: { requiresAuth: true, requiresManager: true }
    },
    {
      path: "/products/:slug",
      name: "product-details",
      component: ProductDetailsView
    },
    { path: "/:pathMatch(.*)*", redirect: "/" }
  ]
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (to.meta.requiresManager && !authStore.isManager) {
    return { name: "orders" };
  }

  if (to.name === "login" && authStore.isAuthenticated) {
    return { name: "orders" };
  }
});

export default router;