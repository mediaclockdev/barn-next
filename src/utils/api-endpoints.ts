/**
 * Register all NEW backend APIs here.
 * When the backend team provides a new endpoint, just add a new key below!
 */
export const ENDPOINTS = {
  // === WooCommerce Core ===
  // WC_PRODUCTS: "wc/v3/products",
  
  // === Custom Endpoints ===
  // CUSTOM_PRODUCTS: "wp-json/custom/v3/products",
  
  // Example of where you will plug in the new APIs for other pages!
  CART: "wp-json/custom/v3/cart",
  CHECKOUT: "wp-json/custom/v3/checkout",
  CUSTOMER_PROFILE: "wp-json/custom/v3/profile",
  ORDERS: "wp-json/custom/v3/orders",

  // --- Specific Pages Requested by User ---
  HOMEPAGE: "wp-json/custom/v3/homepage",     // Replace with actual homepage endpoint when ready
  LOGIN: "wp-json/custom/v3/login",           // Replace with actual login endpoint when ready
  SIGNUP: "wp-json/custom/v3/signup",         // Replace with actual signup endpoint when ready
  DEALS: "wp-json/custom/v3/deals",           // Replace with actual deals endpoint when ready
};

/**
 * Helper to append query parameters (like search filters, pagination) 
 * cleanly to any structured endpoint.
 */
export function buildUrl(
  endpoint: string, 
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  if (!params) return endpoint;

  const cleanParams: Record<string, string> = {};
  
  // Filter out empty or undefined parameters automatically
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      cleanParams[key] = String(value);
    }
  });

  const query = new URLSearchParams(cleanParams).toString();
  return query ? `${endpoint}?${query}` : endpoint;
}
