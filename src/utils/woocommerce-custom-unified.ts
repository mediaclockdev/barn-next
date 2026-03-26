import { WooCommerceProduct } from "./woocommerce";

export const wcApiUrl = process.env.WC_API_URL;
export const wcConsumerKey = process.env.WC_CONSUMER_KEY;
export const wcConsumerSecret = process.env.WC_CONSUMER_SECRET;

/**
 * Unified fetcher for a Custom WooCommerce Endpoint.
 * This assumes the backend developer has created a single, powerful endpoint at:
 * /wp-json/custom/v3/products
 * 
 * It handles EVERYTHING gracefully:
 * 1. Pagination parameters (?page=1&per_page=12)
 * 2. Search parameters (?search=keyword)
 * 3. Filter parameters (?category=12&min_price=50)
 * 4. No parameters (Just fetching all products)
 */
export async function fetchUnifiedCustomProducts(
  params?: Record<string, string>
): Promise<{
  products: WooCommerceProduct[];
  totalPages: number;
  totalItems: number;
}> {
  // Convert any passed parameters (page, search, category, etc.) into a URL query string format
  const query = new URLSearchParams(params || {}).toString();
  const endpoint = query ? `custom/v3/products?${query}` : "custom/v3/products";

  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing.");
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/${endpoint}`;

  console.log(`\n[Unified API] 🚀 Fetching from custom endpoint: ${url}`);
  const startTime = Date.now();

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    // We cache for 60 seconds (keeps shop fast but relatively up to date)
    next: { revalidate: 60 },
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[Unified API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  const duration = Date.now() - startTime;
  console.log(`[Unified API] ✅ Retrieved data in ${duration}ms!`);

  if (!response.ok) {
    throw new Error(
      `Custom API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`
    );
  }

  /**
   * CRITICAL FOR BACKEND DEVELOPER:
   * To build the frontend pagination UI (Page 1 of 5, etc.), the custom REST endpoint 
   * MUST return pagination data in the HTTP Headers (which is the WordPress standard).
   * 
   * If they give it to us in the JSON body instead, we'd have to change this code,
   * but standard WP practice is headers.
   */
  const totalPages = parseInt(response.headers.get("x-wp-totalpages") || "1", 10);
  const totalItems = parseInt(response.headers.get("x-wp-total") || "0", 10);

  return {
    products: data as WooCommerceProduct[],
    totalPages,
    totalItems,
  };
}

/**
 * Unified fetcher for submitting a new Order to the Custom WooCommerce Endpoint.
 * Endpoint: /wp-json/custom/v3/orders
 * Method: POST
 * 
 * Note: Ask the backend developer for the exact JSON format this endpoint expects
 * (e.g., standard WooCommerce cart fields, billing/shipping addresses, payment info).
 */
export async function createOrderCustom(payload: Record<string, any>): Promise<any> {
  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing.");
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/custom/v3/orders`;

  console.log(`\n[Unified API] 🚀 POSTing to custom orders endpoint: ${url}`);
  const startTime = Date.now();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    // Mutations shouldn't be cached
    cache: "no-store",
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[Unified API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  const duration = Date.now() - startTime;
  console.log(`[Unified API] ✅ Submitted order in ${duration}ms!`);

  if (!response.ok) {
    throw new Error(
      `Custom API Error: ${response.status} ${response.statusText} - ${
        data?.message || JSON.stringify(data)
      }`
    );
  }

  return data;
}
