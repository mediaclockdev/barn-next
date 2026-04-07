import { fetchWcApi } from "./api-client";
import { ENDPOINTS, buildUrl } from "./api-endpoints";

/**
 * Service File for the Homepage.
 * When you get the exact data requirements from the backend, 
 * you can add the correct types instead of `any`.
 */

export async function getHomepageData() {
  // 1. Build the URL dynamically with the endpoint registry
  const url = buildUrl(ENDPOINTS.HOMEPAGE);

  // 2. Fetch using our unified API client
  // Homepage data can usually be cached to improve site speed.
  // Revalidate every 60 seconds (or 3600 for 1 hour).
  const { data } = await fetchWcApi<any>(url, { next: { revalidate: 60 } });

  return data;
}
