"use server";

import { ENDPOINTS, buildUrl } from "./api-endpoints";
import { wcApiUrl } from "./api-client";

/**
 * Service File for Authentication (Login and Signup).
 */

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
    // The JWT plugin typically expects "username" instead of "email"
    body: JSON.stringify({
      username: credentials.email,
      password: credentials.password,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  console.log("Data ", data);

  if (!response.ok) {
    const rawMessage = data?.message || `Login failed (${response.status})`;
    const cleanMessage = rawMessage.replace(/<[^>]*>?/gm, ""); // Remove HTML tags WP might send
    return { error: cleanMessage, success: false };
  }

  return { ...data, success: true };
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
    const cleanMessage = rawMessage.replace(/<[^>]*>?/gm, ""); // Remove HTML tags WP might send
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
    headers["Authorization"] = `Bearer ${token}`; // Just in case backend needs auth
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
