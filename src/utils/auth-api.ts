"use server";

import { fetchWcApi } from "./api-client";
import { ENDPOINTS, buildUrl } from "./api-endpoints";

/**
 * Service File for Authentication (Login and Signup).
 */

export async function loginUser(credentials: { email: string; password: string }) {
  const url = buildUrl(ENDPOINTS.LOGIN);

  // Auth mutations should strictly NOT be cached
  const { data } = await fetchWcApi<any>(url, {
    method: "POST",
    body: JSON.stringify(credentials),
    cache: "no-store",
  });

  // Example return object based on typical WordPress/WooCommerce generic structure
  // You might receive an auth token or just a success message
  return data;
}

export async function signupUser(userData: {
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}) {
  const url = buildUrl(ENDPOINTS.SIGNUP);

  const { data } = await fetchWcApi<any>(url, {
    method: "POST",
    body: JSON.stringify(userData),
    cache: "no-store",
  });

  return data;
}
