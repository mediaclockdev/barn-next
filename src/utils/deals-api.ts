import { fetchWcApi } from "./api-client";
import { ENDPOINTS, buildUrl } from "./api-endpoints";

/**
 * Service File for the Deals page.
 */

export async function getDeals(params?: {
  page?: number;
  per_page?: number;
  category?: string;
}) {
  // 1. Pass pagination or filter params to buildUrl automatically
  const url = buildUrl(ENDPOINTS.DEALS, params);

  // 2. Fetch the deals. If deals update often, cache slightly, otherwise disable.
  const { data, headers } = await fetchWcApi<any>(url, { next: { revalidate: 60 } });

  // 3. Return pagination metadata along with the deals data so your UI can build "Next Page" buttons.
  return {
    deals: data,
    totalPages: parseInt(headers.get("x-wp-totalpages") || "1", 10),
    totalItems: parseInt(headers.get("x-wp-total") || "0", 10),
  };
}
