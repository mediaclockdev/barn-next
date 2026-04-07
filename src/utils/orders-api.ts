import { fetchWcApi } from "./api-client";
import { ENDPOINTS, buildUrl } from "./api-endpoints";

/**
 * Example Service File for "Other Pages" (e.g. Orders, Checkout)
 * Notice how much cleaner this is! No more copy-pasting the fetch auth logic.
 */

export async function getMyOrders(userId: number) {
  // 1. Build the URL dynamically with the endpoint registry
  const url = buildUrl(ENDPOINTS.ORDERS, { customer: userId });

  // 2. Fetch using our unified API client (bypasses auth boilerplate)
  // Disable caching for user-specific data like orders
  const { data } = await fetchWcApi<any>(url, { cache: "no-store" });

  return data;
}

export async function submitCheckout(payload: any) {
  const url = buildUrl(ENDPOINTS.CHECKOUT);

  const { data } = await fetchWcApi<any>(url, {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return data;
}
