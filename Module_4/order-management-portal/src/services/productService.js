const products = {
  "wireless-mouse": {
    slug: "wireless-mouse",
    name: "Wireless Mouse",
    category: "Accessories",
    price: 650,
    stock: 42,
    sku: "ACC-MSE-001",
    description: "A compact wireless mouse designed for everyday work, with a comfortable shape and reliable connection."
  },
  "mechanical-keyboard": {
    slug: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 2499,
    stock: 18,
    sku: "ACC-KBD-014",
    description: "A sturdy mechanical keyboard for long typing sessions, featuring tactile feedback and a clean layout."
  },
  "laptop-stand": {
    slug: "laptop-stand",
    name: "Laptop Stand",
    category: "Workspace",
    price: 899,
    stock: 27,
    sku: "WRK-STN-008",
    description: "A lightweight laptop stand that raises the screen to a more comfortable viewing height."
  }
};

export async function getProductBySlug(slug) {
  // A small delay makes this feel like a real async API request for the POC.
  await new Promise((resolve) => setTimeout(resolve, 250));
  return products[slug] ?? null;
}