export const wcApiUrl = process.env.WC_API_URL;
export const wcConsumerKey = process.env.WC_CONSUMER_KEY;
export const wcConsumerSecret = process.env.WC_CONSUMER_SECRET;

export interface WcApiResponse<T> {
  data: T;
  headers: Headers;
  status: number;
}

/**
 * Base Fetch Client for WooCommerce & Custom WordPress REST APIs.
 * This DRYs up all authentication, logging, and error handling for NEW endpoints.
 *
 * Note: Existing product files (woocommerce.ts, woocommerce-custom-unified.ts)
 * remain untouched and use their own fetch logic.
 */
export async function fetchWcApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<WcApiResponse<T>> {
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

  const baseUrl = wcApiUrl.replace(/\/$/, "");

  // Ensure we don't double slash at the beginning of the endpoint
  const path = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${baseUrl}/${path}`;

  console.log(`\n[API Client] 🚀 Fetching: ${url}`);
  const startTime = Date.now();

  const response = await fetch(url, config);

  let data;
  try {
    // Attempt to parse JSON response
    const rawData = await response.text();
    data = rawData ? JSON.parse(rawData) : null;
  } catch (err) {
    console.error(`[API Client] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  const duration = Date.now() - startTime;
  console.log(
    `[API Client] ✅ Responded in ${duration}ms (${response.status})`,
  );

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${
        data?.message || JSON.stringify(data) || ""
      }`,
    );
  }

  return {
    data: data as T,
    headers: response.headers,
    status: response.status,
  };
}
