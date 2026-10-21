<template>
  <header class="siteHeader">
    <span class="siteName">Order Portal</span>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/orders">Orders</RouterLink>
    </nav>
  </header>
  <main class="pageContent">
    <RouterView />
  </main>
</template>
