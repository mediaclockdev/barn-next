export const wcApiUrl = process.env.WC_API_URL;
export const wcConsumerKey = process.env.WC_CONSUMER_KEY;
export const wcConsumerSecret = process.env.WC_CONSUMER_SECRET;

export async function fetchWooCommerce(
  endpoint: string,
  options: RequestInit = {},
) {
  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error(
      "WooCommerce API credentials are not set in environment variables.",
    );
  }

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

  const url = `${wcApiUrl.replace(/\/$/, "")}/wc/v3/${endpoint.replace(/^\//, "")}`;

  const startTime = Date.now();

  const response = await fetch(url, config);

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[WooCommerce API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  const duration = Date.now() - startTime;

  if (!response.ok) {
    throw new Error(
      `WooCommerce API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  return data;
}

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

/**
 * Get a list of WooCommerce products.
 * @param params Query string parameters (e.g. { per_page: "10", category: "12" })
 */
export async function getProducts(
  params?: Record<string, string>,
): Promise<WooCommerceProduct[]> {
  const query = new URLSearchParams(params || {}).toString();
  const endpoint = query ? `products?${query}` : "products";

  return fetchWooCommerce(endpoint, { next: { revalidate: 3600 } });
}

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

  const startTime = Date.now();

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
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

  if (!response.ok) {
    throw new Error(
      `WooCommerce API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  return {
    products: data as WooCommerceProduct[],
    totalPages: parseInt(response.headers.get("x-wp-totalpages") || "1", 10),
    totalItems: parseInt(response.headers.get("x-wp-total") || "0", 10),
  };
}

export async function getProduct(id: number): Promise<WooCommerceProduct> {
  return fetchWooCommerce(`products/${id}`, { next: { revalidate: 3600 } });
}

export async function getCategories(
  params?: Record<string, string>,
): Promise<Record<string, unknown>[]> {
  const query = new URLSearchParams(params || {}).toString();
  const endpoint = query
    ? `products/categories?${query}`
    : "products/categories";

  return fetchWooCommerce(endpoint, { next: { revalidate: 3600 } });
}

export async function searchProductsCustom(
  params: Record<string, string>,
): Promise<WooCommerceProduct[]> {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `custom/v3/products?${query}` : `custom/v3/products`;

  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error(
      "WooCommerce API credentials are not set in environment variables.",
    );
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");
  const url = `${wcApiUrl.replace(/\/$/, "")}/${endpoint}`;

  const startTime = Date.now();

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
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

  if (!response.ok) {
    throw new Error(
      `WooCommerce API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  return data as WooCommerceProduct[];
}
