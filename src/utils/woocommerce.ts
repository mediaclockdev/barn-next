export const wcApiUrl = process.env.WC_API_URL;
export const wcConsumerKey = process.env.WC_CONSUMER_KEY;
export const wcConsumerSecret = process.env.WC_CONSUMER_SECRET;

/**
 * Core fetch wrapper for WooCommerce REST API.
 * Uses Next.js native fetch for optimal caching in Server Components.
 */
export async function fetchWooCommerce(
  endpoint: string,
  options: RequestInit = {},
) {
  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error(
      "WooCommerce API credentials are not set in environment variables.",
    );
  }

  // Basic auth header for WooCommerce
  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const defaultHeaders = {
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Ensure /wc/v3/ prefix is correctly applied
  const url = `${wcApiUrl.replace(/\/$/, "")}/wc/v3/${endpoint.replace(/^\//, "")}`;

  // 1. Log the outgoing request so you can see it in your terminal
  console.log(`\n[WooCommerce API] 🚀 Server-side fetching: ${url}`);
  const startTime = Date.now();

  // 2. Await the response from WooCommerce
  const response = await fetch(url, config);

  // 3. Immediately parse the JSON data before returning it,
  //    so we can check for errors or log it if needed.
  let data;
  try {
    data = await response.json();
    console.log("Data ", data);
  } catch (err) {
    console.error(`[WooCommerce API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  // 4. Log the completion time
  const duration = Date.now() - startTime;
  console.log(`[WooCommerce API] ✅ Retrieved data in ${duration}ms!`);

  if (!response.ok) {
    // If the API threw an error (like a 404 or 401), catch it here
    throw new Error(
      `WooCommerce API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  // 5. Return the finalized data to your page component
  return data;
}

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  average_rating: string;
  rating_count: number;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: Array<{
    id: number;
    src: string;
    name: string;
    alt: string;
  }>;
  attributes: Array<Record<string, unknown>>;
  default_attributes: Array<Record<string, unknown>>;
  variations: Array<number>;
  price_html: string;
  related_ids: Array<number>;
  meta_data: Array<Record<string, unknown>>;
}

// ----------------------------------------------------------------------------
// API Services
// ----------------------------------------------------------------------------

/**
 * Get a list of WooCommerce products.
 * @param params Query string parameters (e.g. { per_page: "10", category: "12" })
 */
export async function getProducts(
  params?: Record<string, string>,
): Promise<WooCommerceProduct[]> {
  const query = new URLSearchParams(params || {}).toString();
  const endpoint = query ? `products?${query}` : "products";

  // Cache statically for 1 hour by default in Next.js Server Components
  return fetchWooCommerce(endpoint, { next: { revalidate: 3600 } });
}

/**
 * Get a list of WooCommerce products along with pagination metadata.
 * @param params Query string parameters (e.g. { per_page: "10", page: "2" })
 */
export async function getProductsWithPagination(
  params?: Record<string, string>,
): Promise<{
  products: WooCommerceProduct[];
  totalPages: number;
  totalItems: number;
}> {
  const query = new URLSearchParams(params || {}).toString();
  const endpoint = query ? `products?${query}` : "products";

  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error(
      "WooCommerce API credentials are not set in environment variables.",
    );
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/wc/v3/${endpoint.replace(/^\//, "")}`;

  console.log(`\n[WooCommerce API] 🚀 Server-side fetching paginated: ${url}`);
  const startTime = Date.now();

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    // Don't strongly cache paginated views to allow fresh browsing,
    // or use a shorter revalidation time.
    next: { revalidate: 60 },
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[WooCommerce API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  const duration = Date.now() - startTime;
  console.log(
    `[WooCommerce API] ✅ Retrieved paginated data in ${duration}ms!`,
  );

  if (!response.ok) {
    throw new Error(
      `WooCommerce API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  console.log("Response header ", response.headers);

  return {
    products: data as WooCommerceProduct[],
    totalPages: parseInt(response.headers.get("x-wp-totalpages") || "1", 10),
    totalItems: parseInt(response.headers.get("x-wp-total") || "0", 10),
  };
}

/**
 * Get a single WooCommerce product by ID.
 * @param id Product ID
 */
export async function getProduct(id: number): Promise<WooCommerceProduct> {
  return fetchWooCommerce(`products/${id}`, { next: { revalidate: 3600 } });
}

/**
 * Get product categories.
 */
export async function getCategories(
  params?: Record<string, string>,
): Promise<Record<string, unknown>[]> {
  const query = new URLSearchParams(params || {}).toString();
  const endpoint = query
    ? `products/categories?${query}`
    : "products/categories";

  return fetchWooCommerce(endpoint, { next: { revalidate: 3600 } });
}
