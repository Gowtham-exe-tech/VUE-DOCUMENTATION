<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { getProductBySlug } from "../services/productService";

const route = useRoute();
const product = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

async function loadProduct(slug) {
  isLoading.value = true;
  errorMessage.value = "";
  product.value = null;

  try {
    product.value = await getProductBySlug(slug);
    if (!product.value) errorMessage.value = "We couldn't find a product with that slug.";
  } catch {
    errorMessage.value = "Something went wrong while loading this product.";
  } finally {
    isLoading.value = false;
  }
}

watch(() => route.params.slug, (slug) => loadProduct(String(slug)), { immediate: true });
const formatMoney = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(amount);
</script>

<template>
  <DefaultLayout>
    <RouterLink class="back-link page-back" to="/">← Back to overview</RouterLink>
    <section v-if="isLoading" class="loading-panel panel"><span class="spinner"></span><p>Loading product details...</p></section>
    <section v-else-if="product" class="product-detail panel">
      <div class="product-art"><div class="product-art-circle"></div><div class="product-box">◈</div><span class="product-art-caption">PRODUCT CATALOGUE</span></div>
      <div class="product-info">
        <p class="eyebrow">{{ product.category }} <span class="eyebrow-separator">/</span> {{ product.sku }}</p>
        <h1>{{ product.name }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">{{ formatMoney(product.price) }}</div>
        <div class="stock-line"><span class="stock-dot"></span> {{ product.stock }} units in stock</div>
        <div class="product-facts"><div><small>Category</small><strong>{{ product.category }}</strong></div><div><small>SKU</small><strong>{{ product.sku }}</strong></div></div>
        <RouterLink class="button button-primary" to="/orders">View related orders →</RouterLink>
        <p class="helper-text">Product data comes from a local async mock service, not a real API.</p>
      </div>
    </section>
    <section v-else class="not-found panel"><div class="not-found-icon">!</div><h1>Product unavailable</h1><p>{{ errorMessage }}</p><RouterLink class="button button-primary" to="/">Return to overview</RouterLink></section>
  </DefaultLayout>
</template>