"use server";

import { ENDPOINTS, buildUrl } from "./api-endpoints";
import { wcApiUrl } from "./api-client";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";

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

  try {
    await connectDB();

    const userEmail = data.user_email || credentials.email;

    const wp_id = data.user_id || data.id || null;
    const username = data.user_nicename || credentials.email.split("@")[0];
    const display_name = data.user_display_name || "";

    await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          wp_id,
          username,
          display_name,
          updated_at: new Date(),
        },
      },
      { upsert: true, new: true },
    );
  } catch (dbError) {
    console.error("Failed to save user in MongoDB:", dbError);
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
    const cleanMessage = rawMessage.replace(/<[^>]*>?/gm, "");
    return { error: cleanMessage, success: false };
  }

  try {
    await connectDB();

    const userEmail = data.user_email || userData.email;
    const wp_id = data.user_id || data.id || null;
    const username =
      data.user_nicename || userData.username || userData.email.split("@")[0];
    const first_name = data.first_name || userData.first_name || "";
    const last_name = data.last_name || userData.last_name || "";

    await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          wp_id,
          username,
          first_name,
          last_name,
          updated_at: new Date(),
        },
      },
      { upsert: true, new: true },
    );
  } catch (dbError) {
    console.error("Failed to save user in MongoDB after signup:", dbError);
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
