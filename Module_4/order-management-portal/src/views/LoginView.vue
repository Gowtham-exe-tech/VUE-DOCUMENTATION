<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const selectedRole = ref("employee");

function login() {
  authStore.login(selectedRole.value);
  const redirectTo = typeof route.query.redirect === "string" ? route.query.redirect : "/orders";
  router.push(redirectTo);
}
</script>

<template>
  <DefaultLayout>
    <section class="login-layout">
      <div class="login-intro">
        <p class="eyebrow"><span class="eyebrow-dot"></span> WELCOME BACK</p>
        <h1>Your orders.<br /><span>Under control.</span></h1>
        <p>Sign in to explore the order workspace. This POC uses a role selector instead of real credentials so you can test route permissions.</p>
        <div class="login-benefit"><span>✓</span> Track order status from one place</div>
        <div class="login-benefit"><span>✓</span> Review order details and line items</div>
        <div class="login-benefit"><span>✓</span> Test employee and manager access</div>
      </div>
      <form class="login-card" @submit.prevent="login">
        <div class="login-card-icon">↗</div>
        <h2>Sign in to Orderly</h2>
        <p class="muted-text">Choose a demo role to continue.</p>
        <label class="field-label" for="role">Demo role</label>
        <select id="role" v-model="selectedRole" class="form-control">
          <option value="employee">Employee — order access</option>
          <option value="manager">Manager — order + admin access</option>
        </select>
        <div class="demo-note"><strong>Demo mode</strong><span>No password is required. Do not use this pattern for production authentication.</span></div>
        <button class="button button-primary button-full" type="submit">Continue to workspace <span>→</span></button>
        <RouterLink class="back-link" to="/">← Back to overview</RouterLink>
      </form>
    </section>
  </DefaultLayout>
</template>