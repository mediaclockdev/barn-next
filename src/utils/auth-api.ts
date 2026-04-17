"use server";

import { ENDPOINTS, buildUrl } from "./api-endpoints";
import { wcApiUrl, fetchWcApi } from "./api-client";

export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  const endpoint = buildUrl(ENDPOINTS.LOGIN);
  const baseUrl = (wcApiUrl || "").replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${baseUrl}/${path}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials.email,
      password: credentials.password,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    const rawMessage = data?.message || `Login failed (${response.status})`;
    const cleanMessage = rawMessage.replace(/<[^>]*>?/gm, "");
    return { error: cleanMessage, success: false };
  }

  const userEmail = data.user_email || credentials.email;
  const wp_id = data.user_id || data.id || null;
  const username = data.user_nicename || credentials.email.split("@")[0];
  const display_name = data.user_display_name || "";

  // Fetch customer profile from WooCommerce to get first_name/last_name
  let first_name = "";
  let last_name = "";

  if (wp_id) {
    try {
      const { data: profile } = await fetchWcApi<any>(
        `custom/v1/customer/${wp_id}`,
        { method: "GET", cache: "no-store" },
      );
      first_name = profile?.first_name || "";
      last_name = profile?.last_name || "";
    } catch (profileErr) {
      console.error("Failed to fetch customer profile:", profileErr);
      // Fallback: parse display_name into first/last
      const parts = display_name.split(" ");
      first_name = parts[0] || "";
      last_name = parts.slice(1).join(" ") || "";
    }
  }

  return { ...data, first_name, last_name, success: true };
}

export async function signupUser(userData: {
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
}) {
  const endpoint = buildUrl(ENDPOINTS.SIGNUP);
  const baseUrl = (wcApiUrl || "").replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${baseUrl}/${path}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username || userData.email,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    const rawMessage = data?.message || `Signup failed (${response.status})`;
    const cleanMessage = rawMessage.replace(/<[^>]*>?/gm, "");
    return { error: cleanMessage, success: false };
  }

  return { ...data, success: true };
}

export async function forgotPassword(email: string) {
  const endpoint = buildUrl(ENDPOINTS.FORGOT_PASSWORD);
  const baseUrl = (wcApiUrl || "").replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${baseUrl}/${path}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    const rawMessage = data?.message || `Request failed (${response.status})`;
    const cleanMessage = rawMessage.replace(/<[^>]*>?/gm, "");
    return { error: cleanMessage, success: false };
  }

  return { ...data, success: true };
}

export async function resetPassword(payload: any, token?: string | null) {
  const endpoint = buildUrl(ENDPOINTS.RESET_PASSWORD);
  const baseUrl = (wcApiUrl || "").replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${baseUrl}/${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    const rawMessage = data?.message || `Request failed (${response.status})`;
    const cleanMessage = rawMessage.replace(/<[^>]*>?/gm, "");
    return { error: cleanMessage, success: false };
  }

  return { ...data, success: true };
}
